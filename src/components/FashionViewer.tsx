import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

// Simple 3D shirt model created with code instead of external file
function ShirtModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <group>
      {/* Main shirt body */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 2, 0.3]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>
      
      {/* Left sleeve */}
      <mesh position={[-1.2, 0.5, 0]}>
        <boxGeometry args={[0.6, 1, 0.3]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>
      
      {/* Right sleeve */}
      <mesh position={[1.2, 0.5, 0]}>
        <boxGeometry args={[0.6, 1, 0.3]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>
      
      {/* Collar */}
      <mesh position={[0, 0.9, 0.1]}>
        <boxGeometry args={[0.8, 0.3, 0.1]} />
        <meshStandardMaterial color="#1e40af" />
      </mesh>
    </group>
  );
}

function GlassesModel() {
  return (
    <group>
      {/* Left lens */}
      <mesh position={[-0.4, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
        <meshStandardMaterial color="#1f2937" transparent opacity={0.8} />
      </mesh>
      
      {/* Right lens */}
      <mesh position={[0.4, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
        <meshStandardMaterial color="#1f2937" transparent opacity={0.8} />
      </mesh>
      
      {/* Bridge */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      
      {/* Left arm */}
      <mesh position={[-0.7, -0.1, -0.3]} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      
      {/* Right arm */}
      <mesh position={[0.7, -0.1, -0.3]} rotation={[0, -Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
    </group>
  );
}

function MaskModel() {
  return (
    <group>
      {/* Main mask */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color="#e11d48" 
          transparent 
          opacity={0.9}
          emissive="#ec4899"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Eye holes */}
      <mesh position={[-0.3, 0.2, 0.8]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.3, 0.2, 0.8]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
}

interface FashionViewerProps {
  modelUrl?: string;
  modelType?: 'shirt' | 'glasses' | 'mask';
  modelScale?: number;
  className?: string;
}

export default function FashionViewer({ 
  modelUrl, 
  modelType = 'shirt', 
  modelScale = 1, 
  className = "" 
}: FashionViewerProps) {
  
  const LoadingFallback = () => (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#64748b" />
    </mesh>
  );
  
  const ModelComponent = () => {
    switch (modelType) {
      case 'glasses':
        return <GlassesModel />;
      case 'mask':
        return <MaskModel />;
      default:
        return <ShirtModel />;
    }
  };

  return (
    <div className={`h-[500px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [3, 2, 3], fov: 60 }}
        style={{ background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={<LoadingFallback />}>
          <group scale={[modelScale, modelScale, modelScale]}>
            <ModelComponent />
          </group>
          <OrbitControls 
            enableZoom={true} 
            enablePan={false}
            minDistance={2}
            maxDistance={8}
            autoRotate={false}
          />
        </Suspense>
        
        {/* Environment */}
        <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#f8fafc" transparent opacity={0.5} />
        </mesh>
      </Canvas>
      
      {/* Controls overlay */}
      <div className="absolute bottom-4 left-4 bg-black/20 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm">
        <p>🖱️ Drag to rotate • 🔍 Scroll to zoom</p>
      </div>
    </div>
  );
}