import { Bvh, Sky } from "@react-three/drei";
import { Canvas as FiberCanvas } from "@react-three/fiber";
import { Selection } from "@react-three/postprocessing";
import { Suspense } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Light from "../Effects/Light";
import Loading from "../Effects/Loading";
import { isMobile } from "../utils/isMobile";
import { Loader } from "./Loader";
import Nav from "./Nav";

const CanvasWrapper = isMobile
  ? styled.div`
      margin: auto;
      height: 90%;
    `
  : styled.div`
      display: flex;
      height: 90%;
      flex-direction: column;
      justify-content: space-around;
    `;

const ModelingWrapper = styled.div`
  margin: 0 auto;
  height: 35%;
  width: 85%;
  border-radius: 1rem;
  overflow: hidden;
`;

const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  gap: 0.7rem;
`;

const DescContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Canvas = () => {
  const location = useLocation();

  const adjustFov = () => {
    let innerWidth = Math.floor(window.innerWidth / 100);
    let innerHeight = Math.floor(window.innerHeight / 100);

    if (!isMobile) {
      if (20 < innerWidth) {
        return 18;
      } else if (12 < innerWidth) {
        return 15;
      } else if (innerWidth < 10) {
        return 30;
      } else if (15 < innerHeight) {
        return 30;
      } else {
        return 21;
      }
    } else {
      return 15;
    }
  };

  const type =
    location.pathname === "/"
      ? ["buoy", "mount"]
      : location.pathname === "/sensor"
      ? ["sensor"]
      : ["dsp-board"];

  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      <Nav />

      <CanvasWrapper>
        {type.map((res) => (
          <>
            <ModelingWrapper key={res}>
              <FiberCanvas
                flat
                dpr={[1, 1.5]}
                gl={{ antialias: false }}
                camera={{
                  position: [0, 1, 6],
                  fov: adjustFov(),
                  near: 1,
                  far: 20,
                }}>
                <Light />
                <Sky
                  distance={45}
                  sunPosition={[0, 1, 0]}
                  inclination={0}
                  azimuth={0.25}
                />
                <Suspense fallback={<Loading />}>
                  <Bvh firstHitOnly enabled={true}>
                    <Selection>
                      <Loader type={res} />
                    </Selection>
                  </Bvh>
                  <mesh
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={isMobile ? [0, -0.7, -0.5] : [0, -0.6, -0.5]}
                    receiveShadow>
                    <circleGeometry args={[3.5, 100]} />
                    <shadowMaterial transparent opacity={1} />
                  </mesh>
                </Suspense>
              </FiberCanvas>
            </ModelingWrapper>

            {isMobile ? (
              <>
                <DescWrapper>
                  <DescContent>멀티 프로브 수질 계측 센서</DescContent>
                  <DescContent>
                    오든이 제공하는 멀티프로브 디지털 센서는 수온, 용존산소,
                    염도, pH, 전기전도도, ORP, 산화환원전위, 탁도 등의 지표를
                    최소 1초 간격으로 다양한 지표를 동시에 측정하여 RS485
                    MODBUS, SDI12 프로토콜을 통해 데이터 교환을 제공합니다.
                  </DescContent>
                </DescWrapper>
              </>
            ) : null}
          </>
        ))}
      </CanvasWrapper>
    </div>
  );
};
