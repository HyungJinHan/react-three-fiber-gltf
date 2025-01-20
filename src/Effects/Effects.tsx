import { useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  N8AO,
  Outline,
  TiltShift2,
  ToneMapping,
} from "@react-three/postprocessing";
import { easing } from "maath";
import { IHover } from "../interfaces";
import { isMobile } from "../utils/isMobile";

export default function Effects(props: IHover) {
  // const { size } = useThree();

  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      isMobile
        ? [
            state.pointer.x / 3.5,
            1 + state.pointer.y / 1.5,
            8 + Math.atan(state.pointer.x / 3.5),
          ]
        : [
            state.pointer.x * 1.5,
            1 + state.pointer.y * 1.1,
            8 + Math.atan(state.pointer.x * 1.5),
          ],
      0.3,
      delta
    );
    state.camera.lookAt(state.camera.position.x * 0.2, 0, -1);
  });

  return (
    <EffectComposer
      stencilBuffer
      enableNormalPass
      autoClear={false}
      // multisampling={1}
    >
      <N8AO
        halfRes
        aoSamples={5}
        aoRadius={0.4}
        distanceFalloff={0.5}
        intensity={2}
      />
      <Outline
        // visibleEdgeColor={0x1877f2} // blue
        visibleEdgeColor={0xf15b2a} // orange
        // hiddenEdgeColor={0x0066a2} // blue
        // visibleEdgeColor={0xffffff} // white
        hiddenEdgeColor={0x0b0b0b} // gray
        // blur={true}
        // width={size.width * 5}
        edgeStrength={30}
      />
      <TiltShift2 samples={5} blur={0.03} />
      <ToneMapping />
    </EffectComposer>
  );
}
