import { EnvironmentLoaderProps } from "@react-three/drei";
import { ReactThreeFiber } from "@react-three/fiber";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type ActionName =
  | "sun_cell_1_action"
  | "sun_cell_2_action"
  | "sun_plate_action"
  | "cap_action";

type FiberText = JSX.IntrinsicElements["mesh"] & {
  color: ReactThreeFiber.Color;
  fontSize: number;
  font: string;
  letterSpacing: number;
};

type BuoyProps = {
  Nodes: {
    sun_1: THREE.Mesh;
    sun_2: THREE.Mesh;
    sun_3: THREE.Mesh;
    sun_4: THREE.Mesh;
    sun_5: THREE.Mesh;
    rubber_up_1: THREE.Mesh;
    rubber_up_2: THREE.Mesh;
    buoyancy_2_1: THREE.Mesh;
    buoyancy_2_2: THREE.Mesh;
    buoyancy_2_3: THREE.Mesh;
    buoyancy_3_1: THREE.Mesh;
    buoyancy_3_2: THREE.Mesh;
    buoyancy_3_3: THREE.Mesh;
    antenna: THREE.Mesh;
    cap: THREE.Mesh;
    buoyancy_4_1: THREE.Mesh;
    buoyancy_4_2: THREE.Mesh;
    buoyancy_4_3: THREE.Mesh;
    buoyancy_1_1: THREE.Mesh;
    buoyancy_1_2: THREE.Mesh;
    buoyancy_1_3: THREE.Mesh;
    body: THREE.Mesh;
  };
  Materials: {
    sun_cell_1: THREE.MeshStandardMaterial;
    sun_plate_1: THREE.MeshStandardMaterial;
    sun_plate_2: THREE.MeshStandardMaterial;
    sun_plate_3: THREE.MeshStandardMaterial;
    sun_cell_2: THREE.MeshStandardMaterial;
    rubber: THREE.MeshPhysicalMaterial;
    aluminium: THREE.MeshStandardMaterial;
    plastic_black: THREE.MeshStandardMaterial;
  };
};

type TripodProps = {
  Nodes: {
    body_cable_connect: THREE.Mesh;
    conductivity_cable_connect: THREE.Mesh;
    cover: THREE.Mesh;
    oxygen_cable_connect: THREE.Mesh;
    body_rubber: THREE.Mesh;
    body_ring: THREE.Mesh;
    body_cable: THREE.Mesh;
    body: THREE.Mesh;
    body_oxygen_sensor: THREE.Mesh;
    body_sensor: THREE.Mesh;
    oxygen_sensor_1: THREE.Mesh;
    oxygen_sensor_2: THREE.Mesh;
    oxygen_sensor_3: THREE.Mesh;
    conductivity_sensor_1: THREE.Mesh;
    conductivity_sensor_2: THREE.Mesh;
    conductivity_sensor_3: THREE.Mesh;
    conductivity_sensor?: THREE.Mesh;
    conductivity_cable?: THREE.Mesh;
    conductivity_cable_volt?: THREE.Mesh;
    oxygen_sensor?: THREE.Mesh;
    oxygen_cable?: THREE.Mesh;
    oxygen_cable_volt?: THREE.Mesh;
  };
  Materials: {
    cable_connect: THREE.MeshStandardMaterial;
    cover: THREE.MeshStandardMaterial;
    rubber: THREE.MeshPhysicalMaterial;
    cable_volt: THREE.MeshStandardMaterial;
    cable: THREE.MeshStandardMaterial;
    body: THREE.MeshStandardMaterial;
    oxygen: THREE.MeshStandardMaterial;
    oxygen_single: THREE.MeshStandardMaterial;
  };
};

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

export interface IDescriptionProps {
  value: string;
  group: JSX.IntrinsicElements["group"];
}

export interface IHover {
  hovered: string;
  hover: React.Dispatch<React.SetStateAction<string>>;
}

export interface IGroupProps {
  group: JSX.IntrinsicElements["group"];
}

export interface ICanvasProps extends IHover {
  desciptionProps: JSX.IntrinsicElements["group"];
  modelingProps: JSX.IntrinsicElements["group"];
}

export interface IObjectProps extends IHover {
  modeling: JSX.IntrinsicElements["group"];
  desciption: JSX.IntrinsicElements["group"];
  height: string;
  width: string;
  text: FiberText;
  env: Partial<EnvironmentLoaderProps>;
}

export type IModeling = {
  buoy: GLTF & {
    nodes: BuoyProps["Nodes"];
    materials: BuoyProps["Materials"];
    animations?: GLTFAction[];
  };

  tripod: GLTF & {
    nodes: TripodProps["Nodes"];
    materials: TripodProps["Materials"];
    animations?: GLTFAction[];
  };
};
