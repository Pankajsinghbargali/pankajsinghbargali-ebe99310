import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function GlobePoints() {
  const groupRef = useRef<THREE.Group>(null);
  
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    const count = 200;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = 1.5 * Math.cos(theta) * Math.sin(phi);
      const y = 1.5 * Math.sin(theta) * Math.sin(phi);
      const z = 1.5 * Math.cos(phi);
      pts.push([x, y, z]);
    }
    return pts;
  }, []);

  const connections = useMemo(() => {
    const lines: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < 30; i++) {
      const a = Math.floor(Math.random() * points.length);
      const b = Math.floor(Math.random() * points.length);
      if (a !== b) {
        lines.push([
          new THREE.Vector3(...points[a]),
          new THREE.Vector3(...points[b]),
        ]);
      }
    }
    return lines;
  }, [points]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe sphere */}
      <Sphere args={[1.48, 32, 32]}>
        <meshBasicMaterial color="#D4AF37" wireframe transparent opacity={0.08} />
      </Sphere>

      {/* Glow sphere */}
      <Sphere args={[1.52, 32, 32]}>
        <meshBasicMaterial color="#7B68EE" transparent opacity={0.03} />
      </Sphere>

      {/* Points */}
      {points.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.8} />
        </mesh>
      ))}

      {/* Connection lines */}
      {connections.map(([start, end], i) => {
        const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        const distance = start.distanceTo(end);
        const direction = new THREE.Vector3().subVectors(end, start).normalize();
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          direction
        );

        return (
          <mesh key={`line-${i}`} position={midPoint} quaternion={quaternion}>
            <cylinderGeometry args={[0.003, 0.003, distance, 4]} />
            <meshBasicMaterial color="#D4AF37" transparent opacity={0.15} />
          </mesh>
        );
      })}
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return [pos];
  }, []);

  useFrame((_, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={100}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#D4AF37" size={0.02} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function Globe3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <GlobePoints />
        <FloatingParticles />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI * 0.75}
          minPolarAngle={Math.PI * 0.25}
        />
      </Canvas>
    </div>
  );
}
