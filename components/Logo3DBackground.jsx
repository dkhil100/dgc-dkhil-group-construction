"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, DoubleSide } from "three";
import { Float } from "@react-three/drei";

function Extruded3DPngLogo({ imagePath = "/logo.png" }) {
  const groupRef = useRef();
  const logoTexture = useLoader(TextureLoader, imagePath);

  // Thickness setup (16 overlapping plane slices)
  const depthLayers = 16;
  const layerSpacing = 0.012;

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Direct, uninterruptible frame-rate independent rotation
      // Works smoothly regardless of scrolling up, down, or standing still
      groupRef.current.rotation.y += delta * 0.45;
    }
  });

  return (
    <Float speed={0} rotationIntensity={0} floatIntensity={0.2}>
      <group ref={groupRef}>
        {Array.from({ length: depthLayers }).map((_, i) => {
          const zOffset = (i - depthLayers / 2) * layerSpacing;
          const isFrontOrBack = i === 0 || i === depthLayers - 1;

          return (
            <mesh key={i} position={[0, 0, zOffset]}>
              <planeGeometry args={[3.2, 3.2]} />
              <meshStandardMaterial
                map={logoTexture}
                transparent={true}
                alphaTest={0.05}
                color={isFrontOrBack ? "#ffffff" : "#b45309"}
                roughness={0.2}
                metalness={0.7}
                side={DoubleSide}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

export default function Logo3DBackground({ imagePath = "/logo.png" }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={2.0} />
        <directionalLight position={[5, 5, 5]} intensity={3.0} />
        <directionalLight position={[-5, -5, -5]} intensity={1.0} />
        <Suspense fallback={null}>
          <Extruded3DPngLogo imagePath={imagePath} />
        </Suspense>
      </Canvas>
    </div>
  );
}