import { Bvh, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Selection } from "@react-three/postprocessing";
import Effects from "../Control/Effects";
import { Buoy } from "../Modeling/Buoy";
import { ICanvasProps } from "../interfaces";

export const BuoyCanvas = (props: ICanvasProps) => {
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
          <Effects hovered={props.hovered} hover={props.hover} />
          <Buoy
            desciption={props.desciptionProps}
            modeling={props.modelingProps}
            height={"100vh"}
            width={"100%"}
            hovered={props.hovered}
            hover={props.hover}
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
