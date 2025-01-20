import { Text, useEnvironment, useGLTF } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import React from "react";
import { IModeling, IObjectProps } from "../interfaces";
import { isMobile } from "../utils/isMobile";
import { usePointEvent } from "../utils/pointEvent";
import { Description } from "./Description";

// const modelingPath = "/modeling/buoy/animation/buoy-draco.glb";
const modelingPath = "/modeling/dsp-board/dsp-board-draco.glb";

export function DspBoard(props: IObjectProps) {
  // const navigate = useNavigate();

  const { nodes, materials /** animations */ } = useGLTF(
    modelingPath
  ) as IModeling["dsp"];

  // const { ref, actions } = useAnimations(animations);

  // const env = useEnvironment({ preset: "city" });
  const env = useEnvironment({ ...props.env });

  const descripiton =
    {
      "디지털 센싱 입출력 단자":
        "RS485, Can통신, OBD 등 디지털 센싱 포트를 지원하여, 다양한 센서류, 기자재류를 IoT 디바이스에 연결이 가능합니다.",
      "전원 입출력 단자":
        "12V~36v DC 전원 입력과 외부 장치 전원 인가를 위한 전원 출력을 함께 지원합니다. 3Wh 이하의 소비전력으로 스마트 부표에 탑재하여 다양한 방식으로 환경 측정을 지원하고 KC인증 및 다양한 시험 성적서를 확보하였습니다.",
      "SMA 광대역 안테나 입력단자":
        "고정밀 GPS 안테나 및 MIMO 4G 통신 안테나 단자를 지원함으로써 격오지 등 통신 음영지역에 IoT 솔루션의 적용이 가능하며, 수요자의 요청사항에 맞추어 통합형 안테나, 고감도 안테나 등 다양한 솔루션을 제공합니다.",
    }[props.hovered] ??
    `${
      isMobile ? "터치를 통해" : "마우스를 올려서"
    } 오든의 저전력 IoT 컴퓨팅 유닛에 대한 정보를 확인하세요.`;

  useEnvironment.preload({ ...props.env });

  return (
    <React.Fragment>
      <group {...props.modeling} dispose={null}>
        <group>
          <group>
            <mesh
              geometry={nodes.board_bottom.geometry}
              material={materials.metal_black}
              material-envMap={env}
            />
            <Select
              {...usePointEvent(
                props.hovered,
                props.hover,
                "전원 입출력 단자"
              )}>
              <mesh
                geometry={nodes.sensor_1_1.geometry}
                material={materials.metal_silver}
              />
              <mesh
                geometry={nodes.sensor_1_2.geometry}
                material={materials.sensor_2}
              />
              <mesh
                geometry={nodes.sensor_2_1.geometry}
                material={materials.sensor_2}
              />
              <mesh
                geometry={nodes.sensor_2_2.geometry}
                material={materials.metal_silver}
              />
              <mesh
                geometry={nodes.power_1.geometry}
                material={materials.black}
              />
              <mesh
                geometry={nodes.power_2.geometry}
                material={materials.metal_silver}
              />
            </Select>
            <Select
              {...usePointEvent(
                props.hovered,
                props.hover,
                "SMA 광대역 안테나 입력단자"
              )}>
              <mesh
                geometry={nodes.ant_1_1.geometry}
                material={materials.white}
                material-envMap={env}
              />
              <mesh
                geometry={nodes.ant_1_2.geometry}
                material={materials.ant}
                material-envMap={env}
              />
              <mesh
                geometry={nodes.ant_1_3.geometry}
                material={materials.ant}
              />
              <mesh
                geometry={nodes.ant_2_1.geometry}
                material={materials.white}
              />
              <mesh
                geometry={nodes.ant_2_2.geometry}
                material={materials.ant}
              />
              <mesh
                geometry={nodes.ant_3_1.geometry}
                material={materials.ant}
              />
              <mesh
                geometry={nodes.ant_3_2.geometry}
                material={materials.ant}
              />
              <mesh
                geometry={nodes.ant_3_3.geometry}
                material={materials.white}
              />
            </Select>
            <mesh
              geometry={nodes.c_type_1_1.geometry}
              material={materials.metal_silver}
              material-envMap={env}
            />
            <mesh
              geometry={nodes.c_type_1_2.geometry}
              material={materials.black}
            />
            <mesh
              geometry={nodes.c_type_2_1.geometry}
              material={materials.metal_silver}
            />
            <mesh
              geometry={nodes.c_type_2_2.geometry}
              material={materials.black}
            />
            <Select
              {...usePointEvent(
                props.hovered,
                props.hover,
                "디지털 센싱 입출력 단자"
              )}>
              <mesh
                geometry={nodes.ethernet_1_1.geometry}
                material={materials.metal_silver}
              />
              <mesh
                geometry={nodes.ethernet_1_2.geometry}
                material={materials.yellow}
              />
              <mesh
                geometry={nodes.ethernet_1_3.geometry}
                material={materials.green}
              />
              <mesh
                geometry={nodes.ethernet_1_4.geometry}
                material={materials.black}
              />
              <mesh
                geometry={nodes.ethernet_2_1.geometry}
                material={materials.metal_silver}
              />
              <mesh
                geometry={nodes.ethernet_2_2.geometry}
                material={materials.black}
              />
            </Select>
            <mesh
              geometry={nodes.ethernet_3_1.geometry}
              material={materials.metal_silver}
            />
            <mesh
              geometry={nodes.ethernet_3_2.geometry}
              material={materials.black}
            />
          </group>

          <group>
            <mesh
              geometry={nodes.bolt_1.geometry}
              material={materials.bolt}
              material-envMap={env}
            />
            <mesh geometry={nodes.bolt_2.geometry} material={materials.bolt} />
            <mesh geometry={nodes.bolt_3.geometry} material={materials.bolt} />
            <mesh geometry={nodes.bolt_4.geometry} material={materials.bolt} />
            <mesh geometry={nodes.bolt_5.geometry} material={materials.bolt} />
            <mesh geometry={nodes.bolt_6.geometry} material={materials.bolt} />
            <mesh geometry={nodes.bolt_7.geometry} material={materials.bolt} />
            <mesh geometry={nodes.bolt_8.geometry} material={materials.bolt} />
          </group>
        </group>

        <group>
          <mesh
            geometry={nodes.case_side_2.geometry}
            material={materials.metal_black}
          />
          <mesh
            geometry={nodes.case_bottom.geometry}
            material={materials.metal_black}
          />
          <mesh
            geometry={nodes.case_side_1.geometry}
            material={materials.metal_black}
          />
          <mesh
            geometry={nodes.case_bottom_hole.geometry}
            material={materials.metal_silver}
          />
          <mesh
            geometry={nodes.case_cap.geometry}
            material={materials.metal_black}
          />
        </group>
      </group>

      <Text {...props.text}>
        {props.hovered ? props.hovered : "ODN-DSP 신호처리장치"}
      </Text>

      <Description value={descripiton} group={props.desciption} />
    </React.Fragment>
  );
}

useGLTF.preload(modelingPath);
