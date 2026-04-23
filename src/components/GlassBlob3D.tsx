import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

const STAGES = [
  {
    label: 'Awareness',
    sub: 'Cold Audience · Top of Funnel',
    metric: '~10,000 Impressions',
    color: '#60a5fa', // blue
    emissive: '#3b82f6',
    y: 1.55,
    radiusTop: 1.6,
    radiusBottom: 1.15,
    height: 1.0,
  },
  {
    label: 'Consideration',
    sub: 'Warm Leads · Mid Funnel',
    metric: '~1,200 Clicks',
    color: '#a78bfa', // purple
    emissive: '#8b5cf6',
    y: 0.3,
    radiusTop: 1.15,
    radiusBottom: 0.65,
    height: 1.0,
  },
  {
    label: 'Conversion',
    sub: 'High Intent · Bottom of Funnel',
    metric: '~58 Leads',
    color: '#fbbf24', // gold
    emissive: '#f59e0b',
    y: -0.95,
    radiusTop: 0.65,
    radiusBottom: 0.22,
    height: 1.0,
  },
];

function FunnelStage({ stage, index }: { stage: typeof STAGES[0]; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!matRef.current) return;
    matRef.current.opacity = THREE.MathUtils.lerp(matRef.current.opacity, hovered ? 0.78 : 0.38, 0.07);
    matRef.current.emissiveIntensity = THREE.MathUtils.lerp(matRef.current.emissiveIntensity, hovered ? 0.6 : 0.12, 0.07);
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, stage.y, 0]}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
      <cylinderGeometry args={[stage.radiusTop, stage.radiusBottom, stage.height, 64, 1, true]} />
      <meshPhysicalMaterial
        ref={matRef}
        color={stage.color}
        emissive={stage.emissive}
        emissiveIntensity={0.12}
        transmission={0.55}
        thickness={0.6}
        roughness={0.08}
        ior={1.45}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
        transparent
        opacity={0.38}
        side={THREE.DoubleSide}
        metalness={0.05}
      />

      {hovered && (
        <Html
          center
          position={[stage.radiusTop + 1.0, 0, 0]}
          distanceFactor={5}
          zIndexRange={[100, 0]}
        >
          <div style={{
            background: 'rgba(5, 5, 15, 0.88)',
            backdropFilter: 'blur(18px) saturate(160%)',
            WebkitBackdropFilter: 'blur(18px) saturate(160%)',
            border: `1px solid ${stage.color}55`,
            borderRadius: '14px',
            padding: '14px 20px',
            minWidth: '190px',
            pointerEvents: 'none',
            boxShadow: `0 8px 40px rgba(0,0,0,0.5), 0 0 20px ${stage.emissive}22`,
          }}>
            <div style={{ color: stage.color, fontSize: '9px', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Stage {index + 1}
            </div>
            <div style={{ color: '#ffffff', fontSize: '17px', fontWeight: 700, marginBottom: '4px', lineHeight: 1.2 }}>
              {stage.label}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', marginBottom: '10px', lineHeight: 1.4 }}>
              {stage.sub}
            </div>
            <div style={{
              background: `${stage.emissive}22`,
              border: `1px solid ${stage.color}33`,
              borderRadius: '8px',
              padding: '6px 10px',
              color: stage.color,
              fontSize: '12px',
              fontWeight: 700,
            }}>
              {stage.metric}
            </div>
          </div>
        </Html>
      )}
    </mesh>
  );
}

function Particles() {
  const count = 40;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      t: (i / count) * 5,      // stagger start times
      speed: 0.006 + Math.random() * 0.006,
      angle: Math.random() * Math.PI * 2,
      colorIndex: Math.floor(Math.random() * 3),
    }))
  , []);

  const meshRef = useRef<THREE.InstancedMesh>(null);
  const colorArr = useMemo(() => ['#60a5fa', '#a78bfa', '#fbbf24'], []);
  const colorObjs = useMemo(() => colorArr.map(c => new THREE.Color(c)), [colorArr]);

  useFrame(() => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      p.t += p.speed;
      const cycle = p.t % 5;
      const progress = cycle / 5;              // 0 → 1 (top → bottom)
      const y = 2.2 - progress * 5.2;          // 2.2 down to -3.0

      // Match funnel shape — radius narrows from 1.5 → 0.1
      const radius = THREE.MathUtils.lerp(1.45, 0.08, progress);
      const angle = p.angle + p.t * 0.5;

      dummy.position.set(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      );
      // Particles shrink as they fall
      const s = THREE.MathUtils.lerp(0.055, 0.018, progress);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      meshRef.current!.setColorAt(i, colorObjs[p.colorIndex]);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshStandardMaterial
        emissive={'#ffffff'}
        emissiveIntensity={1.5}
        roughness={0.1}
        metalness={0.4}
        vertexColors
      />
    </instancedMesh>
  );
}

// Glowing ring at bottom (output)
function OutputRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta;
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.6 + Math.sin(t.current * 3) * 0.4;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, -1.66, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.22, 0.04, 16, 64]} />
      <meshStandardMaterial
        ref={matRef}
        color={'#fbbf24'}
        emissive={'#f59e0b'}
        emissiveIntensity={0.8}
        metalness={0.9}
        roughness={0.05}
      />
    </mesh>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.mouse.x * 0.55, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.mouse.y * 0.28, 0.04);
  });

  return (
    <group ref={group}>
      <Float speed={1.0} rotationIntensity={0.05} floatIntensity={0.3}>
        {STAGES.map((stage, i) => (
          <FunnelStage key={i} stage={stage} index={i} />
        ))}
        <OutputRing />
        <Particles />
      </Float>
    </group>
  );
}

export default function GlassBlob3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 6.2], fov: 36 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 5]} intensity={1.8} color={'#ffffff'} />
      <directionalLight position={[-4, -2, -4]} intensity={0.7} color={'#60a5fa'} />
      <pointLight position={[0, 4, 2]} intensity={1.4} color={'#a78bfa'} />
      <pointLight position={[0, -2, 2]} intensity={1.0} color={'#fbbf24'} />

      <Scene />
      <Environment preset="studio" />
    </Canvas>
  );
}
