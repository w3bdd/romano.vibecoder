import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Lightformer, ContactShadows } from "@react-three/drei";

// ---------------------------------------------------------------
// HeroScene — the premium chrome sculpture in the homepage hero.
// An abstract torus knot with a mirror-polished metal finish,
// floating gently, rotating slowly, and leaning subtly toward the
// visitor's cursor. The studio "lighting" is generated in code
// (no image downloads) and changes with the theme:
//   light mode = soft ivory studio, platinum reflections
//   dark mode  = dark studio, dramatic silver highlights
// ---------------------------------------------------------------

function Sculpture({ dark, isMobile }) {
  const mesh = useRef();

  useFrame((state, delta) => {
    if (!mesh.current) return;
    // Slow, continuous rotation — calm, never frantic
    mesh.current.rotation.x += delta * 0.12;
    mesh.current.rotation.y += delta * 0.18;
    // Cursor-responsive parallax: drift gently toward the pointer
    const { x, y } = state.pointer;
    mesh.current.position.x += (x * 0.35 - mesh.current.position.x) * 0.04;
    mesh.current.position.y += (-y * 0.25 - mesh.current.position.y) * 0.04;
  });

  return (
    // Float adds a soft vertical bob on top of everything else
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.9}>
      <mesh ref={mesh}>
        {/* Fewer polygons on mobile = smoother on small devices */}
        <torusKnotGeometry args={[1, 0.32, isMobile ? 128 : 220, isMobile ? 24 : 36]} />
        <meshStandardMaterial
          color={dark ? "#d5d5d5" : "#c5c5c5"}
          metalness={1}
          roughness={0.12}
          envMapIntensity={dark ? 1.1 : 1.4}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene({ dark, isMobile }) {
  return (
    <Canvas
      dpr={isMobile ? [1, 1.5] : [1, 1.75]}
      camera={{ position: [0, 0, 5.6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      data-testid="hero-3d-canvas"
    >
      <ambientLight intensity={dark ? 0.35 : 0.6} />
      <directionalLight position={[4, 6, 4]} intensity={dark ? 1.2 : 1.6} />

      <Sculpture dark={dark} isMobile={isMobile} />

      {/* Procedural studio environment — softboxes drawn as light panels */}
      <Environment resolution={256}>
        {dark ? (
          <>
            <Lightformer intensity={2.2} position={[0, 5, 0]} scale={[10, 1, 1]} color="#ffffff" />
            <Lightformer intensity={1.2} position={[-5, 1, -1]} scale={[4, 2, 1]} color="#c4c4c4" />
            <Lightformer intensity={0.8} position={[5, -1, 0]} scale={[4, 2, 1]} color="#8a8a8a" />
          </>
        ) : (
          <>
            <Lightformer intensity={2.6} position={[0, 5, 0]} scale={[10, 1, 1]} color="#fff8ec" />
            <Lightformer intensity={1.6} position={[-5, 1, -1]} scale={[4, 2, 1]} color="#ffffff" />
            <Lightformer intensity={1.0} position={[5, -1, 0]} scale={[4, 2, 1]} color="#e5e1da" />
          </>
        )}
      </Environment>

      {/* A soft shadow beneath the sculpture grounds it in space */}
      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={dark ? 0.45 : 0.25}
        scale={10}
        blur={2.6}
        far={4}
        color={dark ? "#000000" : "#6b6b6b"}
      />
    </Canvas>
  );
}
