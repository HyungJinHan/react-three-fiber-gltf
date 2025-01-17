import { Text, useEnvironment, useGLTF } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";
import { Select } from "@react-three/postprocessing";
import React from "react";
import { IModeling, IObjectProps } from "../interfaces";
import { isMobile } from "../utils/isMobile";
import { usePointEvent } from "../utils/pointEvent";
import { Description } from "./Description";

const partMoveProps = {
  position: [355, 150, 0],
  rotation: [Math.PI / 2, -Math.PI / 2, 0],
  scale: 0.4,
};

const modelingPath = "/modeling/mount/mount-hinge-fix-draco.glb";

export function Mount(props: IObjectProps) {
  // const navigate = useNavigate();

  const { nodes, materials /** animations */ } = useGLTF(
    modelingPath
  ) as IModeling["mount"];

  // const { ref, actions } = useAnimations(animations);

  // const env = useEnvironment({ preset: "city" });
  const env = useEnvironment({ ...props.env });

  const descripiton =
    {
      "태양광 패널":
        "이거슨 태양광입니다. 멋지죠? 저도 멋지다고 생각합니다. 모델링 재질 정하는데 태양광을 제일 고민해봤는데, 페이지에서는 잘 안보이네요. 그래도 좋아요.",
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
              {...(partMoveProps as MeshProps)}
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

        <Select {...usePointEvent(props.hovered, props.hover, "본체")}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.guard.geometry}
            material={materials.aluminium}
            material-envMap={env}
          />
          <mesh
            geometry={nodes.antenna_cover.geometry}
            material={materials.aluminium}
          />
        </Select>

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
        {props.hovered ? props.hovered : "마운트형 디바이스"}
      </Text>

      <Description value={descripiton} group={props.desciption} />
    </React.Fragment>
  );
}

useGLTF.preload(modelingPath);
