// swift-tools-version:5.9
import PackageDescription

// GutterCore: the gutter geometry and ball physics for Gutterball on Apple
// Watch. Pure Swift + Foundation (no UI), so it builds and tests anywhere.
let package = Package(
    name: "GutterCore",
    platforms: [.watchOS(.v10), .iOS(.v17), .macOS(.v14)],
    products: [.library(name: "GutterCore", targets: ["GutterCore"])],
    targets: [
        .target(name: "GutterCore"),
        .testTarget(name: "GutterCoreTests", dependencies: ["GutterCore"]),
    ]
)
