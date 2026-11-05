import SceneKit
import CoreGraphics
import GutterCore

/// Builds the 3-D world for the watch: the gutter (wood, with neon tubes),
/// the safety net, the plunger, the ball, the blocks, a finish arch, a sky
/// and ground. Deliberately light: a few hundred triangles per 100 m.
struct BuiltScene {
    let scene: SCNScene
    let camera: SCNNode
    let ball: SCNNode
    let beam: SCNNode
    let plungerRod: SCNNode
    let obstacles: [SCNNode]
}

@inline(__always) func v3(_ v: Vec3) -> SCNVector3 { SCNVector3(Float(v.x), Float(v.y), Float(v.z)) }

enum SceneBuilder {
    static func build(track: Track) -> BuiltScene {
        let scene = SCNScene()
        let sky = Textures.sky()
        scene.background.contents = sky
        scene.lightingEnvironment.contents = sky
        scene.lightingEnvironment.intensity = 1.4
        scene.fogStartDistance = 160
        scene.fogEndDistance = 650
        scene.fogColor = CGColor(red: 0.72, green: 0.82, blue: 0.9, alpha: 1)

        // light: a warm sun and a soft fill
        let sun = SCNNode(); sun.light = SCNLight(); sun.light!.type = .directional
        sun.light!.intensity = 900; sun.light!.color = CGColor(red: 1, green: 0.95, blue: 0.85, alpha: 1)
        sun.eulerAngles = SCNVector3(-0.9, 0.6, 0)
        scene.rootNode.addChildNode(sun)
        let fill = SCNNode(); fill.light = SCNLight(); fill.light!.type = .ambient
        fill.light!.intensity = 420; fill.light!.color = CGColor(red: 0.75, green: 0.85, blue: 1, alpha: 1)
        scene.rootNode.addChildNode(fill)

        addGutter(track, to: scene.rootNode)
        addNet(track, to: scene.rootNode)
        addGroundAndSupports(track, to: scene.rootNode)
        addFinishArch(track, to: scene.rootNode)

        // the ball: polished steel with a dark band so you can see it roll
        let sphere = SCNSphere(radius: 1.15)
        sphere.segmentCount = 28
        let bm = SCNMaterial()
        bm.lightingModel = .physicallyBased
        bm.diffuse.contents = Textures.ballBand()
        bm.metalness.contents = 1.0
        bm.roughness.contents = 0.18
        sphere.materials = [bm]
        let ball = SCNNode(geometry: sphere)
        scene.rootNode.addChildNode(ball)

        // the tractor beam: a glowing line from the ball to where it's pulling
        let beamGeo = SCNCylinder(radius: 0.14, height: 1)
        let beamMat = SCNMaterial(); beamMat.lightingModel = .constant
        beamMat.diffuse.contents = CGColor(red: 0.3, green: 0.95, blue: 1, alpha: 1)
        beamMat.emission.contents = CGColor(red: 0.3, green: 0.95, blue: 1, alpha: 1)
        beamMat.blendMode = .add
        beamGeo.materials = [beamMat]
        let beam = SCNNode(geometry: beamGeo)
        beam.isHidden = true
        scene.rootNode.addChildNode(beam)

        let rod = addPlunger(track, to: scene.rootNode)
        let obstacles = addObstacles(track, to: scene.rootNode)

        let cam = SCNNode()
        cam.camera = SCNCamera()
        cam.camera!.fieldOfView = 72
        cam.camera!.zNear = 0.2
        cam.camera!.zFar = 1400
        scene.rootNode.addChildNode(cam)
        return BuiltScene(scene: scene, camera: cam, ball: ball, beam: beam, plungerRod: rod, obstacles: obstacles)
    }

    // MARK: gutter

    /// The gutter surface in ~100 m chunks (wood outside the tubes, neon inside them).
    private static func addGutter(_ t: Track, to root: SCNNode) {
        let wood = SCNMaterial()
        wood.diffuse.contents = Textures.wood()
        wood.diffuse.wrapS = .repeat; wood.diffuse.wrapT = .repeat
        wood.isDoubleSided = true
        wood.lightingModel = .lambert
        let neon = SCNMaterial()
        neon.diffuse.contents = Textures.neon()
        neon.emission.contents = Textures.neon()
        neon.diffuse.wrapS = .repeat; neon.diffuse.wrapT = .repeat
        neon.emission.wrapS = .repeat; neon.emission.wrapT = .repeat
        neon.isDoubleSided = true
        neon.lightingModel = .constant
        let step = 4                     // a ring every 2 m
        let chunk = 200                  // samples per chunk (100 m)
        var start = 0
        while start < t.n - 1 {
            let end = min(t.n - 1, start + chunk)
            var verts: [SCNVector3] = [], norms: [SCNVector3] = [], uvs: [CGPoint] = [], idx: [UInt32] = []
            var tubeSum = 0.0, rows = 0
            var i = start
            var ringLen = 0
            while i <= end {
                let s = Double(i) * t.ds
                if t.gap[i] { i += step; continue }
                let tk = t.tubeAt(s)
                tubeSum += tk; rows += 1
                let ring = profileRing(t.profile, curl: tk)
                ringLen = ring.count
                let base = UInt32(verts.count)
                for (k, q) in ring.enumerated() {
                    let wp = t.P[i] + t.R[i] * q.x + t.U[i] * q.y
                    let wn = (t.R[i] * q.nx + t.U[i] * q.ny).normalized
                    verts.append(v3(wp)); norms.append(v3(wn))
                    uvs.append(CGPoint(x: Double(k) / Double(ring.count - 1) * 3, y: s / 6))
                }
                // stitch to the previous ring (unless a gap separates them)
                if base > 0 && !(i - step >= 0 && t.gap[i - step]) {
                    let prev = base - UInt32(ringLen)
                    for k in 0..<(ringLen - 1) {
                        let a = prev + UInt32(k), b = base + UInt32(k)
                        idx.append(contentsOf: [a, b, a + 1, a + 1, b, b + 1])
                    }
                }
                i += step
            }
            if !idx.isEmpty {
                let geo = SCNGeometry(sources: [SCNGeometrySource(vertices: verts), SCNGeometrySource(normals: norms), SCNGeometrySource(textureCoordinates: uvs)],
                                      elements: [SCNGeometryElement(indices: idx, primitiveType: .triangles)])
                geo.materials = [rows > 0 && tubeSum / Double(rows) > 0.5 ? neon : wood]
                root.addChildNode(SCNNode(geometry: geo))
            }
            start = end
        }
    }

    // MARK: safety net

    private static func addNet(_ t: Track, to root: SCNNode) {
        let mat = SCNMaterial()
        mat.diffuse.contents = Textures.net()
        mat.emission.contents = Textures.net()
        mat.diffuse.wrapS = .repeat; mat.diffuse.wrapT = .repeat
        mat.emission.wrapS = .repeat; mat.emission.wrapT = .repeat
        mat.lightingModel = .constant
        mat.blendMode = .add
        mat.isDoubleSided = true
        mat.writesToDepthBuffer = false
        var verts: [SCNVector3] = [], uvs: [CGPoint] = [], idx: [UInt32] = []
        let xs = (0...12).map { -Net.half + 2 * Net.half * Double($0) / 12 }
        var prevRow: UInt32? = nil
        for i in stride(from: 0, to: t.n, by: 8) {
            guard t.netOn[i] else { prevRow = nil; continue }
            let s = Double(i) * t.ds
            let row = UInt32(verts.count)
            for x in xs {
                let wp = t.P[i] + t.R[i] * x + t.U[i] * t.netSurface(x)
                verts.append(v3(wp)); uvs.append(CGPoint(x: x / 2.4, y: s / 2.4))
            }
            if let pr = prevRow {
                for k in 0..<(xs.count - 1) {
                    let a = pr + UInt32(k), b = row + UInt32(k)
                    idx.append(contentsOf: [a, b, a + 1, a + 1, b, b + 1])
                }
            }
            prevRow = row
        }
        guard !idx.isEmpty else { return }
        let geo = SCNGeometry(sources: [SCNGeometrySource(vertices: verts), SCNGeometrySource(textureCoordinates: uvs)],
                              elements: [SCNGeometryElement(indices: idx, primitiveType: .triangles)])
        geo.materials = [mat]
        let node = SCNNode(geometry: geo)
        node.opacity = 0.55
        root.addChildNode(node)
    }

    // MARK: ground, supports, finish

    private static func addGroundAndSupports(_ t: Track, to root: SCNNode) {
        let minY = t.P.map { $0.y }.min() ?? 0
        let groundY = minY - 26
        let ground = SCNNode(geometry: SCNPlane(width: 6000, height: 6000))
        let gm = SCNMaterial(); gm.diffuse.contents = CGColor(red: 0.33, green: 0.52, blue: 0.27, alpha: 1); gm.lightingModel = .lambert
        ground.geometry!.materials = [gm]
        ground.eulerAngles = SCNVector3(-Float.pi / 2, 0, 0)
        let mid = t.P[t.n / 2]
        ground.position = SCNVector3(Float(mid.x), Float(groundY), Float(mid.z))
        root.addChildNode(ground)
        // timber trestle posts every 24 m (speed reference outside the tubes)
        let post = SCNCylinder(radius: 0.5, height: 1)
        let pm = SCNMaterial(); pm.diffuse.contents = CGColor(red: 0.42, green: 0.28, blue: 0.16, alpha: 1); pm.lightingModel = .lambert
        post.materials = [pm]
        for i in stride(from: 0, to: t.n, by: 48) where t.tubeK[i] < 0.01 && !t.gap[i] && t.U[i].y > 0.85 {
            for side in [-1.0, 1.0] {
                let top = t.P[i] + t.R[i] * (side * (t.profile.halfWidth + 0.2)) - t.U[i] * 0.3
                let h = Float(top.y - groundY)
                if h < 1 { continue }
                let n = SCNNode(geometry: post)
                n.scale = SCNVector3(1, h, 1)
                n.position = SCNVector3(Float(top.x), Float(groundY) + h / 2, Float(top.z))
                root.addChildNode(n)
            }
        }
    }

    private static func addFinishArch(_ t: Track, to root: SCNNode) {
        let s = t.length - 40
        let f = t.frame(at: s)
        let W = t.profile.halfWidth + 0.8
        let mat = SCNMaterial(); mat.diffuse.contents = Textures.checker(); mat.lightingModel = .constant
        let bar = SCNNode(geometry: SCNBox(width: CGFloat(W * 2 + 1.2), height: 1.4, length: 0.4, chamferRadius: 0))
        bar.geometry!.materials = [mat]
        let pm = SCNMaterial(); pm.diffuse.contents = CGColor(gray: 0.95, alpha: 1)
        let group = SCNNode()
        group.addChildNode(bar)
        bar.position = SCNVector3(0, 9.4, 0)
        for sx in [-1.0, 1.0] {
            let p = SCNNode(geometry: SCNBox(width: 0.5, height: 10, length: 0.5, chamferRadius: 0))
            p.geometry!.materials = [pm]
            p.position = SCNVector3(Float(sx * (W + 0.3)), 5, 0)
            group.addChildNode(p)
        }
        orient(group, at: f)
        root.addChildNode(group)
    }

    /// Place a node in a track frame: x = R, y = U, z = -T (so it faces down the course).
    static func orient(_ node: SCNNode, at f: (P: Vec3, T: Vec3, U: Vec3, R: Vec3)) {
        node.transform = SCNMatrix4(m11: Float(f.R.x), m12: Float(f.R.y), m13: Float(f.R.z), m14: 0,
                                    m21: Float(f.U.x), m22: Float(f.U.y), m23: Float(f.U.z), m24: 0,
                                    m31: Float(-f.T.x), m32: Float(-f.T.y), m33: Float(-f.T.z), m34: 0,
                                    m41: Float(f.P.x), m42: Float(f.P.y), m43: Float(f.P.z), m44: 1)
    }

    // MARK: plunger and blocks

    /// The pinball plunger at the start: a rod with a red knob out the back, a spring and a housing.
    /// Returns the moving part (rod + tip + knob), placed by the controller as you pull.
    private static func addPlunger(_ t: Track, to root: SCNNode) -> SCNNode {
        let chrome = SCNMaterial(); chrome.lightingModel = .physicallyBased
        chrome.diffuse.contents = CGColor(gray: 0.92, alpha: 1); chrome.metalness.contents = 1.0; chrome.roughness.contents = 0.2
        let red = SCNMaterial(); red.diffuse.contents = CGColor(red: 0.88, green: 0.08, blue: 0.16, alpha: 1); red.lightingModel = .blinn
        let rubber = SCNMaterial(); rubber.diffuse.contents = CGColor(gray: 0.08, alpha: 1)
        // moving part, in local coordinates: z = -T (behind the ball is +z)
        let rod = SCNNode()
        let tip = SCNNode(geometry: SCNCylinder(radius: 0.75, height: 0.5)); tip.geometry!.materials = [rubber]
        tip.eulerAngles = SCNVector3(Float.pi / 2, 0, 0); tip.position = SCNVector3(0, 0, 0.25)
        let shaft = SCNNode(geometry: SCNCylinder(radius: 0.2, height: 5.2)); shaft.geometry!.materials = [chrome]
        shaft.eulerAngles = SCNVector3(Float.pi / 2, 0, 0); shaft.position = SCNVector3(0, 0, 0.5 + 2.6)
        let knob = SCNNode(geometry: SCNSphere(radius: 0.8)); knob.geometry!.materials = [red]
        knob.position = SCNVector3(0, 0, 0.5 + 5.2 + 0.6)
        [tip, shaft, knob].forEach { rod.addChildNode($0) }
        root.addChildNode(rod)
        // the fixed housing, standing on the floor behind the ball
        let f = t.frame(at: 6)
        let housing = SCNNode(geometry: SCNBox(width: 1.6, height: 1.6, length: 1.1, chamferRadius: 0.08))
        housing.geometry!.materials = [chrome]
        let hf = (P: f.P + f.U * 1.15 - f.T * (1.15 + Run.pullLength + 1.1), T: f.T, U: f.U, R: f.R)
        orient(housing, at: hf)
        root.addChildNode(housing)
        // spring coils between the housing and the tip
        let coil = SCNTorus(ringRadius: 0.5, pipeRadius: 0.07); coil.materials = [chrome]
        for k in 0..<6 {
            let holder = SCNNode()
            let cf = (P: f.P + f.U * 1.15 - f.T * (1.6 + Double(k) * 0.45), T: f.T, U: f.U, R: f.R)
            orient(holder, at: cf)
            let c = SCNNode(geometry: coil)
            c.eulerAngles = SCNVector3(Float.pi / 2, 0, 0)   // ring axis along the course
            holder.addChildNode(c)
            root.addChildNode(holder)
        }
        return rod
    }

    private static func addObstacles(_ t: Track, to root: SCNNode) -> [SCNNode] {
        let mat = SCNMaterial()
        mat.diffuse.contents = CGColor(red: 1, green: 0.32, blue: 0.1, alpha: 1)
        mat.emission.contents = CGColor(red: 0.45, green: 0.1, blue: 0.02, alpha: 1)
        mat.lightingModel = .lambert
        return t.obstacles.map { o in
            let n = SCNNode(geometry: SCNBox(width: CGFloat(o.w), height: CGFloat(o.h), length: CGFloat(o.ls), chamferRadius: 0.1))
            n.geometry!.materials = [mat]
            root.addChildNode(n)
            return n
        }
    }
}

// MARK: - procedural textures (drawn in code)

enum Textures {
    private static func image(_ w: Int, _ h: Int, _ draw: (CGContext) -> Void) -> CGImage? {
        guard let ctx = CGContext(data: nil, width: w, height: h, bitsPerComponent: 8, bytesPerRow: 0,
                                  space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { return nil }
        draw(ctx)
        return ctx.makeImage()
    }
    static func sky() -> CGImage? {
        image(4, 256) { c in
            let cols = [CGColor(red: 0.24, green: 0.48, blue: 0.86, alpha: 1), CGColor(red: 0.62, green: 0.78, blue: 0.95, alpha: 1), CGColor(red: 0.9, green: 0.93, blue: 0.96, alpha: 1)]
            if let g = CGGradient(colorsSpace: CGColorSpaceCreateDeviceRGB(), colors: cols as CFArray, locations: [0, 0.45, 0.6]) {
                c.drawLinearGradient(g, start: CGPoint(x: 0, y: 256), end: CGPoint(x: 0, y: 0), options: [.drawsAfterEndLocation])
            }
        }
    }
    static func wood() -> CGImage? {
        image(128, 128) { c in
            c.setFillColor(CGColor(red: 0.78, green: 0.55, blue: 0.32, alpha: 1)); c.fill(CGRect(x: 0, y: 0, width: 128, height: 128))
            for k in 0..<16 {
                let shade = 0.62 + 0.18 * Double((k * 7) % 5) / 4
                c.setFillColor(CGColor(red: shade, green: shade * 0.7, blue: shade * 0.42, alpha: 1))
                c.fill(CGRect(x: k * 8, y: 0, width: 7, height: 128))   // planks along the course
            }
            c.setFillColor(CGColor(red: 0.3, green: 0.18, blue: 0.1, alpha: 1))
            c.fill(CGRect(x: 0, y: 0, width: 128, height: 3))           // a joint across every plank row
        }
    }
    static func neon() -> CGImage? {
        image(64, 256) { c in
            c.setFillColor(CGColor(red: 0.03, green: 0.02, blue: 0.08, alpha: 1)); c.fill(CGRect(x: 0, y: 0, width: 64, height: 256))
            let hues: [(Double, Double, Double)] = [(1, 0.25, 0.6), (0.3, 0.9, 1), (1, 0.85, 0.2), (0.5, 1, 0.4)]
            for k in 0..<8 {
                let h = hues[k % hues.count]
                c.setFillColor(CGColor(red: h.0, green: h.1, blue: h.2, alpha: 1))
                c.fill(CGRect(x: 0, y: k * 32, width: 64, height: 6))   // glowing rings that rush past
            }
        }
    }
    static func net() -> CGImage? {
        image(64, 64) { c in
            c.setStrokeColor(CGColor(red: 0.45, green: 0.95, blue: 1, alpha: 1)); c.setLineWidth(3)
            c.move(to: CGPoint(x: 0, y: 0)); c.addLine(to: CGPoint(x: 64, y: 64))
            c.move(to: CGPoint(x: 64, y: 0)); c.addLine(to: CGPoint(x: 0, y: 64)); c.strokePath()
        }
    }
    static func ballBand() -> CGImage? {
        image(128, 64) { c in
            c.setFillColor(CGColor(gray: 0.86, alpha: 1)); c.fill(CGRect(x: 0, y: 0, width: 128, height: 64))
            c.setFillColor(CGColor(gray: 0.12, alpha: 1)); c.fill(CGRect(x: 0, y: 29, width: 128, height: 6))
            c.fill(CGRect(x: 60, y: 0, width: 8, height: 64))
        }
    }
    static func checker() -> CGImage? {
        image(64, 16) { c in
            for x in 0..<8 { for y in 0..<2 {
                c.setFillColor((x + y) % 2 == 0 ? CGColor(gray: 0.95, alpha: 1) : CGColor(gray: 0.08, alpha: 1))
                c.fill(CGRect(x: x * 8, y: y * 8, width: 8, height: 8))
            } }
        }
    }
}
