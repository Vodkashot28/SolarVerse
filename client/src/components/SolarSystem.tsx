import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";
import { Sun } from "./Sun";
import { Planet } from "./Planet";
import { planetsData } from "@/data/planets";
import { GameUI } from "./GameUI";
import { PlanetFactCard } from "./PlanetFactCard";
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
          
          {planetsData.map((planet, index) => (
            <Planet key={planet.name} data={planet} />
          ))}
          
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
      
      <GameUI />
      <PlanetFactCard />
    </>
  );
}
