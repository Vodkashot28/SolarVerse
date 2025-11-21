import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";
// ⚠️ 1. Import the Heart model components with the correct relative path
import { Instances, Model } from "../HeartModel"; 
import { Sun } from "@/components/Sun";
import { Planet } from "@/components/Planet";
import { planetsData } from "@/data/planets";
import { GameUI } from "@/components/GameUI";
import { PlanetFactCard } from "@/components/PlanetFactCard";
import * as THREE from "three";

export function SolarSystem() {
  return (
    <>
      <Canvas
        camera={{
          position: [0, 30, 60],
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.5
        }}
      >
        <color attach="background" args={["#000000"]} />

        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" />

        <Suspense fallback={null}>
          <Stars radius={300} depth={60} count={5000} factor={7} saturation={0} fade speed={1} />

          <Sun />

          {/* Map through all planets and render them */}
          {planetsData.map((planet, index) => (
            <Planet key={planet.name} data={planet} />
          ))}

          {/* 2. HEART MODEL INTEGRATION: */}
          {/* Use <Instances> to load the geometry once for performance */}
          <Instances>
            {/* Render the actual Heart objects at specific coordinates */}
            <Model position={[10, 5, 0]} /> 
            <Model position={[-10, -5, 0]} /> 
          </Instances>
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={10}
            maxDistance={150}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>

      {/* These are your 2D UI overlays that render outside the 3D Canvas */}
      <GameUI />
      <PlanetFactCard />
    </>
  );
}
