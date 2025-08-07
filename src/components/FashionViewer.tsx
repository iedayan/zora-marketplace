import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

function Model({ url, scale }: { url: string; scale: number }) {  
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} />;
}

interface FashionViewerProps {
  modelUrl?: string;
  modelScale?: number;
  className?: string;
}

export default function FashionViewer({ modelUrl = "/shirt.glb", modelScale = 0.5, className = "" }: FashionViewerProps) {
  return (
    <div className={`h-[500px] border rounded-lg ${className}`}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <Suspense fallback={<mesh>Loading...</mesh>}>
          <Model url={modelUrl} scale={modelScale} />
          <OrbitControls enableZoom={true} />
        </Suspense>
      </Canvas>
    </div>
  );
}