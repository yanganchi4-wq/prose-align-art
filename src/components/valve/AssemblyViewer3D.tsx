import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Text, Html } from "@react-three/drei";
import * as THREE from "three";

interface PartItem {
  partName: string;
  models: Record<string, string>;
  quantity?: number;
}

interface AssemblyViewer3DProps {
  parts: PartItem[];
  category: string;
  isAssembling: boolean;
  onAssemblyComplete: () => void;
}

// 零件颜色映射
const partColors: Record<string, string> = {
  "标准快开人孔": "#4a90d9",
  "垫片": "#e74c3c",
  "凸缘": "#f39c12",
  "过渡法兰": "#9b59b6",
  "螺固件": "#7f8c8d",
  "安全阀": "#27ae60",
  "螺塞": "#34495e",
  "球阀主体": "#3498db",
  "密封垫片": "#e74c3c",
  "手柄组件": "#1abc9c",
  "连接螺栓": "#7f8c8d",
  "底阀主体": "#2980b9",
  "法兰接口": "#8e44ad",
  "密封组件": "#c0392b",
};

// 获取零件颜色
const getPartColor = (partName: string): string => {
  for (const key of Object.keys(partColors)) {
    if (partName.includes(key) || key.includes(partName.split("：")[0])) {
      return partColors[key];
    }
  }
  return "#6c757d";
};

// 单个零件组件
const Part: React.FC<{
  position: [number, number, number];
  color: string;
  name: string;
  delay: number;
  isAssembling: boolean;
  shape: "cylinder" | "ring" | "box" | "sphere";
  scale?: number;
}> = ({ position, color, name, delay, isAssembling, shape, scale = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  React.useEffect(() => {
    if (isAssembling) {
      const timer = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isAssembling, delay]);

  useFrame((state) => {
    if (meshRef.current && visible) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  if (!visible) return null;

  const renderShape = () => {
    switch (shape) {
      case "cylinder":
        return <cylinderGeometry args={[0.4 * scale, 0.4 * scale, 0.3 * scale, 32]} />;
      case "ring":
        return <torusGeometry args={[0.35 * scale, 0.08 * scale, 16, 32]} />;
      case "box":
        return <boxGeometry args={[0.3 * scale, 0.3 * scale, 0.3 * scale]} />;
      case "sphere":
        return <sphereGeometry args={[0.2 * scale, 32, 32]} />;
      default:
        return <cylinderGeometry args={[0.4 * scale, 0.4 * scale, 0.3 * scale, 32]} />;
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        {renderShape()}
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.3}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
        {hovered && (
          <Html distanceFactor={10} position={[0, 0.6, 0]}>
            <div className="bg-foreground/90 text-white px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shadow-lg">
              {name}
            </div>
          </Html>
        )}
      </mesh>
    </Float>
  );
};

// 主装配体组件
const Assembly: React.FC<{
  parts: PartItem[];
  category: string;
  isAssembling: boolean;
  onComplete: () => void;
}> = ({ parts, category, isAssembling, onComplete }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [assemblyProgress, setAssemblyProgress] = useState(0);

  // 根据类别定义装配布局
  const getPartShape = (partName: string): "cylinder" | "ring" | "box" | "sphere" => {
    if (partName.includes("垫片") || partName.includes("密封")) return "ring";
    if (partName.includes("螺") || partName.includes("螺塞")) return "sphere";
    if (partName.includes("手柄")) return "box";
    return "cylinder";
  };

  // 计算零件位置（堆叠布局）
  const getPartPosition = (index: number, total: number): [number, number, number] => {
    const spacing = 0.5;
    const startY = (total - 1) * spacing / 2;
    return [0, startY - index * spacing, 0];
  };

  React.useEffect(() => {
    if (isAssembling) {
      const totalParts = parts.length;
      let currentPart = 0;
      
      const interval = setInterval(() => {
        currentPart++;
        setAssemblyProgress((currentPart / totalParts) * 100);
        
        if (currentPart >= totalParts) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
        }
      }, 600);
      
      return () => clearInterval(interval);
    }
  }, [isAssembling, parts.length, onComplete]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 基座 */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 32]} />
        <meshStandardMaterial color="#1a365d" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 中心轴 */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 3, 16]} />
        <meshStandardMaterial color="#2d3748" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* 零件 */}
      {parts.map((part, index) => (
        <Part
          key={index}
          position={getPartPosition(index, parts.length)}
          color={getPartColor(part.partName)}
          name={part.partName}
          delay={index * 600}
          isAssembling={isAssembling}
          shape={getPartShape(part.partName)}
          scale={1 + (parts.length - index) * 0.05}
        />
      ))}

      {/* 装配进度指示 */}
      {isAssembling && assemblyProgress < 100 && (
        <Html position={[0, 2.5, 0]} center>
          <div className="bg-accent/90 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            装配中 {Math.round(assemblyProgress)}%
          </div>
        </Html>
      )}
    </group>
  );
};

// 加载占位
const LoadingFallback = () => (
  <Html center>
    <div className="flex flex-col items-center gap-2">
      <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      <span className="text-sm font-semibold text-foreground/60">加载3D场景...</span>
    </div>
  </Html>
);

const AssemblyViewer3D: React.FC<AssemblyViewer3DProps> = ({
  parts,
  category,
  isAssembling,
  onAssemblyComplete,
}) => {
  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-foreground/10">
      <Canvas
        camera={{ position: [4, 3, 4], fov: 45 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4a90d9" />
          
          <Assembly
            parts={parts}
            category={category}
            isAssembling={isAssembling}
            onComplete={onAssemblyComplete}
          />
          
          <Environment preset="city" />
          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={10}
            autoRotate={!isAssembling}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AssemblyViewer3D;
