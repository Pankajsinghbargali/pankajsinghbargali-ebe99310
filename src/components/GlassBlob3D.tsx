import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function Blob() {
  const mesh = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!mesh.current) return;
    mouse.current.x = state.mouse.x;
    mouse.current.y = state.mouse.y;
    mesh.current.rotation.x += 0.0015;
    mesh.current.rotation.y += 0.002;
    // gentle parallax tilt
    mesh.current.rotation.x += (mouse.current.y * 0.15 - mesh.current.rotation.x * 0.02) * 0.02;
    mesh.current.rotation.y += (mouse.current.x * 0.15 - mesh.current.rotation.y * 0.02) * 0.02;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh} scale={1.6}>
        <icosahedronGeometry args={[1, 6]} />
        <meshPhysicalMaterial
          transmission={1}
          thickness={1.4}
          roughness={0.12}
          ior={1.45}
          chromaticAberration={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
          color={'#f5f2ed'}
          attenuationColor={'#d8c89a'}
          attenuationDistance={2.2}
        />
      </mesh>
    </Float>
  );
}

export default function GlassBlob3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 35 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <directionalLight position={[-3, -2, -2]} intensity={0.4} color={'#b8924a'} />
      <Blob />
      <Environment preset="studio" />
    </Canvas>
  );
}
