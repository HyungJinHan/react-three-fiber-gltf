import { useEffect, useState } from "react";
import Effects from "../Effects/Effects";
import { IObjectProps } from "../interfaces";
import { Buoy } from "../Modeling/Buoy";
import { DspBoard } from "../Modeling/DspBoard";
import { Mount } from "../Modeling/Mount";
import { Tripod } from "../Modeling/Tripod";
import { isMobile } from "../utils/isMobile";

interface IProps {
  // hovered?: string;
  // hover?: React.Dispatch<React.SetStateAction<string>>;
  type: string;
}

export const Loader = (props: IProps) => {
  const [hovered, hover] = useState("");

  useEffect(() => {
    hover("");
  }, [props.type]);

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
        scale: 1.1,
        position: [0, 0.5, -1.2],
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
        scale: 0.0048,
        position: [1.5, -0.75, -0.1],
        rotation: [Math.PI, 0, Math.PI],
      },
      height: "100vh",
      width: "100%",
      hovered: hovered,
      hover: hover,
      ...defaultProps.desktop,
    },
    dsp: {
      front: {
        modeling: {
          scale: 0.01,
          position: [1.3, -0.55, -0.5],
          rotation: [0, 2, 0],
        },
        height: "100vh",
        width: "100%",
        hovered: hovered,
        hover: hover,
        ...defaultProps.desktop,
      },
      back: {
        modeling: {
          scale: 0.01,
          position: [1.8, -0.55, -0.8],
          rotation: [0, 4.1, 0],
        },
        height: "100vh",
        width: "100%",
        hovered: hovered,
        hover: hover,
        ...defaultProps.desktop,
      },
    },
  };

  const mobileModelingProps = {
    buoy: {
      modeling: {
        scale: 0.0015,
        position: [0, -0.9, -0.5],
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
        scale: 0.0038,
        position: [-0.7, -0.97, 0.5],
        rotation: [0, Math.PI / 9, 0],
      },
      height: "100vh",
      width: "100%",
      hovered: hovered,
      hover: hover,
      ...defaultProps.mobile,
    },
    tripod: {
      modeling: {
        scale: 0.004,
        position: [0.1, -1.16, -0.1],
        rotation: [Math.PI, 0, Math.PI],
      },
      height: "100vh",
      width: "100%",
      hovered: hovered,
      hover: hover,
      ...defaultProps.mobile,
    },
    dsp: {
      front: {
        modeling: {
          scale: 0.009,
          position: [0.1, -0.95, -0.7],
          rotation: [0, 2, 0],
        },
        height: "100vh",
        width: "100%",
        hovered: hovered,
        hover: hover,
        ...defaultProps.mobile,
      },
      back: {
        modeling: {
          scale: 0.009,
          position: [0.5, -0.95, -0.8],
          rotation: [0, 4.1, 0],
        },
        height: "100vh",
        width: "100%",
        hovered: hovered,
        hover: hover,
        ...defaultProps.mobile,
      },
    },
  };

  switch (props.type) {
    case "buoy":
      return (
        <>
          <Effects hovered={hovered} hover={hover} />
          <Buoy
            {...(isMobile
              ? { ...(mobileModelingProps.buoy as IObjectProps) }
              : { ...(modelingProps.buoy as IObjectProps) })}
          />
        </>
      );

    case "mount":
      return (
        <>
          <Effects hovered={hovered} hover={hover} />
          <Mount
            {...(isMobile
              ? { ...(mobileModelingProps.mount as IObjectProps) }
              : { ...(modelingProps.mount as IObjectProps) })}
          />
        </>
      );

    case "sensor":
      return (
        <>
          <Effects hovered={hovered} hover={hover} />
          <Tripod
            {...(isMobile
              ? { ...(mobileModelingProps.tripod as IObjectProps) }
              : { ...(modelingProps.tripod as IObjectProps) })}
          />
        </>
      );

    case "dsp-board":
      return (
        <>
          <Effects hovered={hovered} hover={hover} />
          <DspBoard
            {...(isMobile
              ? { ...(mobileModelingProps.dsp.front as IObjectProps) }
              : { ...(modelingProps.dsp.front as IObjectProps) })}
          />
          <DspBoard
            {...(isMobile
              ? { ...(mobileModelingProps.dsp.back as IObjectProps) }
              : { ...(modelingProps.dsp.back as IObjectProps) })}
          />
        </>
      );

    default:
      return (
        <>
          <Effects hovered={hovered} hover={hover} />
          <Buoy
            {...(isMobile
              ? { ...(mobileModelingProps.buoy as IObjectProps) }
              : { ...(modelingProps.buoy as IObjectProps) })}
          />
        </>
      );
  }
};
