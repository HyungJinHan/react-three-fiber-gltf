import * as THREE from "three";
import { GLTF } from "three-stdlib";

type ActionName =
  | "sun_cell_1_action"
  | "sun_cell_2_action"
  | "sun_plate_action"
  | "cap_action";

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
}

export type IModeling = {
  buoy: GLTF & {
    nodes: {
      buoyancy_1: THREE.Mesh;
      buoyancy_2: THREE.Mesh;
      buoyancy_3: THREE.Mesh;
      buoyancy_4: THREE.Mesh;
      sun_cell_1: THREE.Mesh;
      sun_cell_2: THREE.Mesh;
      sun_plate_1: THREE.Mesh;
      sun_plate_2: THREE.Mesh;
      sun_plate_3: THREE.Mesh;
      rubber: THREE.Mesh;
      cap: THREE.Mesh;
      antenna: THREE.Mesh;
      body: THREE.Mesh;
      plastic: THREE.Mesh;
    };
    materials: {
      aluminium: THREE.MeshStandardMaterial;
      sun_cell_1: THREE.MeshStandardMaterial;
      sun_cell_2: THREE.MeshStandardMaterial;
      sun_plate_1: THREE.MeshStandardMaterial;
      sun_plate_2: THREE.MeshStandardMaterial;
      sun_plate_3: THREE.MeshStandardMaterial;
      rubber: THREE.MeshPhysicalMaterial;
      plastic_black: THREE.MeshStandardMaterial;
    };
    animations?: GLTFAction[];
  };

  tripod: GLTF & {
    nodes: {
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
      oxygen_sensor: THREE.Mesh;
      oxygen_cable_volt: THREE.Mesh;
      oxygen_cable: THREE.Mesh;
      conductivity_sensor: THREE.Mesh;
      conductivity_cable_volt: THREE.Mesh;
      conductivity_cable: THREE.Mesh;
    };
    materials: {
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
};
