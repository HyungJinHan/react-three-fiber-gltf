import {
  Text,
  useAnimations,
  useEnvironment,
  useGLTF,
} from "@react-three/drei";
import { GroupProps, MeshProps } from "@react-three/fiber";
import { Select } from "@react-three/postprocessing";
import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const { nodes, materials, animations } = useGLTF(
    modelingPath
  ) as IModeling["buoy"];

  const { ref, actions } = useAnimations(animations);

  // const env = useEnvironment({ preset: "city" });
  const env = useEnvironment({ ...props.env });

  const descripiton =
    {
      "태양광 패널":
        "이거슨 태양광입니다. 멋지죠? 저도 멋지다고 생각합니다. 모델링 재질 정하는데 태양광을 제일 고민해봤는데, 페이지에서는 잘 안보이네요. 그래도 좋아요.",
      "미끄럼 방지 패드":
        "이거슨 미끄럼 방지 패드입니다. 멋지죠? 저도 멋지다고 생각합니다. 고무같기도 하고 재질이 정확히 뭔지는 모르겠네요.",
      부력제:
        "이거슨 부력제입니다. 멋지죠? 저도 멋지다고 생각합니다. 처음에 이거 봤을 때, 게임 장비처럼 보여서 멋있었어요.",
      본체: "이거슨 본체입니다. 멋지죠? 저도 멋지다고 생각합니다. 알루미늄으로 만들어졌어요. 내부에 배터리하고 센서가 들어가 있어서 소듕하게 다뤄야해요. 아시겠죠? 그렇다면 내부에 들어간 센서를 확인해보고 싶죠? 트라이포드 센서 페이지에서 확인하세여.",
      안테나:
        "이거슨 안테나입니다. 멋지죠? 저도 멋지다고 생각합니다. 그렇게 보이지는 않지만 안테나 맞아요.",
    }[props.hovered] ??
    `${
      isMobile ? "터치를 통해" : "마우스를 올려서"
    } 스마트 부표의 정보를 확인하세요.`;

  useEnvironment.preload({ ...props.env });

  return (
    <React.Fragment>
      <group {...props.modeling} dispose={null}>
        <group>
          <Select {...usePointEvent(props.hovered, props.hover, "태양광 패널")}>
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
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.sun_4.geometry}
                material={materials.sun_plate_3}
              />
            </group>
          </Select>

          <mesh
            castShadow
            receiveShadow
            geometry={nodes.cap.geometry}
            material={materials.aluminium}
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

        <Select {...usePointEvent(props.hovered, props.hover, "본체")}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.body.geometry}
            material={materials.aluminium}
            material-envMap={env}
          />
        </Select>

        <Select
          {...usePointEvent(props.hovered, props.hover, "미끄럼 방지 패드")}>
          <mesh
            geometry={nodes.buoyancy_1_2.geometry}
            material={materials.rubber}
          />
          <mesh
            {...(partMoveProps as MeshProps)}
            geometry={nodes.buoyancy_2_1.geometry}
            material={materials.rubber}
          />
        </Select>
        <Select {...usePointEvent(props.hovered, props.hover, "부력제")}>
          <group>
            <mesh
              geometry={nodes.buoyancy_1_1.geometry}
              material={materials.aluminium}
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

        <Select {...usePointEvent(props.hovered, props.hover, "안테나")}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.antenna.geometry}
            material={materials.plastic_black}
          />
        </Select>
      </group>

      <Text {...props.text}>
        {props.hovered ? props.hovered : "스마트 부표"}
      </Text>

      <Description value={descripiton} group={props.desciption} />
    </React.Fragment>
  );
}

useGLTF.preload(modelingPath);
