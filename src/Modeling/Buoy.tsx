import { Text, useEnvironment, useGLTF } from "@react-three/drei";
import { GroupProps, MeshProps } from "@react-three/fiber";
import { Select } from "@react-three/postprocessing";
import React from "react";
import { IModeling, IObjectProps } from "../interfaces";
import { isMobile } from "../utils/isMobile";
import { usePointEvent } from "../utils/pointEvent";
import { Description } from "./Description";

const partMoveProps = {
  rotation: [0, 0.5, 0],
  position: [-200, 18, 200],
};

// const modelingPath = "/modeling/buoy/animation/buoy-draco.glb";
const modelingPath = "/modeling/buoy/buoy-draco.glb";

export function Buoy(props: IObjectProps) {
  // const navigate = useNavigate();

  const { nodes, materials /** animations */ } = useGLTF(
    modelingPath
  ) as IModeling["buoy"];

  // const { ref, actions } = useAnimations(animations);

  // const env = useEnvironment({ preset: "city" });
  const env = useEnvironment({ ...props.env });

  const descripiton =
    {
      "재생 에너지 솔루션":
        "60Wh급 태양광 패널과 리튬인산철 배터리의 공동 적용과 ESS 에너지 보관 및 운영 기능을 통해 해상 환경에서 안정적인 전력 운영을 지원합니다.",
      "보조 부력재":
        "가혹 조건인 해양 환경에 적용 안정성 확보를 위하여 보조 부력재 시스템을 적용했습니다. 알루미늄 소재, FRP 소재 등 다양한 소재의 부력재를 제공합니다.",
      "부표 전장품 탑재부":
        "밀폐성능을 확보한 부표 본체는 다양한 전장품을 탑재를 통해 기능적 확장을 지원합니다. 60L급의 전장품 탑재 공간을 지원합니다.",
      "고감도 멀티 안테나":
        "LTE, GNSS, 2.4G(WIFI/블루투스), LoRa 등 수요 기반한 방수형 안테나 솔루션을 제공합니다.",
    }[props.hovered] ??
    `${
      isMobile ? "터치를 통해" : "마우스를 올려서"
    } 디바이스의 정보를 확인하세요.`;

  useEnvironment.preload({ ...props.env });

  return (
    <React.Fragment>
      <group {...props.modeling} dispose={null}>
        <group>
          <Select
            {...usePointEvent(
              props.hovered,
              props.hover,
              "재생 에너지 솔루션"
            )}>
            <group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.sun_1.geometry}
                material={materials.sun_cell_1}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.sun_5.geometry}
                material={materials.sun_cell_2}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.sun_2.geometry}
                material={materials.sun_plate_1}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.sun_3.geometry}
                material={materials.sun_plate_2}
                material-envMap={env}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.sun_4.geometry}
                material={materials.sun_plate_3}
                material-envMap={env}
              />
            </group>
          </Select>

          <mesh
            castShadow
            receiveShadow
            geometry={nodes.cap.geometry}
            material={materials.aluminium}
            material-envMap={env}
          />
        </group>

        <mesh
          geometry={nodes.rubber_up_1.geometry}
          material={materials.rubber}
        />
        <mesh
          geometry={nodes.rubber_up_2.geometry}
          material={materials.rubber}
        />

        <Select
          {...usePointEvent(props.hovered, props.hover, "부표 전장품 탑재부")}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.body.geometry}
            material={materials.aluminium}
            material-envMap={env}
          />
        </Select>

        {/* <Select
          {...usePointEvent(props.hovered, props.hover, "미끄럼 방지 패드")}> */}
        <mesh
          geometry={nodes.buoyancy_1_2.geometry}
          material={materials.rubber}
        />
        <mesh
          {...(partMoveProps as MeshProps)}
          geometry={nodes.buoyancy_2_1.geometry}
          material={materials.rubber}
        />
        {/* </Select> */}
        <Select {...usePointEvent(props.hovered, props.hover, "보조 부력재")}>
          <group>
            <mesh
              geometry={nodes.buoyancy_1_1.geometry}
              material={materials.aluminium}
              material-envMap={env}
            />
            <mesh
              geometry={nodes.buoyancy_1_3.geometry}
              material={materials.plastic_black}
            />
          </group>
          <group {...(partMoveProps as GroupProps)}>
            <mesh
              geometry={nodes.buoyancy_2_2.geometry}
              material={materials.aluminium}
              material-envMap={env}
            />
            <mesh
              geometry={nodes.buoyancy_2_3.geometry}
              material={materials.plastic_black}
            />
          </group>
        </Select>

        <group>
          <mesh
            geometry={nodes.buoyancy_3_1.geometry}
            material={materials.rubber}
          />
          <mesh
            geometry={nodes.buoyancy_3_2.geometry}
            material={materials.aluminium}
            material-envMap={env}
          />
          <mesh
            geometry={nodes.buoyancy_3_3.geometry}
            material={materials.plastic_black}
          />
        </group>
        <group>
          <mesh
            geometry={nodes.buoyancy_4_1.geometry}
            material={materials.aluminium}
            material-envMap={env}
          />
          <mesh
            geometry={nodes.buoyancy_4_2.geometry}
            material={materials.rubber}
          />
          <mesh
            geometry={nodes.buoyancy_4_3.geometry}
            material={materials.plastic_black}
          />
        </group>

        <Select
          {...usePointEvent(props.hovered, props.hover, "고감도 멀티 안테나")}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.antenna.geometry}
            material={materials.plastic_black}
          />
        </Select>
      </group>

      <Text {...props.text}>
        {props.hovered ? props.hovered : "알루미늄 스마트 부표"}
      </Text>

      {isMobile ? null : (
        <Description value={descripiton} group={props.desciption} />
      )}
    </React.Fragment>
  );
}

useGLTF.preload(modelingPath);
