const Light = () => {
  return (
    <mesh>
      {/* <directionalLight intensity={1.2} position={[20, -12, 0]} castShadow /> */}

      {/* <ambientLight intensity={1.5 * Math.PI} /> */}

      <directionalLight intensity={1.2} position={[10, 0, 10]} castShadow />
      <directionalLight intensity={1.2} position={[0, -5, 30]} castShadow />

      {/* <directionalLight intensity={1.2} position={[10, 5, 5]} castShadow /> */}
    </mesh>
  );
};

export default Light;
