import { Text, useEnvironment, useGLTF } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import { debounce } from "lodash";
import React, { SetStateAction, useCallback } from "react";
import { IGroupProps, IModeling, IObjectProps } from "../interfaces";
import { Description } from "./Description";

// const modelingPath = "/modeling/tripod/original/tripod-draco.glb";
const modelingPath = "/modeling/tripod/fix/tripod-draco.glb";

const groupProps: IGroupProps["group"] = {
  scale: 0.001,
  position: [0, -0.94, 0],
};

export function Tripod(props: IObjectProps) {
  const { nodes, materials } = useGLTF(modelingPath) as IModeling["tripod"];

  const env = useEnvironment({ preset: "city" });

  // Debounce hover a bit to stop the ticker from being erratic
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHover = useCallback(debounce(props.hover, 30), []);

  const over =
    (name: SetStateAction<string>) => (e: { stopPropagation: () => any }) => (
      // eslint-disable-next-line no-sequences
      e.stopPropagation(), debouncedHover(name)
    );

  const descripiton =
    {
      "트라이포드 콤보":
        "이거슨 트라이포드 센서 콤보입니다. 왜 콤보냐구요? 저도 그냥 생각난대로 작성한거라 상관 없어요. 확정 아니거든요.",
      "용존산소 센서 (단일)":
        "이거슨 용존산소 단일 센서입니다. 용존산소만 단일로 측정하는 센서구요. 수온과 함께 데이터가 들어와요.",
      "전기전도도 센서 (단일)":
        "이거슨 전기전도도 단일 센서입니다. 전기전도도 측정에 필요한 수치들을 전부 확인할 수 있어요. 마찬가지로 수온도 있답니다.",
    }[props.hovered] ?? "마우스를 올려서 트라이포드 센서의 정보를 확인하세요.";

  return (
    <React.Fragment>
      <group {...props.modeling} dispose={null}>
        <Select
          enabled={props.hovered === "트라이포드 콤보"}
          onPointerOver={over("트라이포드 콤보")}
          onPointerOut={() => debouncedHover("")}>
          <group {...groupProps}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_ring.geometry}
              material={materials.cable_volt}
              rotation={[Math.PI, 0, Math.PI]}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_cable.geometry}
              material={materials.cable}
              rotation={[Math.PI, 0, Math.PI]}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_cable_connect.geometry}
              material={materials.cable_connect}
              rotation={[Math.PI, 0, Math.PI]}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body.geometry}
              material={materials.body}
              rotation={[Math.PI, 0, Math.PI]}
              // material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_rubber.geometry}
              material={materials.rubber}
              rotation={[Math.PI, 0, Math.PI]}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_sensor.geometry}
              material={materials.oxygen_single}
              rotation={[Math.PI, 0, Math.PI]}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_oxygen_sensor.geometry}
              material={materials.oxygen}
              rotation={[Math.PI, 0, Math.PI]}
              material-envMap={env}
            />
          </group>
        </Select>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cover.geometry}
          material={materials.cover}
          rotation={[Math.PI, 0.8, Math.PI]}
          scale={0.001}
          position={[0, -0.94, 0]}
        />

        <Select
          enabled={props.hovered === "용존산소 센서 (단일)"}
          onPointerOver={over("용존산소 센서 (단일)")}
          onPointerOut={() => debouncedHover("")}>
          <group {...groupProps}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.oxygen_cable.geometry}
              material={materials.cable}
              rotation={[Math.PI, 0, Math.PI]}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.oxygen_cable_connect.geometry}
              material={materials.cable_connect}
              rotation={[Math.PI, 0, Math.PI]}
              material-envMap={env}
            />

            <mesh
              castShadow
              receiveShadow
              geometry={nodes.oxygen_cable_volt.geometry}
              material={materials.cable_volt}
              rotation={[Math.PI, 0, Math.PI]}
              material-envMap={env}
            />

            <mesh
              castShadow
              receiveShadow
              geometry={nodes.oxygen_sensor.geometry}
              material={materials.oxygen_single}
              rotation={[Math.PI, 0, Math.PI]}
              material-envMap={env}
            />
          </group>
        </Select>

        <Select
          enabled={props.hovered === "전기전도도 센서 (단일)"}
          onPointerOver={over("전기전도도 센서 (단일)")}
          onPointerOut={() => debouncedHover("")}>
          <group {...groupProps}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.conductivity_cable.geometry}
              material={materials.cable}
              rotation={[Math.PI, 0, Math.PI]}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.conductivity_cable_connect.geometry}
              material={materials.cable_connect}
              rotation={[Math.PI, 0, Math.PI]}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.conductivity_cable_volt.geometry}
              material={materials.cable_volt}
              rotation={[Math.PI, 0, Math.PI]}
              material-envMap={env}
            />

            <mesh
              castShadow
              receiveShadow
              geometry={nodes.conductivity_sensor.geometry}
              material={materials.oxygen_single}
              rotation={[Math.PI, 0, Math.PI]}
              material-envMap={env}
            />
          </group>
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

      <Description value={descripiton} group={props.desciption} />
    </React.Fragment>
  );
}

useGLTF.preload(modelingPath);
