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
          roughness={0.1}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0.08}
          color={'#f5f2ed'}
          attenuationColor={'#d8c89a'}
          attenuationDistance={2.2}
        />
      </mesh>
    </Float>
  );
}

function OrbitalSphere() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.35;
    group.current.rotation.x = Math.sin(t * 0.2) * 0.15;
  });
  return (
    <group ref={group}>
      <mesh position={[2.2, 0.6, 0.4]}>
        <sphereGeometry args={[0.28, 48, 48]} />
        <meshPhysicalMaterial
          transmission={0.9}
          thickness={0.6}
          roughness={0.18}
          ior={1.4}
          clearcoat={1}
          color={'#e9d8a6'}
          attenuationColor={'#b8924a'}
          attenuationDistance={1.4}
          emissive={'#b8924a'}
          emissiveIntensity={0.08}
        />
      </mesh>
    </group>
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
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <directionalLight position={[-3, -2, -2]} intensity={0.5} color={'#b8924a'} />
      {/* Brighter rim light */}
      <directionalLight position={[-4, 2, -3]} intensity={1.1} color={'#ffe8b0'} />
      <Blob />
      <OrbitalSphere />
      <Environment preset="studio" />
    </Canvas>
  );
}
