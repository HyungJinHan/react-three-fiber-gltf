import { Text, useEnvironment, useGLTF } from "@react-three/drei";
import { GroupProps, MeshProps } from "@react-three/fiber";
import { Select } from "@react-three/postprocessing";
import React from "react";
import { IModeling, IObjectProps } from "../interfaces";
import { isMobile } from "../utils/isMobile";
import { usePointEvent } from "../utils/pointEvent";
import { Description } from "./Description";

const partMoveProps = {
  hinge: {
    position: [355, 150, 0],
    rotation: [Math.PI / 2, -Math.PI / 2, 0],
    scale: 0.4,
  },
  guard: {
    position: [50, 0, 30],
    rotation: [0, -0.13, 0],
    // scale: 0.4,
  },
};

const modelingPath = "/modeling/mount/mount-hinge-fix-draco.glb";
const guardPath = "/modeling/mount/guard-text-draco.glb";

export function Mount(props: IObjectProps) {
  const { nodes, materials /** animations */ } = useGLTF(
    modelingPath
  ) as IModeling["mount"];

  const { nodes: guardNodes, materials: guardMaterials /** animations */ } =
    useGLTF(guardPath) as IModeling["guard"];

  const env = useEnvironment({ ...props.env });

  const descripiton =
    {
      "재생 에너지 솔루션":
        "60Wh급 태양광 패널과 리튬인산철 배터리의 공동 적용과 ESS 에너지 보관 및 운영 기능을 통해 해상 환경에서 안정적인 전력 운영을 지원합니다.",
      "부표 전장품 탑재부":
        "밀폐성능을 확보한 디바이스 본체는 다양한 전장품을 탑재를 통해 기능적 확장을 지원합니다. 100L급의 전장품 탑재 공간을 지원합니다.",
      "고감도 멀티 안테나":
        "LTE, GNSS, 2.4G(WIFI/블루투스), LoRa 등 수요 기반한 방수형 안테나 솔루션을 제공합니다.",
      "안내문 및 광고 패널":
        "외부 부착형 광고 패널 기능을 통해 관측 기기 운영 기관 정보 및 훼손 방지를 위한 경고문과 다양한 광고 기능을 제공합니다.",
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
                geometry={nodes.sun_1.geometry}
                material={materials.sun_plate_1}
              />
              <mesh
                geometry={nodes.sun_2.geometry}
                material={materials.aluminium}
              />
              <mesh
                geometry={nodes.sun_3.geometry}
                material={materials.sun_plate_3}
              />
              <mesh
                geometry={nodes.sun_4.geometry}
                material={materials.sun_cell_2}
              />
              <mesh
                geometry={nodes.sun_5.geometry}
                material={materials.sun_cell_1}
              />
            </group>
          </Select>

          <group>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.cap.geometry}
              material={materials.aluminium}
              material-envMap={env}
            />
            <mesh
              geometry={nodes.rubber.geometry}
              material={materials.rubber}
            />
            <mesh
              geometry={nodes.inside.geometry}
              material={materials.aluminium}
            />
            <mesh
              geometry={nodes.hinge_front.geometry}
              material={materials.metal}
              {...(partMoveProps.hinge as MeshProps)}
            />
            <mesh
              geometry={nodes.hinge_back.geometry}
              material={materials.metal}
            />
            <mesh geometry={nodes.bolt.geometry} material={materials.metal} />
            <mesh
              geometry={nodes.bolt_inside.geometry}
              material={materials.aluminium}
            />
            <mesh
              geometry={nodes.body_inside.geometry}
              material={materials.aluminium}
            />
          </group>
        </group>

        <Select
          {...usePointEvent(props.hovered, props.hover, "부표 전장품 탑재부")}>
          <group>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.guard_1.geometry}
              material={materials.aluminium}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.guard_2.geometry}
              material={materials.aluminium}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.guard_3.geometry}
              material={materials.aluminium}
              material-envMap={env}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.guard_4.geometry}
              material={materials.aluminium}
              material-envMap={env}
            />
            <mesh
              geometry={nodes.antenna_cover.geometry}
              material={materials.aluminium}
            />
          </group>
        </Select>

        <Select
          {...usePointEvent(props.hovered, props.hover, "고감도 멀티 안테나")}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.antenna.geometry}
            material={materials.plastic_black}
          />
        </Select>

        <Select
          {...usePointEvent(props.hovered, props.hover, "안내문 및 광고 패널")}>
          <group {...(partMoveProps.guard as GroupProps)}>
            <mesh
              geometry={guardNodes.guard_body.geometry}
              material={guardMaterials.aluminium}
            />
            <mesh
              geometry={guardNodes.desc_2.geometry}
              material={guardMaterials.rubber}
            />
            <mesh
              geometry={guardNodes.desc_1.geometry}
              material={guardMaterials.rubber}
            />
            <mesh
              geometry={guardNodes.title.geometry}
              material={guardMaterials.rubber}
            />
          </group>
        </Select>
      </group>

      <Text {...props.text}>
        {props.hovered ? props.hovered : "해양 환경 계장(계측) 제어장치"}
      </Text>

      <Description value={descripiton} group={props.desciption} />
    </React.Fragment>
  );
}

useGLTF.preload(modelingPath);
