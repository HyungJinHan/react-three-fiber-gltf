import { Bvh, Sky } from "@react-three/drei";
import { Canvas as FiberCanvas } from "@react-three/fiber";
import { Selection } from "@react-three/postprocessing";
import { Suspense, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Effects from "../Effects/Effects";
import Light from "../Effects/Light";
import Loading from "../Effects/Loading";
import { IObjectProps } from "../interfaces";
import { Buoy } from "../Modeling/Buoy";
import { Mount } from "../Modeling/Mount";
import { Tripod } from "../Modeling/Tripod";
import { isMobile } from "../utils/isMobile";
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
  width: 60%;
  border-radius: 1rem;
  overflow: hidden;
  margin-top: 2.5%;
`;

interface IProps {
  // hovered?: string;
  // hover?: React.Dispatch<React.SetStateAction<string>>;
  type: string;
}

const ChangeModeling = (props: IProps) => {
  const [hovered, hover] = useState("");

  const defaultProps = {
    desktop: {
      env: {
        files: "/environment/potsdamer_platz_1k.hdr", // city
        // files: "/environment/table_mountain_pure_sky_1k.hdr", // sea
        // files: "/environment/lebombo_1k.hdr", // apartment
        // files: "/environment/forest_slope_1k.hdr", // forest
        // files: "/environment/studio_small_03_1k.hdr", // studio
        // files: "/environment/venice_sunset_1k.hdr", // sunset
      },
      text: {
        position: [-1.35, 0.7, -0.5],
        rotation: [0, 0.2, 0],
        color: "black",
        fontSize: 0.15,
        font: "GmarketSansTTFBold.ttf",
        letterSpacing: -0.05,
      },
      desciption: {
        position: [-1.5, 0, -1.3],
        rotation: [0, 0.2, 0],
      },
    },
    mobile: {
      env: {
        files: "/environment/potsdamer_platz_1k.hdr", // city
        // files: "/environment/table_mountain_pure_sky_1k.hdr", // sea
        // files: "/environment/lebombo_1k.hdr", // apartment
        // files: "/environment/forest_slope_1k.hdr", // forest
        // files: "/environment/studio_small_03_1k.hdr", // studio
        // files: "/environment/venice_sunset_1k.hdr", // sunset
      },
      text: {
        position: [0, 1.23, -0.5],
        color: "black",
        fontSize: 0.15,
        font: "GmarketSansTTFBold.ttf",
        letterSpacing: -0.05,
      },
      desciption: {
        scale: 1,
        position: [0, 0.57, -1.2],
        rotation: [0, 0, 0],
      },
    },
  };

  const modelingProps = {
    buoy: {
      modeling: {
        // scale: 0.0016,
        scale: 0.0016,
        position: [1.3, -0.5, -0.5],
        rotation: [0.1, Math.PI / 5, 0],
      },
      height: "100vh",
      width: "100%",
      hovered: hovered,
      hover: hover,
      ...defaultProps.desktop,
    },
    mount: {
      modeling: {
        // scale: 0.0043,
        scale: 0.0043,
        position: [0.3, -0.58, 0.1],
        rotation: [0.05, 0.1, 0],
      },
      height: "100vh",
      width: "100%",
      hovered: hovered,
      hover: hover,
      ...defaultProps.desktop,
    },
    tripod: {
      modeling: {
        // scale: 0.004,
        scale: 0.0045,
        position: [1.5, -0.75, -0.1],
        rotation: [Math.PI, 0, Math.PI],
      },
      height: "100vh",
      width: "100%",
      hovered: hovered,
      hover: hover,
      ...defaultProps.desktop,
    },
  };

  const mobileModelingProps = {
    buoy: {
      modeling: {
        scale: 0.0012,
        position: [0, -0.7, -0.5],
        rotation: [0.1, Math.PI / 5, 0],
      },
      height: "100vh",
      width: "100%",
      hovered: hovered,
      hover: hover,
      ...defaultProps.mobile,
    },
    mount: {
      modeling: {
        scale: 0.0028,
        position: [-0.37, -0.77, 0.5],
        rotation: [0.1, Math.PI / 8, 0],
      },
      height: "100vh",
      width: "100%",
      hovered: hovered,
      hover: hover,
      ...defaultProps.mobile,
    },
    tripod: {
      modeling: {
        scale: 0.0035,
        position: [0.1, -0.92, -0.1],
        rotation: [Math.PI, 0, Math.PI],
      },
      height: "100vh",
      width: "100%",
      hovered: hovered,
      hover: hover,
      ...defaultProps.mobile,
    },
  };

  // switch (props.location.pathname) {
  switch (props.type) {
    case "buoy":
      return (
        <Suspense fallback={<Loading />}>
          <Effects hovered={hovered} hover={hover} />
          <Buoy
            {...(isMobile
              ? { ...(mobileModelingProps.buoy as IObjectProps) }
              : { ...(modelingProps.buoy as IObjectProps) })}
          />
        </Suspense>
      );

    case "mount":
      return (
        <Suspense fallback={<Loading />}>
          <Effects hovered={hovered} hover={hover} />
          <Mount
            {...(isMobile
              ? { ...(mobileModelingProps.mount as IObjectProps) }
              : { ...(modelingProps.mount as IObjectProps) })}
          />
        </Suspense>
      );

    case "sensor":
      return (
        <Suspense fallback={<Loading />}>
          <Effects hovered={hovered} hover={hover} />
          <Tripod
            {...(isMobile
              ? { ...(mobileModelingProps.tripod as IObjectProps) }
              : { ...(modelingProps.tripod as IObjectProps) })}
          />
        </Suspense>
      );

    default:
      return (
        <Suspense fallback={<Loading />}>
          <Effects hovered={hovered} hover={hover} />
          <Buoy
            {...(isMobile
              ? { ...(mobileModelingProps.buoy as IObjectProps) }
              : { ...(modelingProps.buoy as IObjectProps) })}
          />
        </Suspense>
      );
  }
};

export const Canvas = () => {
  const location = useLocation();

  const type = location.pathname === "/" ? ["buoy", "mount"] : ["sensor"];

  return (
    <CanvasWrapper>
      <Nav />

      {type.map((res) => (
        <ModelingWrapper>
          <FiberCanvas
            flat
            dpr={[1, 1.5]}
            gl={{ antialias: false }}
            camera={{ position: [0, 1, 6], fov: 13, near: 1, far: 20 }}>
            <Light />
            <Sky
              distance={45}
              sunPosition={[0, 1, 0]}
              inclination={0}
              azimuth={0.25}
            />

            <Bvh firstHitOnly enabled={true}>
              <Selection>
                <ChangeModeling type={res} />
              </Selection>
            </Bvh>
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={isMobile ? [0, -0.8, -0.5] : [0, -0.6, -0.5]}
              receiveShadow>
              <circleGeometry args={[3.5, 100]} />
              <shadowMaterial transparent opacity={1} />
            </mesh>
          </FiberCanvas>
        </ModelingWrapper>
      ))}
    </CanvasWrapper>
  );
};
