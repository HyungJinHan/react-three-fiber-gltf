import { Mask, Text } from "@react-three/drei";
import { IDescriptionProps } from "../interfaces";
import { isMobile } from "../utils/isMobile";

export const Description = (props: IDescriptionProps) => {
  return (
    <group {...props.group}>
      <Text
        maxWidth={1.5}
        lineHeight={1.7}
        anchorY="top"
        textAlign={isMobile ? "center" : "left"}
        position={[0, 0.5, 0.8]}
        color={"black"}
        fontSize={0.08}
        font="GmarketSansTTFMedium.ttf">
        {props.value}
      </Text>

      <Mask id={1}>
        <planeGeometry args={[15, 1.8]} />
      </Mask>
    </group>
  );
};
