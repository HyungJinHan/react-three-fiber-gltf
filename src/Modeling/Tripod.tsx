import { Text, useEnvironment, useGLTF } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import React from "react";
import { IModeling, IObjectProps } from "../interfaces";
import { isMobile } from "../utils/isMobile";
import { usePointEvent } from "../utils/pointEvent";
import { Description } from "./Description";

const modelingPath = "/modeling/tripod/tripod-cable-draco.glb";
// tripod-fix-draco.glb, tripod-draco.glb, tripod-cable-draco.glb

export function Tripod(props: IObjectProps) {
  const { nodes, materials } = useGLTF(modelingPath) as IModeling["tripod"];

  const env = useEnvironment({ ...props.env });

  const descripiton =
    {
      "트라이포드 콤보":
        "이거슨 트라이포드 센서 콤보입니다. 왜 콤보냐구요? 저도 그냥 생각난대로 작성한거라 상관 없어요. 확정 아니거든요.",
      "용존산소 센서 (단일)":
        "이거슨 용존산소 단일 센서입니다. 용존산소만 단일로 측정하는 센서구요. 수온과 함께 데이터가 들어와요.",
      "전기전도도 센서 (단일)":
        "이거슨 전기전도도 단일 센서입니다. 전기전도도 측정에 필요한 수치들을 전부 확인할 수 있어요. 마찬가지로 수온도 있답니다.",
    }[props.hovered] ??
    `${
      isMobile ? "터치를 통해" : "마우스를 올려서"
    } 트라이포드 센서의 정보를 확인하세요.`;

  useEnvironment.preload({ ...props.env });

  return (
    <React.Fragment>
      <group {...props.modeling} dispose={null}>
        <Select
          {...usePointEvent(props.hovered, props.hover, "트라이포드 콤보")}>
          <group>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_ring.geometry}
              material={materials.cable_volt}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_cable.geometry}
              material={materials.cable}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_cable_connect.geometry}
              material={materials.cable_connect}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body.geometry}
              material={materials.body}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_rubber.geometry}
              material={materials.rubber}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_sensor.geometry}
              material={materials.oxygen_single}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_oxygen_sensor.geometry}
              material={materials.oxygen}
              material-envMap={env}
            />
          </group>
        </Select>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cover.geometry}
          material={materials.cover}
          rotation={[0, -0.8, 0]}
          position={[-15, 0, 70]}
        />

        <Select
          {...usePointEvent(
            props.hovered,
            props.hover,
            "용존산소 센서 (단일)"
          )}>
          <group rotation={[0, 0.1, 0]} position={[10, -20, 40]}>
            <mesh
              geometry={nodes.oxygen_sensor_1.geometry}
              material={materials.cable}
              material-envMap={env}
            />
            <mesh
              geometry={nodes.oxygen_sensor_2.geometry}
              material={materials.oxygen_single}
              material-envMap={env}
            />
            <mesh
              geometry={nodes.oxygen_sensor_3.geometry}
              material={materials.cable_connect}
              material-envMap={env}
            />
          </group>
        </Select>

        <Select
          {...usePointEvent(
            props.hovered,
            props.hover,
            "전기전도도 센서 (단일)"
          )}>
          <group position={[10, 0, -40]}>
            <mesh
              geometry={nodes.conductivity_sensor_1.geometry}
              material={materials.oxygen_single}
              material-envMap={env}
            />
            <mesh
              geometry={nodes.conductivity_sensor_2.geometry}
              material={materials.cable}
              material-envMap={env}
            />
            <mesh
              geometry={nodes.conductivity_sensor_3.geometry}
              material={materials.cable_connect}
              material-envMap={env}
            />
          </group>
        </Select>
      </group>

      <Text {...props.text}>
        {props.hovered ? props.hovered : "트라이포드 센서"}
      </Text>

      <Description value={descripiton} group={props.desciption} />
    </React.Fragment>
  );
}

useGLTF.preload(modelingPath);
