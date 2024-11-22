import { Bvh, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Selection } from "@react-three/postprocessing";
import { useState } from "react";
import { Buoy } from "./Buoy";
import Effects from "./Effects";

export const BuoyCanvas = () => {
  const [hovered, hover] = useState(null);

  return (
    <Canvas
      flat
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ position: [0, 1, 6], fov: 25, near: 1, far: 20 }}>
      <ambientLight intensity={1.5 * Math.PI} />
      <Sky />
      <Bvh firstHitOnly>
        <Selection>
          <Effects hovered={hovered} hover={hover} />
          <Buoy
            rotation={[0.1, Math.PI / 5, 0]}
            scale={1.8}
            position={[-1.8, -0.2, 2]}
            height={"100vh"}
            width={"100%"}
            hovered={hovered}
            hover={hover}
          />
        </Selection>
      </Bvh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.6, 0]}
        receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.4} />
      </mesh>
    </Canvas>
  );
};
