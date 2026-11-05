import Foundation

/// A small 3-D vector (Double precision). World axes match the web game: +Y up, forward = -Z.
public struct Vec3: Equatable {
    public var x: Double, y: Double, z: Double
    public init(_ x: Double, _ y: Double, _ z: Double) { self.x = x; self.y = y; self.z = z }
    public static let zero = Vec3(0, 0, 0)
    public static let up = Vec3(0, 1, 0)

    public static func + (a: Vec3, b: Vec3) -> Vec3 { Vec3(a.x + b.x, a.y + b.y, a.z + b.z) }
    public static func - (a: Vec3, b: Vec3) -> Vec3 { Vec3(a.x - b.x, a.y - b.y, a.z - b.z) }
    public static prefix func - (a: Vec3) -> Vec3 { Vec3(-a.x, -a.y, -a.z) }
    public static func * (a: Vec3, k: Double) -> Vec3 { Vec3(a.x * k, a.y * k, a.z * k) }
    public static func * (k: Double, a: Vec3) -> Vec3 { Vec3(a.x * k, a.y * k, a.z * k) }
    public static func / (a: Vec3, k: Double) -> Vec3 { Vec3(a.x / k, a.y / k, a.z / k) }
    public static func += (a: inout Vec3, b: Vec3) { a = a + b }
    public static func -= (a: inout Vec3, b: Vec3) { a = a - b }

    public func dot(_ b: Vec3) -> Double { x * b.x + y * b.y + z * b.z }
    public func cross(_ b: Vec3) -> Vec3 { Vec3(y * b.z - z * b.y, z * b.x - x * b.z, x * b.y - y * b.x) }
    public var length: Double { (x * x + y * y + z * z).squareRoot() }
    public var lengthSquared: Double { x * x + y * y + z * z }
    public var normalized: Vec3 { let l = length; return l > 1e-12 ? self / l : Vec3(0, 1, 0) }
    public var isFinite: Bool { x.isFinite && y.isFinite && z.isFinite }
    public func lerp(_ b: Vec3, _ t: Double) -> Vec3 { self + (b - self) * t }
}

/// Unit quaternion (x, y, z, w) for orientations.
public struct Quat: Equatable {
    public var x: Double, y: Double, z: Double, w: Double
    public init(_ x: Double, _ y: Double, _ z: Double, _ w: Double) { self.x = x; self.y = y; self.z = z; self.w = w }
    public static let identity = Quat(0, 0, 0, 1)

    public init(axis: Vec3, angle: Double) {
        let a = axis.normalized, h = angle / 2, s = sin(h)
        self.init(a.x * s, a.y * s, a.z * s, cos(h))
    }
    /// Hamilton product (apply `b` first, then `a`).
    public static func * (a: Quat, b: Quat) -> Quat {
        Quat(a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
             a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
             a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
             a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z)
    }
    public func rotate(_ v: Vec3) -> Vec3 {
        // v' = v + 2w(q x v) + 2 q x (q x v)
        let q = Vec3(x, y, z)
        let t = q.cross(v) * 2
        return v + t * w + q.cross(t)
    }
    public var normalized: Quat {
        let l = (x * x + y * y + z * z + w * w).squareRoot()
        return l > 1e-12 ? Quat(x / l, y / l, z / l, w / l) : .identity
    }
}
