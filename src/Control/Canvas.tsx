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
  height: 100%;
  max-width: 172rem;
  margin: 0 auto;
`;

const ModelingWrapper = styled.div`
  margin: auto;
  height: ${isMobile ? "50%" : "35%"};
  width: ${isMobile ? "90%" : "70%"};
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: ${isMobile ? "10%" : "5%"};
`;

export const Canvas = () => {
  const location = useLocation();

  const adjustFov = () => {
    let innerWidth = Math.floor(window.innerWidth / 100);
    let innerHeight = Math.floor(window.innerHeight / 100);

    if (!isMobile) {
      if (12 < innerWidth) {
        return 15;
      } else if (innerWidth < 10 || 15 < innerHeight) {
        return 30;
      } else {
        return 21;
      }
    } else {
      return 20;
    }
  };

  window.onload = function () {
    // XMLHttpRequest 객체 생성
    const xhr = new XMLHttpRequest();

    // XMLHttpRequest 메서드와 대상 링크 설정
    const method = "GET";
    const url = "https://rss.blog.naver.com/odnus.xml?atom=0.3";
    // 요청 생성
    xhr.open(method, url);
    // xhr이 요청이 완료된 경우 결과를 생성
    xhr.onload = () => {
      // 결과 값은 response를 통해 저장
      var data = xhr.response;
      //xml 값을 파싱으로 분할
      let xmlDocs = new DOMParser().parseFromString(data, "text/xml");
      // 각 item을 태그 이름으로 검색
      let items = xmlDocs.getElementsByTagName("entry");
      // item을 반복문을 통해 접근
      for (let item of Array.from(items)) {
        // 각 태그와 그 내부 내용을 받을 수 있다.
        for (let child_node of Array.from(item.children)) {
          console.log(child_node.tagName);
          console.log(child_node.textContent);
        }
      }
    };
    // XMLHttpRequest 실행!
    xhr.send();
  };

  // https://rss.blog.naver.com/odnus.xml?atom=0.3

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
        <ModelingWrapper>
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
                position={isMobile ? [0, -1, -0.5] : [0, -0.6, -0.5]}
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
