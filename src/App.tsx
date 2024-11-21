import { Bvh, Sky } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  N8AO,
  Outline,
  Selection,
  TiltShift2,
  ToneMapping,
} from "@react-three/postprocessing";
import { easing } from "maath";
import { useState } from "react";
import { Model } from "./Model";

export const App = () => {
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
          <Model
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
    </Canvas>
  );
};

function Effects(props: {
  hovered: null;
  hover: React.Dispatch<React.SetStateAction<null>>;
}) {
  const { size } = useThree();
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        state.pointer.x,
        1 + state.pointer.y / 2,
        8 + Math.atan(state.pointer.x * 2),
      ],
      0.3,
      delta
    );
    state.camera.lookAt(state.camera.position.x * 0.9, 0, -4);
  });
  return (
    <EffectComposer
      stencilBuffer
      enableNormalPass
      autoClear={false}
      multisampling={4}>
      <N8AO
        halfRes
        aoSamples={5}
        aoRadius={0.4}
        distanceFalloff={0.75}
        intensity={2}
      />
      <Outline
        // visibleEdgeColor={0x1877f2} // blue
        // hiddenEdgeColor={0x0066a2} // blue
        visibleEdgeColor={0xffffff} // white
        hiddenEdgeColor={0x0b0b0b} // gray
        blur
        width={size.width * 2}
        edgeStrength={100}
      />
      <TiltShift2 samples={5} blur={0.03} />
      <ToneMapping />
    </EffectComposer>
  );
}
