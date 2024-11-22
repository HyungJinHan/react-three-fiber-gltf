import { Mask, Text, useMask } from "@react-three/drei";

export const Description = ({ value, currency = "$", ...props }) => {
  const stencil = useMask(1);

  return (
    <group {...props}>
      <Text
        maxWidth={1.5}
        lineHeight={1.5}
        anchorY="top"
        position={[0.5 * 1.1, 0.5, 1]}
        color={"black"}
        fontSize={0.08}
        font="GmarketSansTTFMedium.ttf">
        {value}
        <meshBasicMaterial {...stencil} />
      </Text>

      <Mask id={1}>
        <planeGeometry args={[15, 1.8]} />
      </Mask>
    </group>
  );
};
