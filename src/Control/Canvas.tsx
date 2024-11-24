import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BuoyCanvas } from "../Canvas/BuoyCanvas";
import { TripodCanvas } from "../Canvas/TripodCanvas";
import { ICanvasProps } from "../interfaces";

const ChangeCanvas = () => {
  const location = useLocation();
  const [hovered, hover] = useState("");

  const props = {
    buoy: {
      desciptionProps: { position: [-1.8, 0.1, -1], rotation: [0, 0.3, 0] },
      modelingProps: {
        scale: 1.8,
        position: [-1.8, -0.2, 2],
        rotation: [0.1, Math.PI / 5, 0],
      },
      hovered: hovered,
      hover: hover,
    },
    tripod: {
      desciptionProps: { position: [-1.8, 0.1, -1], rotation: [0, 0.3, 0] },
      modelingProps: {
        scale: 4.5,
        position: [0.9, -0.75, 0.2],
        rotation: [0, 0.1, 0],
      },
      hovered: hovered,
      hover: hover,
    },
  };

  console.log({ ...props.buoy });

  switch (location.pathname) {
    case "/buoy":
      return <BuoyCanvas {...(props.buoy as ICanvasProps)} />;

    case "/tripod":
      return <TripodCanvas {...(props.tripod as ICanvasProps)} />;

    default:
      return <BuoyCanvas {...(props.buoy as ICanvasProps)} />;
  }
};

export const Canvas = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "transparent",
          position: "absolute",
          top: 30,
          zIndex: 100,
          width: "100%",
        }}>
        <div
          style={{
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "space-around",
            width: "50%",
            margin: "0 auto",
          }}>
          <Link
            style={{
              fontSize: 20,
              fontWeight: "bolder",
              textDecoration: "none",
              color: "black",
            }}
            to={"/"}>
            스마트 부표
          </Link>
          <Link
            style={{
              fontSize: 20,
              fontWeight: "bolder",
              textDecoration: "none",
              color: "black",
            }}
            to={"/tripod"}>
            트라이포드 센서
          </Link>
        </div>
      </div>

      <ChangeCanvas />
    </>
  );
};
