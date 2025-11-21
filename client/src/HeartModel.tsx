/* client/src/HeartModel.tsx
FIXED: Removed Merged/Instances optimization, which caused the "Context Lost" crash.
FIXED: Changed collectible identifier from 'id' to 'name' to resolve TypeScript conflict with Three.js.
*/

import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, ThreeEvent } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'

// Essential: Import the Zustand stores for interaction
import { useGame } from './lib/stores/useGame'
import { useAudio } from './lib/stores/useAudio'

// --- Types ---
type GLTFResult = GLTF & {
  nodes: {
    Heart: THREE.Mesh
  }
  materials: {
    Heart: THREE.MeshStandardMaterial
  }
}
// Use 'name' instead of 'id' in the props definition
type HeartModelProps = JSX.IntrinsicElements['group'] & { name?: string }

// The 'Instances' component is removed for stability.

// --- Model Component with Game Logic ---
export function Model(props: HeartModelProps) {
  const { nodes } = useGLTF('/geometries/heart.gltf') as GLTFResult
  const ref = useRef<THREE.Group>(null!)
  const [collected, setCollected] = useState(false)
  const [startY, setStartY] = useState(0);

  // Game State Hooks
  const { addStarToken } = useGame((state: any) => ({ addStarToken: state.addStarToken }))
  const { playSound } = useAudio((state: any) => ({ playSound: state.playSound }))

  useEffect(() => {
    if (props.position) {
      const initialY = Array.isArray(props.position)
        ? props.position[1]
        : (props.position as THREE.Vector3).y || 0;
      setStartY(initialY);
    }
  }, [props.position]);


  // ADD ANIMATION: Heart rotation and bobbing
  useFrame((state, delta) => {
    if (ref.current && !collected) {
      ref.current.rotation.y += delta * 0.5
      ref.current.position.y = startY + Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  // ADD INTERACTION: Click handler
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    if (collected) return

    setCollected(true)
    addStarToken(1)
    playSound('success')

    // Use props.name for identification
    console.log(`StarToken collected! ID: ${props.name || 'N/A'}`) 
  }

  // Hide heart once collected
  if (collected) return null

  // IMPORTANT CHANGE: Render the actual GLTF mesh directly
  return (
    <group {...props} ref={ref} dispose={null} onClick={handleClick}>
      <mesh
        geometry={nodes.Heart.geometry}
        rotation={[0, 0, -Math.PI / 2]}
        // Use props.name for identification
        userData={{ name: 'Heart', collectibleId: props.name }} 
      >
        <meshStandardMaterial
          attach="material"
          color="hotpink"
          emissive="hotpink"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/geometries/heart.gltf')
