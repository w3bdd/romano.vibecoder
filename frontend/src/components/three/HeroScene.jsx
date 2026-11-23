import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Lightformer, ContactShadows } from "@react-three/drei";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry.js";

// ---------------------------------------------------------------
// "Meridian" — the signature platinum sculpture in the hero.
// An original fluid-metal ribbon (generated from a mathematical
// curve, not stock geometry) folding through a brushed-aluminum
// architectural slab. In plain words:
//   - It fades in gently as the page loads (lights "turn up")
//   - It floats and rotates slowly, leaning toward the cursor
//   - As you scroll away from the hero, it keeps rotating and the
//     camera drifts — a quiet farewell, then the page takes over
// The studio "lighting" is drawn in code (no image downloads) and
// changes with the theme: warm ivory studio in light mode,
// dramatic silver in dark mode.
// ---------------------------------------------------------------

// The flowing ribbon's shape: one continuous folded band of metal.
function ribbonPoint(u, v, target) {
  const t = u * Math.PI * 2;
  const w = (v - 0.5) * 0.85;
  const r = 1.35 + 0.25 * Math.sin(3 * t);
  target.set(
    r * Math.cos(t) + w * Math.cos(2 * t),
    0.55 * Math.sin(2 * t) + w * Math.sin(t),
    0.85 * r * Math.sin(t) + w * Math.sin(3 * t)
  );
}

function Sculpture({ dark, isMobile }) {
  const group = useRef();

  // Build the ribbon once (fewer polygons on mobile = smoother)
  const ribbon = useMemo(
    () => new ParametricGeometry(ribbonPoint, isMobile ? 120 : 200, isMobile ? 12 : 20),
    [isMobile]
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    // Entrance: lights and scale ease in over the first ~1.8 seconds
    const enter = THREE.MathUtils.smoothstep(state.clock.elapsedTime, 0, 1.8);

    // Scroll progress through the hero (0 = top, 1 = hero left behind)
    const s = Math.min(1, window.scrollY / (window.innerHeight * 1.1));

    // Idle rotation + extra rotation as you scroll
    g.rotation.y += delta * 0.1;
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, s * 0.6, 0.05);

    // Cursor-responsive parallax — smooth, never jumpy
    g.position.x += (state.pointer.x * 0.3 - g.position.x) * 0.04;
    g.position.y += (-state.pointer.y * 0.2 - g.position.y) * 0.04;

    // Camera drifts down and back as you scroll away
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -s * 1.2, 0.06);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 6 + s * 1.4, 0.06);

    // Scale entrance
    g.scale.setScalar((isMobile ? 0.95 : 1.05) * (0.88 + 0.12 * enter));
  });

  return (
    // Float adds a soft vertical bob on top of everything else
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.7}>
      <group ref={group}>
        {/* The liquid-platinum ribbon */}
        <mesh geometry={ribbon}>
          <meshPhysicalMaterial
            color={dark ? "#d9d9d9" : "#c9c9c9"}
            metalness={1}
            roughness={0.14}
            clearcoat={0.6}
            clearcoatRoughness={0.2}
            envMapIntensity={dark ? 1.15 : 1.45}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* The architectural brushed-aluminum slab it folds through */}
        <mesh position={[0.9, -0.7, -0.6]} rotation={[0.35, 0.5, 0.12]}>
          <boxGeometry args={[2.6, 0.14, 1.1]} />
          <meshStandardMaterial
            color={dark ? "#bfbfbf" : "#b8b8b8"}
            metalness={0.95}
            roughness={0.32}
            envMapIntensity={dark ? 0.9 : 1.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function HeroScene({ dark, isMobile }) {
  return (
    <Canvas
      dpr={isMobile ? [1, 1.5] : [1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      data-testid="hero-3d-canvas"
    >
      <ambientLight intensity={dark ? 0.3 : 0.55} />
      <directionalLight position={[4, 6, 4]} intensity={dark ? 1.2 : 1.6} />

      <Sculpture dark={dark} isMobile={isMobile} />

      {/* Procedural studio — softbox panels drawn as light strips */}
      <Environment resolution={256}>
        {dark ? (
          <>
            <Lightformer intensity={2.2} position={[0, 5, 0]} scale={[10, 1, 1]} color="#ffffff" />
            <Lightformer intensity={1.1} position={[-5, 1, -1]} scale={[4, 2, 1]} color="#c4c4c4" />
            <Lightformer intensity={0.7} position={[5, -1, 0]} scale={[4, 2, 1]} color="#8a8a8a" />
          </>
        ) : (
          <>
            <Lightformer intensity={2.6} position={[0, 5, 0]} scale={[10, 1, 1]} color="#fff8ec" />
            <Lightformer intensity={1.5} position={[-5, 1, -1]} scale={[4, 2, 1]} color="#ffffff" />
            <Lightformer intensity={1.0} position={[5, -1, 0]} scale={[4, 2, 1]} color="#e5e1da" />
          </>
        )}
      </Environment>

      {/* Soft architectural shadow grounding the sculpture */}
      <ContactShadows
        position={[0, -2.3, 0]}
        opacity={dark ? 0.45 : 0.22}
        scale={11}
        blur={2.8}
        far={4}
        color={dark ? "#000000" : "#6b6b6b"}
      />
    </Canvas>
  );
}
