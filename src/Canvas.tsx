import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BuoyCanvas } from "./BuoyCanvas";
import { TripodCanvas } from "./TripodCanvas";

const desciptionProps = {
  position: [-1.8, 0.1, -1],
  rotation: [0, 0.3, 0],
};

export const Canvas = () => {
  const [hovered, hover] = useState("");
  const location = useLocation();

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

      {location.pathname === "/tripod" ? (
        <TripodCanvas
          desciptionProps={desciptionProps}
          hovered={hovered}
          hover={hover}
        />
      ) : (
        <BuoyCanvas
          desciptionProps={desciptionProps}
          hovered={hovered}
          hover={hover}
        />
      )}
    </>
  );
};
