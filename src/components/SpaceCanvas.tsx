"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

// Starfield Particle System
function Starfield() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create star coordinates
  const [positions] = useState(() => {
    const arr = new Float32Array(6000 * 3);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = (Math.random() - 0.5) * 80;
    }
    return arr;
  });

  useFrame((state) => {
    if (pointsRef.current) {
      // Slow background cosmic rotation
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.005;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

// Glowing Interactive Holographic Earth
function HolographicEarth({ scrollPercent }: { scrollPercent: number }) {
  const earthRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (earthRef.current) {
      // Self rotation
      earthRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      
      // Interactive mouse feedback (parallax hover)
      earthRef.current.rotation.x = THREE.MathUtils.lerp(earthRef.current.rotation.x, mouse.y * 0.3, 0.08);
      earthRef.current.rotation.y += THREE.MathUtils.lerp(0, mouse.x * 0.3, 0.08);

      // Scroll physics integration: scroll pushes Earth back or shifts position
      const targetZ = -5 - scrollPercent * 12;
      const targetY = -scrollPercent * 5;
      earthRef.current.position.z = THREE.MathUtils.lerp(earthRef.current.position.z, targetZ, 0.08);
      earthRef.current.position.y = THREE.MathUtils.lerp(earthRef.current.position.y, targetY, 0.08);
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      ringRef1.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.z = -state.clock.getElapsedTime() * 0.15;
      ringRef2.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={earthRef} position={[0, 0, -5]}>
      {/* Central Core Glow */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#060B24"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Main Wireframe Globe */}
      <mesh>
        <sphereGeometry args={[1.8, 40, 40]} />
        <meshBasicMaterial
          color="#00F5FF"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Outer Point Cloud Globe */}
      <points>
        <sphereGeometry args={[1.82, 30, 30]} />
        <pointsMaterial
          color="#8B5CF6"
          size={0.03}
          transparent
          opacity={0.7}
        />
      </points>

      {/* Orbit Ring 1 - Cyan */}
      <mesh ref={ringRef1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.5, 0.015, 8, 100]} />
        <meshBasicMaterial color="#00F5FF" transparent opacity={0.6} />
      </mesh>

      {/* Orbit Ring 2 - Purple */}
      <mesh ref={ringRef2} rotation={[Math.PI / -4, Math.PI / 4, 0]}>
        <torusGeometry args={[3.0, 0.02, 8, 100]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

// Floating Tech Objects Reacting to Scroll & Mouse
function FloatingTechObjects({ scrollPercent }: { scrollPercent: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const itemsRef = useRef<THREE.Mesh[]>([]);
  const { mouse } = useThree();

  // Positions for floating boxes/nodes
  const [objects] = useState(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        -2 - Math.random() * 15,
      ] as [number, number, number],
      speed: Math.random() * 0.2 + 0.1,
      rotSpeed: Math.random() * 0.4 + 0.1,
      color: i % 3 === 0 ? "#00F5FF" : i % 3 === 1 ? "#8B5CF6" : "#7CFFCB",
      scale: Math.random() * 0.3 + 0.15,
    }));
  });

  useFrame((state) => {
    if (groupRef.current) {
      // Parallax scroll shift
      groupRef.current.position.y = scrollPercent * 8;
      
      // Interactive mouse skew
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.2, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.2, 0.05);
    }

    // Animate items individually
    itemsRef.current.forEach((mesh, index) => {
      if (mesh) {
        const item = objects[index];
        mesh.rotation.x += item.rotSpeed * 0.02;
        mesh.rotation.y += item.rotSpeed * 0.01;
        // Float oscillation
        mesh.position.y += Math.sin(state.clock.getElapsedTime() * item.speed + index) * 0.003;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {objects.map((obj, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) itemsRef.current[i] = el;
          }}
          position={obj.pos}
          scale={[obj.scale, obj.scale, obj.scale]}
        >
          {i % 2 === 0 ? (
            <boxGeometry args={[1, 1, 1]} />
          ) : (
            <dodecahedronGeometry args={[0.7]} />
          )}
          <meshBasicMaterial
            color={obj.color}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// Scene Camera Controller
function CameraController({ scrollPercent }: { scrollPercent: number }) {
  const { camera } = useThree();

  useEffect(() => {
    // Initial camera placement
    camera.position.set(0, 0, 5);
  }, [camera]);

  useFrame(() => {
    // Dynamic scroll-based zoom
    const targetZ = 5 + scrollPercent * 8;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);
  });

  return null;
}

export default function SpaceCanvas() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const pct = window.scrollY / scrollHeight;
        setScrollPercent(pct);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-gradient-to-b from-[#000000] via-[#060B24] to-[#0F172A]">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <Starfield />
        <HolographicEarth scrollPercent={scrollPercent} />
        <FloatingTechObjects scrollPercent={scrollPercent} />
        <CameraController scrollPercent={scrollPercent} />
      </Canvas>
    </div>
  );
}
