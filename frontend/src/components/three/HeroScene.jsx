import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Lightformer, ContactShadows } from "@react-three/drei";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry.js";

// ---------------------------------------------------------------
// "Meridian III" — the signature sculptural centerpiece.
// A champagne-gold ribbon holds the composition together while the
// central PLATINUM form continuously shifts shape — flowing between
// a loop, a wave and a rising twist, like liquid metal deciding what
// it wants to be. Small polished orbs orbit the whole piece.
//   - Fades in gently as the page loads (lights "turn up")
//   - Floats and rotates slowly, leaning toward the cursor
//   - Keeps rotating as you scroll away, camera drifts after it
// The studio "lighting" is drawn in code and changes with the theme.
// ---------------------------------------------------------------

// --- The three shapes the center form cycles through ------------
// (all share the same grid size so the mesh can morph smoothly)

// Shape 1: the flowing loop ribbon
const shapeLoop = (u, v, target) => {
  const t = u * Math.PI * 2;
  const w = (v - 0.5) * 0.7;
  const r = 1.25 + 0.3 * Math.sin(3 * t);
  target.set(
    r * Math.cos(t) + w * Math.cos(2 * t),
    0.6 * Math.sin(2 * t) + w * Math.sin(t) - 0.1,
    0.8 * r * Math.sin(t) + w * Math.sin(3 * t)
  );
};

// Shape 2: a wide, gently rippling wave ring
const shapeWave = (u, v, target) => {
  const t = u * Math.PI * 2;
  const w = (v - 0.5) * 1.4;
  const r = 1.3;
  target.set(
    r * Math.cos(t) + w * Math.cos(t),
    0.25 * Math.sin(4 * t) + w * 0.4 * Math.sin(3 * t),
    r * Math.sin(t) + w * Math.sin(t)
  );
};

// Shape 3: a rising vertical twist
const shapeTwist = (u, v, target) => {
  const t = u * Math.PI * 2;
  const w = (v - 0.5) * 0.8;
  const r = 0.9 + 0.15 * Math.sin(2 * t);
  target.set(
    r * Math.cos(t) + w * Math.cos(t + 1.2),
    (u - 0.5) * 2.2 + w * Math.sin(t),
    r * Math.sin(t) + w * Math.sin(t + 1.2)
  );
};

const SHAPES = [shapeLoop, shapeWave, shapeTwist];
// The shape-shift melts continuously at the same unhurried pace as the
// rotation — no pauses, no jumps, just a slow liquid drift between forms.
const MORPH_SECONDS_PER_SHAPE = 12;

// The gold ribbon keeps its own steady curve (the constant in the piece)
const goldRibbonPoint = (u, v, target) => {
  const t = u * Math.PI * 2 + 1.9;
  const w = (v - 0.5) * 0.7;
  const r = 1.25 + 0.3 * Math.sin(3 * t + 1.9);
  target.set(
    r * Math.cos(t) + w * Math.cos(2 * t + 1.9),
    0.6 * Math.sin(2 * t) + w * Math.sin(t + 1.9) + 0.15,
    0.8 * r * Math.sin(t) + w * Math.sin(3 * t)
  );
};

// Where the small orbiting elements sit — fixed, art-directed positions.
const SATELLITES = [
  { pos: [1.9, 0.9, -0.6], size: 0.13, gold: true, speed: 1.8 },
  { pos: [-1.7, -0.8, 0.4], size: 0.1, gold: false, speed: 1.3 },
  { pos: [-0.6, 1.3, -0.9], size: 0.08, gold: true, speed: 2.1 },
];

function Sculpture({ dark, isMobile }) {
  const group = useRef();
  const morphMesh = useRef();
  const frameSkip = useRef(0);

  const gridU = isMobile ? 110 : 200;
  const gridV = isMobile ? 12 : 20;

  // Precompute every shape's vertex positions once (morph = blend between them)
  const shapePositions = useMemo(
    () =>
      SHAPES.map((fn) =>
        new ParametricGeometry(fn, gridU, gridV).attributes.position.array.slice()
      ),
    [gridU, gridV]
  );

  // The morphable platinum mesh, starting as the loop shape
  const morphGeo = useMemo(() => {
    const base = new ParametricGeometry(shapeLoop, gridU, gridV);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(base.attributes.position.array.slice(), 3));
    g.setAttribute("uv", base.attributes.uv);
    g.setIndex(base.index);
    g.computeVertexNormals();
    return g;
  }, [gridU, gridV]);

  const goldRibbon = useMemo(
    () => new ParametricGeometry(goldRibbonPoint, isMobile ? 100 : 180, isMobile ? 12 : 18),
    [isMobile]
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    // Entrance: the composition eases in over the first ~1.8 seconds
    const enter = THREE.MathUtils.smoothstep(state.clock.elapsedTime, 0, 1.8);

    // Scroll progress through the hero (0 = top, 1 = hero left behind)
    const s = Math.min(1, window.scrollY / (window.innerHeight * 1.1));

    // Idle rotation + extra rotation as you scroll
    g.rotation.y += delta * 0.1;
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, s * 0.55, 0.05);

    // Cursor-responsive parallax — smooth, never jumpy
    g.position.x += (state.pointer.x * 0.3 - g.position.x) * 0.04;
    g.position.y += (-state.pointer.y * 0.2 - g.position.y) * 0.04;

    // Camera drifts down and back as you scroll away
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -s * 1.2, 0.06);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 6.2 + s * 1.4, 0.06);

    // Scale entrance
    g.scale.setScalar((isMobile ? 0.9 : 1.02) * (0.86 + 0.14 * enter));

    // ---- The shape-shift: a slow, continuous melt between forms ----
    const t = state.clock.elapsedTime;
    const phase = t / MORPH_SECONDS_PER_SHAPE;
    const seg = Math.floor(phase) % SHAPES.length;
    const local = phase % 1;
    // Cosine ease-in-out: the blend never stops or snaps, just drifts
    const k = 0.5 - 0.5 * Math.cos(local * Math.PI);
    const from = shapePositions[seg];
    const to = shapePositions[(seg + 1) % SHAPES.length];
    const pos = morphGeo.attributes.position.array;
    for (let i = 0; i < pos.length; i++) {
      pos[i] = from[i] + (to[i] - from[i]) * k;
    }
    morphGeo.attributes.position.needsUpdate = true;
    // Recomputing lighting normals each frame is skipped on alternate
    // frames on mobile to keep small GPUs cool
    frameSkip.current++;
    if (!isMobile || frameSkip.current % 2 === 0) morphGeo.computeVertexNormals();
  });

  return (
    // Float adds a soft vertical bob on top of everything else
    <Float speed={1.2} rotationIntensity={0.22} floatIntensity={0.7}>
      <group ref={group}>
        {/* The shape-shifting platinum centerpiece */}
        <mesh ref={morphMesh} geometry={morphGeo}>
          <meshPhysicalMaterial
            color={dark ? "#dcdcdc" : "#e4e4e4"}
            metalness={1}
            roughness={dark ? 0.13 : 0.1}
            clearcoat={0.7}
            clearcoatRoughness={0.18}
            envMapIntensity={dark ? 1.2 : 1.9}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Champagne-gold ribbon, the constant interwoven counterpoint */}
        <mesh geometry={goldRibbon}>
          <meshPhysicalMaterial
            color={dark ? "#d4b47f" : "#c7a46a"}
            metalness={1}
            roughness={0.17}
            clearcoat={0.5}
            clearcoatRoughness={0.25}
            envMapIntensity={dark ? 1.15 : 1.4}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* The orbiting orbs you liked — unchanged */}
        {SATELLITES.map((sat, i) => (
          <Float key={i} speed={sat.speed} rotationIntensity={0.4} floatIntensity={1.4}>
            <mesh position={sat.pos}>
              <icosahedronGeometry args={[sat.size, 2]} />
              <meshStandardMaterial
                color={sat.gold ? (dark ? "#d4b47f" : "#c7a46a") : dark ? "#dcdcdc" : "#cdcdcd"}
                metalness={1}
                roughness={0.15}
                envMapIntensity={dark ? 1.2 : 1.5}
              />
            </mesh>
          </Float>
        ))}
      </group>
    </Float>
  );
}

export default function HeroScene({ dark, isMobile }) {
  return (
    <Canvas
      dpr={isMobile ? [1, 1.5] : [1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      data-testid="hero-3d-canvas"
    >
      <ambientLight intensity={dark ? 0.3 : 0.55} />
      <directionalLight position={[4, 6, 4]} intensity={dark ? 1.2 : 1.6} />
      {/* Warm champagne rim light from the opposite side */}
      <directionalLight position={[-5, 2, -3]} intensity={dark ? 0.5 : 0.7} color="#e8c888" />

      <Sculpture dark={dark} isMobile={isMobile} />

      {/* Procedural studio — softbox panels + a warm gold strip */}
      <Environment resolution={256}>
        {dark ? (
          <>
            <Lightformer intensity={2.2} position={[0, 5, 0]} scale={[10, 1, 1]} color="#ffffff" />
            <Lightformer intensity={1.1} position={[-5, 1, -1]} scale={[4, 2, 1]} color="#c4c4c4" />
            <Lightformer intensity={1.0} position={[5, -1, 0]} scale={[4, 2, 1]} color="#e0b877" />
          </>
        ) : (
          <>
            <Lightformer intensity={3.2} position={[0, 5, 0]} scale={[10, 1, 1]} color="#fff8ec" />
            <Lightformer intensity={2.0} position={[-5, 1, -1]} scale={[4, 2, 1]} color="#ffffff" />
            <Lightformer intensity={1.8} position={[5, -1, 0]} scale={[4, 2, 1]} color="#ecd3a8" />
            <Lightformer intensity={1.6} position={[0, -4, 3]} scale={[6, 2, 1]} color="#fdfaf3" />
          </>
        )}
      </Environment>

      {/* Soft architectural shadow grounding the composition */}
      <ContactShadows
        position={[0, -2.3, 0]}
        opacity={dark ? 0.45 : 0.22}
        scale={11}
        blur={2.8}
        far={4}
        color={dark ? "#000000" : "#7a6a50"}
      />
    </Canvas>
  );
}
