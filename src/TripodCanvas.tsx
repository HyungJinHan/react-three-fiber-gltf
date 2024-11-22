import { Bvh, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Selection } from "@react-three/postprocessing";
import { useState } from "react";
import Effects from "./Effects";
import { Tripod } from "./Tripod";

const Light = () => {
  return (
    <mesh>
      <directionalLight intensity={1.2} position={[20, -12, 0]} castShadow />
      <directionalLight intensity={1.2} position={[-20, -12, 0]} castShadow />
      <directionalLight intensity={1.2} position={[0, -5, 30]} castShadow />
      <directionalLight intensity={1.2} position={[10, -1, 10]} castShadow />
    </mesh>
  );
};

export const TripodCanvas = () => {
  const [hovered, hover] = useState(null);

  return (
    <Canvas
      flat
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ position: [0, 1, 6], fov: 25, near: 1, far: 20 }}>
      <Light />
      <Sky />
      <Bvh firstHitOnly>
        <Selection>
          <Effects hovered={hovered} hover={hover} />
          <Tripod
            rotation={[0, 0.1, 0]}
            scale={4}
            position={[0.7, -0.75, 0.5]}
            height={"100vh"}
            width={"100%"}
            hovered={hovered}
            hover={hover}
          />
        </Selection>
      </Bvh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.7, 0]}
        receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.4} />
      </mesh>
    </Canvas>
  );
};
