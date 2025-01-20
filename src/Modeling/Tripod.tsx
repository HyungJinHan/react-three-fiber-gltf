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
      "멀티 프로브 수질 계측 센서":
        "오든이 제공하는 멀티 프로브 디지털 센서는 수온, 용존산소, 염도, pH, 전기전도도, ORP, 산화환원전위, 탁도 등의 지표를 최소 1초 간격으로 다양한 지표를 동시에 측정하여 RS485 MODBUS, SDI12 프로토콜을 통해 데이터 교환을 제공합니다.",
      "단일 센서 (용존산소)":
        "오든이 제공하는 단일 프로브평 디지털 센서는 수온, 용존산소, 염도, pH, 클로로필II, BGA 등 다양한 지표의 측정을 지원합니다. 본 자료의 센서는 용존산소와 수온 동시 계측 단일 센서입니다.",
      "단일 센서 (염도)":
        "오든이 제공하는 단일 프로브평 디지털 센서는 수온, 용존산소, 염도, pH, 클로로필II, BGA 등 다양한 지표의 측정을 지원합니다. 본 자료의 센서는 염도와 수온 동시 계측 단일 센서입니다.",
    }[props.hovered] ??
    `${
      isMobile ? "터치를 통해" : "마우스를 올려서"
    } 오든의 수질 계측 센서 정보를 확인하세요.`;

  useEnvironment.preload({ ...props.env });

  return (
    <React.Fragment>
      <group {...props.modeling} dispose={null}>
        <Select
          {...usePointEvent(
            props.hovered,
            props.hover,
            "멀티 프로브 수질 계측 센서"
          )}>
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
            "단일 센서 (용존산소)"
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
          {...usePointEvent(props.hovered, props.hover, "단일 센서 (염도)")}>
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
        {props.hovered ? props.hovered : "수질 계측 센서"}
      </Text>

      <Description value={descripiton} group={props.desciption} />
    </React.Fragment>
  );
}

useGLTF.preload(modelingPath);
