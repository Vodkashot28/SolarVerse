import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import { PlanetData } from "@/data/planets";
import { useSolarSystem } from "@/lib/stores/useSolarSystem";

interface PlanetProps {
  data: PlanetData;
}

export function Planet({ data }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  const { 
    selectPlanet, 
    discoverPlanet, 
    isPlanetDiscovered, 
    canDiscoverPlanet 
  } = useSolarSystem();

  const isDiscovered = isPlanetDiscovered(data.name);
  const canDiscover = canDiscoverPlanet(data.name);

  const orbitPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * data.orbitRadius,
          0,
          Math.sin(angle) * data.orbitRadius
        )
      );
    }
    return points;
  }, [data.orbitRadius]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += data.orbitSpeed;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += data.rotationSpeed;
    }
  });

  const handleClick = (e: THREE.Event) => {
    e.stopPropagation();
    console.log(`Clicked on ${data.name}`);
    selectPlanet(data.name);
    
    if (!isDiscovered && canDiscover) {
      discoverPlanet(data.name);
    }
  };

  const planetOpacity = !isDiscovered && !canDiscover ? 0.3 : 1;
  const planetColor = !isDiscovered && !canDiscover ? "#333333" : data.color;

  return (
    <group>
      <Line
        points={orbitPoints}
        color={isDiscovered ? "#4A90E2" : "#333333"}
        lineWidth={1}
        opacity={0.3}
        transparent
      />
      
      <group ref={groupRef}>
        <mesh
          ref={meshRef}
          position={[data.orbitRadius, 0, 0]}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[data.size, 32, 32]} />
          <meshStandardMaterial
            color={planetColor}
            emissive={hovered || isDiscovered ? planetColor : "#000000"}
            emissiveIntensity={hovered ? 0.5 : isDiscovered ? 0.2 : 0}
            opacity={planetOpacity}
            transparent={!canDiscover && !isDiscovered}
          />
        </mesh>
        
        {hovered && (
          <mesh position={[data.orbitRadius, data.size + 0.5, 0]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        )}
      </group>
    </group>
  );
}
