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
import Nav from "./Nav";

interface IProps {
  hovered: string;
  hover: React.Dispatch<React.SetStateAction<string>>;
  location: Location<any>;
}

const ChangeModeling = (props: IProps) => {
  // useCursor(props.hovered === "본체" ? true : false);

  const textProps = {
    position: [1.2, 0.8, -0.5],
    color: "black",
    fontSize: 0.15,
    font: "GmarketSansTTFBold.ttf",
    letterSpacing: -0.05,
  };

  const modelingProps = {
    buoy: {
      desciption: { position: [-1.8, 0.1, -1], rotation: [0, 0.3, 0] },
      modeling: {
        scale: 0.0016,
        position: [1, -0.5, -0.5],
        rotation: [0.1, Math.PI / 5, 0],
      },
      height: "100vh",
      width: "100%",
      hovered: props.hovered,
      hover: props.hover,
      text: { ...textProps },
    },
    tripod: {
      desciption: { position: [-1.8, 0.1, -1], rotation: [0, 0.3, 0] },
      modeling: {
        scale: 0.004,
        position: [1, -0.75, -0.1],
        rotation: [Math.PI, 0, Math.PI],
      },
      height: "100vh",
      width: "100%",
      hovered: props.hovered,
      hover: props.hover,
      text: { ...textProps },
    },
  };

  switch (props.location.pathname) {
    case "/buoy":
      return (
        <Suspense fallback={<Loading />}>
          <Buoy {...(modelingProps.buoy as IObjectProps)} />
        </Suspense>
      );

    case "/tripod":
      return (
        <Suspense fallback={<Loading />}>
          <Tripod {...(modelingProps.tripod as IObjectProps)} />
        </Suspense>
      );

    default:
      return (
        <Suspense fallback={<Loading />}>
          <Buoy {...(modelingProps.buoy as IObjectProps)} />
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
        <Sky />

        <Bvh firstHitOnly>
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
          position={[0, -0.6, -0.5]}
          receiveShadow>
          <circleGeometry args={[3.5, 100]} />
          <shadowMaterial transparent opacity={1} />
        </mesh>
      </FiberCanvas>
    </React.Fragment>
  );
};
