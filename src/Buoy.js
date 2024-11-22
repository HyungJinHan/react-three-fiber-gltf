import { Text, useEnvironment, useGLTF } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import { debounce } from "lodash";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Description } from "./Description";

const modelingPath = "/modeling/buoy-draco.glb";

export function Buoy(props) {
  const { nodes, materials } = useGLTF(modelingPath);
  const navigate = useNavigate();

  const env = useEnvironment({ preset: "city" });
  // Debounce hover a bit to stop the ticker from being erratic
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHover = useCallback(debounce(props.hover, 30), []);
  // eslint-disable-next-line no-sequences
  const over = (name) => (e) => (e.stopPropagation(), debouncedHover(name));
  // Get the priced item

  const descripiton =
    {
      태양광:
        "이거슨 태양광입니다. 멋지죠? 저도 멋지다고 생각합니다. 모델링 재질 정하는데 태양광을 제일 고민해봤는데, 페이지에서는 잘 안보이네요. 그래도 좋아요.",
      발판: "이거슨 발판입니다. 멋지죠? 저도 멋지다고 생각합니다.",
      부력제:
        "이거슨 부력제입니다. 멋지죠? 저도 멋지다고 생각합니다. 처음에 이거 봤을 때, 게임 장비처럼 보여서 멋있었어요.",
      본체: "이거슨 본체입니다. 멋지죠? 저도 멋지다고 생각합니다. 알루미늄으로 만들어졌어요. 내부에 배터리하고 센서가 들어가 있어서 소듕하게 다뤄야해요. 아시겠죠? 그렇다면 내부에 들어간 센서를 확인해보고 싶죠? 클릭해주세요.",
      안테나:
        "이거슨 안테나입니다. 멋지죠? 저도 멋지다고 생각합니다. 그렇게 보이지는 않지만 안테나 맞아요.",
    }[props.hovered] ?? "마우스를 올려서 스마트 부표의 정보를 확인하세요.";

  return (
    <>
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cap.geometry}
          material={materials.aluminium}
          scale={0.001}
        />

        <Select
          enabled={props.hovered === "본체"}
          onPointerOver={over("본체")}
          onPointerOut={() => debouncedHover(null)}
          onClick={() => navigate("/tripod")}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.body.geometry}
            material={materials.aluminium}
            scale={0.001}
            material-envMap={env}
          />
        </Select>

        <group>
          <Select
            enabled={props.hovered === "태양광"}
            onPointerOver={over("태양광")}
            onPointerOut={() => debouncedHover(null)}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.sun_cell_1.geometry}
              material={materials.sun_cell_1}
              scale={0.001}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.sun_cell_2.geometry}
              material={materials.sun_cell_2}
              scale={0.001}
            />
            <group scale={0.001}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["5_7002"].geometry}
                material={materials.sun_plate_1}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["5_7002_1"].geometry}
                material={materials.sun_plate_2}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["5_7002_2"].geometry}
                material={materials.sun_plate_3}
              />
            </group>
          </Select>
        </group>

        <Select
          enabled={props.hovered === "발판"}
          onPointerOver={over("발판")}
          onPointerOut={() => debouncedHover(null)}></Select>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rubber.geometry}
          material={materials.rubber}
          scale={0.001}
        />
        <Select
          enabled={props.hovered === "부력제"}
          onPointerOver={over("부력제")}
          onPointerOut={() => debouncedHover(null)}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.buoyancy_1.geometry}
            material={materials.aluminium}
            scale={0.001}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.buoyancy_2.geometry}
            material={materials.aluminium}
            scale={0.001}
          />
        </Select>

        <Select
          enabled={props.hovered === "안테나"}
          onPointerOver={over("안테나")}
          onPointerOut={() => debouncedHover(null)}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.antenna.geometry}
            material={materials.plastic_black}
            scale={0.001}
          />
        </Select>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.buoyancy_3.geometry}
          material={materials.aluminium}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.buoyancy_4.geometry}
          material={materials.aluminium}
          scale={0.001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.plastic.geometry}
          material={materials.plastic_black}
          scale={0.001}
        />
      </group>

      <Text
        position={[1.2, 1.0, -0.5]}
        color="black"
        fontSize={0.15}
        font="GmarketSansTTFBold.ttf"
        letterSpacing={-0.05}>
        {props.hovered ? props.hovered : "스마트 부표"}
      </Text>

      <Description value={descripiton} position={[-1.7, 0.1, -1.25]} />
    </>
  );
}

useGLTF.preload(modelingPath);
