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

const CanvasWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  overflow-y: auto;
`;

const ModelingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 35%;
  width: 80%;
  border-radius: 1rem;
  overflow: hidden;
  margin-top: 2.5%;
`;

export const Canvas = () => {
  const location = useLocation();

  const adjustFov = () => {
    let innerWidth = window.innerWidth / 100;
    let innerHeight = window.innerHeight / 100;

    if (!isMobile) {
      if (20 < innerWidth) {
        return 18;
      } else if (12 < innerWidth) {
        return 15;
      } else if (innerWidth < 5) {
        return 30;
      } else if (15 < innerHeight) {
        return 30;
      } else {
        return 21;
      }
    } else {
      return 20;
    }
  };

  const type =
    location.pathname === "/"
      ? ["buoy", "mount"]
      : location.pathname === "/sensor"
      ? ["sensor"]
      : ["dsp-board"];

  return (
    <CanvasWrapper>
      <Nav />

      {type.map((res) => (
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
                position={isMobile ? [0, -0.8, -0.5] : [0, -0.6, -0.5]}
                receiveShadow>
                <circleGeometry args={[3.5, 100]} />
                <shadowMaterial transparent opacity={1} />
              </mesh>
            </Suspense>
          </FiberCanvas>
        </ModelingWrapper>
      ))}
    </CanvasWrapper>
  );
};
