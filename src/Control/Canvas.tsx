import { Bvh, Sky } from "@react-three/drei";
import { Canvas as FiberCanvas } from "@react-three/fiber";
import { Selection } from "@react-three/postprocessing";
import React, { Suspense, useState } from "react";
import { Location, useLocation } from "react-router-dom";
import Effects from "../Effects/Effects";
import Light from "../Effects/Light";
import Loading from "../Effects/Loading";
import { IObjectProps } from "../interfaces";
import { Buoy } from "../Modeling/Buoy";
import { Tripod } from "../Modeling/Tripod";
import { isMobile } from "../utils/isMobile";
import Nav from "./Nav";

interface IProps {
  hovered: string;
  hover: React.Dispatch<React.SetStateAction<string>>;
  location: Location<any>;
}

const ChangeModeling = (props: IProps) => {
  // useCursor(props.hovered === "본체" ? true : false);

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
        position: [-1, 0.8, -0.25],
        rotation: [0, 0.3, 0],
        color: "black",
        fontSize: 0.15,
        font: "GmarketSansTTFBold.ttf",
        letterSpacing: -0.05,
      },
      desciption: {
        position: [-1.2, 0.1, -0.97],
        rotation: [0, 0.3, 0],
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
        scale: 0.0016,
        position: [1, -0.5, -0.5],
        rotation: [0.1, Math.PI / 5, 0],
      },
      height: "100vh",
      width: "100%",
      hovered: props.hovered,
      hover: props.hover,
      ...defaultProps.desktop,
    },
    tripod: {
      modeling: {
        scale: 0.004,
        position: [1, -0.75, -0.1],
        rotation: [Math.PI, 0, Math.PI],
      },
      height: "100vh",
      width: "100%",
      hovered: props.hovered,
      hover: props.hover,
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
      hovered: props.hovered,
      hover: props.hover,
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
      hovered: props.hovered,
      hover: props.hover,
      ...defaultProps.mobile,
    },
  };

  switch (props.location.pathname) {
    case "/buoy":
      return (
        <Suspense fallback={<Loading />}>
          <Buoy
            {...(isMobile
              ? { ...(mobileModelingProps.buoy as IObjectProps) }
              : { ...(modelingProps.buoy as IObjectProps) })}
          />
        </Suspense>
      );

    case "/tripod":
      return (
        <Suspense fallback={<Loading />}>
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
  const [hovered, hover] = useState("");
  const location = useLocation();

  return (
    <React.Fragment>
      <Nav hover={hover} />

      <FiberCanvas
        flat
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        camera={{ position: [0, 1, 6], fov: 25, near: 1, far: 20 }}>
        <Light />
        <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0}
          azimuth={0.25}
        />

        <Bvh firstHitOnly enabled={true}>
          <Selection>
            <Effects hovered={hovered} hover={hover} />
            <ChangeModeling
              hovered={hovered}
              hover={hover}
              location={location}
            />
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
    </React.Fragment>
  );
};
