import { Text, useEnvironment, useGLTF } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import { debounce } from "lodash";
import { useCallback } from "react";
import { Description } from "./Description";

const modelingPath = "/modeling/tripod-draco.glb";

export function Tripod(props) {
  const { nodes, materials } = useGLTF(modelingPath);

  const env = useEnvironment({ preset: "city" });
  // Debounce hover a bit to stop the ticker from being erratic
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHover = useCallback(debounce(props.hover, 30), []);
  // eslint-disable-next-line no-sequences
  const over = (name) => (e) => (e.stopPropagation(), debouncedHover(name));
  // Get the priced item

  const descripiton =
    {
      "트라이포드 콤보":
        "이거슨 트라이포드 센서 콤보입니다. 왜 콤보냐구요? 저도 그냥 생각난대로 작성한거라 상관 없어요. 확정 아니거든요.",
      "용존산소 단일 센서":
        "이거슨 용존산소 단일 센서입니다. 용존산소만 단일로 측정하는 센서구요. 수온과 함께 데이터가 들어와요.",
      "전기전도도 단일 센서":
        "이거슨 전기전도도 단일 센서입니다. 전기전도도 측정에 필요한 수치들을 전부 확인할 수 있어요. 마찬가지로 수온도 있답니다.",
    }[props.hovered] ?? "마우스를 올려서 트라이포드 센서의 정보를 확인하세요.";

  return (
    <>
      <group {...props} dispose={null}>
        <group
          position={[0, -0.94, 0]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.001}>
          <Select
            enabled={props.hovered === "트라이포드 콤보"}
            onPointerOver={over("트라이포드 콤보")}
            onPointerOut={() => debouncedHover(null)}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_3.geometry}
              material={materials.cable}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_7.geometry}
              material={materials.cable_connect}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_2.geometry}
              material={materials.cable_volt}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_1.geometry}
              material={materials.rubber}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_4.geometry}
              material={materials.body}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_5.geometry}
              material={materials.oxygen}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_6.geometry}
              material={materials.oxygen_single}
              material-envMap={env}
            />
          </Select>
        </group>

        <group
          position={[0, -0.94, -0]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.001}>
          <Select
            enabled={props.hovered === "용존산소 단일 센서"}
            onPointerOver={over("용존산소 단일 센서")}
            onPointerOut={() => debouncedHover(null)}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.oxygen_single_1.geometry}
              material={materials.oxygen_single}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.oxygen_single_2.geometry}
              material={materials.cable_volt}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.oxygen_single_3.geometry}
              material={materials.cable}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.oxygen_single_4.geometry}
              material={materials.cable_connect}
              material-envMap={env}
            />
          </Select>
        </group>

        <group
          position={[0, -0.94, 0]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.001}>
          <Select
            enabled={props.hovered === "전기전도도 단일 센서"}
            onPointerOver={over("전기전도도 단일 센서")}
            onPointerOut={() => debouncedHover(null)}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.conductivity_single_1.geometry}
              material={materials.oxygen_single}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.conductivity_single_2.geometry}
              material={materials.cable_volt}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.conductivity_single_3.geometry}
              material={materials.cable}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.conductivity_single_4.geometry}
              material={materials.cable_connect}
              material-envMap={env}
            />
          </Select>
        </group>

        <Select
          enabled={props.hovered === "트라이포드 콤보"}
          onPointerOver={over("트라이포드 콤보")}
          onPointerOut={() => debouncedHover(null)}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.cover.geometry}
            material={materials.cover}
            position={[0.03, -0.94, -0.1]}
            rotation={[Math.PI, 0.8, Math.PI]}
            scale={0.001}
          />
        </Select>
      </group>

      <Text
        position={[1.2, 1.0, -0.5]}
        color="black"
        fontSize={0.15}
        font="GmarketSansTTFBold.ttf"
        letterSpacing={-0.05}>
        {props.hovered ? props.hovered : "트라이포드 센서"}
      </Text>

      <Description value={descripiton} position={[-1.7, 0.1, -1.25]} />
    </>
  );
}

useGLTF.preload(modelingPath);
