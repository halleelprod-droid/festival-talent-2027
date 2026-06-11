'use client';

import {
  Canvas,
  useFrame
} from '@react-three/fiber';

import {
  Points,
  PointMaterial
} from '@react-three/drei';

import {
  useRef,
  useMemo
} from 'react';

import * as THREE from 'three';

function seededValue(index: number) {
  const value =
    Math.sin(index * 97.13) * 10000;

  return value - Math.floor(value);
}

function Stars() {
  const ref =
    useRef<THREE.Points>(null);

  const positions =
    useMemo(() => {
      const positions =
        new Float32Array(5000);

      for (
        let i = 0;
        i < 5000;
        i++
      ) {
        positions[i] =
          (seededValue(i) - 0.5) * 6;
      }

      return positions;
    }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;

    ref.current.rotation.x -=
      delta * 0.02;

    ref.current.rotation.y -=
      delta * 0.03;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={positions}
        stride={3}
        frustumCulled
      >
        <PointMaterial
          transparent
          color="#C9A84C"
          size={0.008}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function Particles3D() {
  return (
    <div className="absolute inset-0 z-[1]">
      <Canvas
        camera={{
          position: [0, 0, 1]
        }}
      >
        <Stars />
      </Canvas>
    </div>
  );
}
