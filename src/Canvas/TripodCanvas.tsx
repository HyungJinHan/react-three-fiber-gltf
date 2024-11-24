import { Bvh, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Selection } from "@react-three/postprocessing";
import Effects from "../Control/Effects";
import { Tripod } from "../Modeling/Tripod";
import { ICanvasProps } from "../interfaces";

const Light = () => {
  return (
    <mesh>
      {/* <directionalLight intensity={1.2} position={[20, -12, 0]} castShadow /> */}
      <directionalLight intensity={1.2} position={[20, 0, 5]} castShadow />
      <directionalLight intensity={1.2} position={[0, -5, 30]} castShadow />
      {/* <directionalLight intensity={1.2} position={[10, 5, 5]} castShadow /> */}
    </mesh>
  );
};

export const TripodCanvas = (props: ICanvasProps) => {
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
          <Effects hovered={props.hovered} hover={props.hover} />
          <Tripod
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
