"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function EnergyCore({ mouse, reducedMotion }: { mouse: React.RefObject<THREE.Vector2>; reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const innerMatRef = useRef<THREE.ShaderMaterial>(null);
  const glowMatRef = useRef<THREE.ShaderMaterial>(null);

  const particleCount = 600;
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.5 + seededRandom(i * 3) * 3;
      const theta = seededRandom(i * 3 + 1) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 3 + 2) - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      sizes[i] = 0.5 + seededRandom(i * 7) * 1.5;
    }
    return { positions, sizes };
  }, []);

  const innerMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          mouse: { value: new THREE.Vector2(0, 0) },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec2 mouse;
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
            float pulse = sin(time * 0.8) * 0.15 + 0.85;
            float mouseInfluence = 1.0 + length(mouse) * 0.3;
            vec3 coreColor = mix(vec3(0.72, 0.88, 1.0), vec3(1.0, 0.97, 0.91), fresnel * 0.4);
            vec3 edgeColor = vec3(0.9, 0.96, 1.0);
            vec3 finalColor = mix(coreColor, edgeColor, fresnel);
            float alpha = (0.6 + fresnel * 0.4) * pulse * mouseInfluence;
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
      }),
    []
  );

  const glowMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          varying vec3 vNormal;
          void main() {
            float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
            float pulse = sin(time * 0.5) * 0.1 + 0.9;
            vec3 glowColor = vec3(0.72, 0.88, 1.0);
            float alpha = fresnel * 0.25 * pulse;
            gl_FragColor = vec4(glowColor, alpha);
          }
        `,
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    []
  );

  useEffect(() => {
    innerMatRef.current = innerMaterial;
    glowMatRef.current = glowMaterial;
  }, [innerMaterial, glowMaterial]);

  useFrame((state) => {
    if (reducedMotion) return;

    const t = state.clock.getElapsedTime();

    const iMat = innerMatRef.current;
    const gMat = glowMatRef.current;

    if (iMat) {
      iMat.uniforms.time.value = t;
      if (mouse.current) iMat.uniforms.mouse.value.copy(mouse.current);
    }
    if (gMat) {
      gMat.uniforms.time.value = t;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
      if (mouse.current) {
        const mx = mouse.current.x * 0.15;
        const my = mouse.current.y * 0.15;
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          my,
          0.02
        );
        groupRef.current.rotation.z = THREE.MathUtils.lerp(
          groupRef.current.rotation.z,
          mx,
          0.02
        );
      }
    }

    if (innerRef.current) {
      const s = 1 + Math.sin(t * 0.6) * 0.03;
      innerRef.current.scale.setScalar(s);
    }

    if (ringRef1.current) ringRef1.current.rotation.x = t * 0.3;
    if (ringRef2.current) ringRef2.current.rotation.y = t * 0.25;
    if (ringRef3.current) ringRef3.current.rotation.z = t * 0.2;

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position;
      const arr = positions.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;
        const x = arr[ix];
        const y = arr[iy];
        const z = arr[iz];
        const dist = Math.sqrt(x * x + y * y + z * z);
        const angle = Math.atan2(z, x) + 0.001;
        const newDist = dist + Math.sin(t * 0.3 + i * 0.01) * 0.002;
        arr[ix] = Math.cos(angle) * newDist;
        arr[iz] = Math.sin(angle) * newDist;
        arr[iy] = y + Math.sin(t * 0.5 + i * 0.1) * 0.001;
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={innerRef} material={innerMaterial}>
        <icosahedronGeometry args={[0.9, 6]} />
      </mesh>

      <mesh ref={glowRef} material={glowMaterial} scale={1.8}>
        <icosahedronGeometry args={[1, 4]} />
      </mesh>

      <mesh ref={ringRef1}>
        <torusGeometry args={[1.6, 0.008, 16, 100]} />
        <meshBasicMaterial color="var(--color-energy-glow)" transparent opacity={0.35} />
      </mesh>
      <mesh ref={ringRef2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.8, 0.006, 16, 100]} />
        <meshBasicMaterial color="var(--color-energy-glow)" transparent opacity={0.2} />
      </mesh>
      <mesh ref={ringRef3} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <torusGeometry args={[2.0, 0.005, 16, 100]} />
        <meshBasicMaterial color="var(--color-energy)" transparent opacity={0.15} />
      </mesh>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[particlePositions.sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          color="var(--color-energy-glow)"
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function Scene({ mouse, reducedMotion }: { mouse: React.RefObject<THREE.Vector2>; reducedMotion: boolean }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 4.5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="var(--color-energy-glow)" />
      <pointLight position={[-5, -3, 3]} intensity={0.3} color="var(--color-plasma)" />
      <EnergyCore mouse={mouse} reducedMotion={reducedMotion} />
    </>
  );
}

export default function AetherCore({
  className = "",
  scale = 1,
}: {
  className?: string;
  scale?: number;
}) {
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const reducedMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`w-full h-full ${className}`}
      style={{ transform: `scale(${scale})` }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ fov: 45, near: 0.1, far: 100 }}
        style={{ background: "transparent" }}
      >
        <Scene mouse={mouseRef} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
