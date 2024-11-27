import { Html, useProgress } from "@react-three/drei";
import styled from "styled-components";

const LoadingText = styled.p`
  font-family: "GmarketSansBold";
  font-size: 1.5rem;
  text-align: center;
`;

const Loading = () => {
  const { progress } = useProgress();
  return (
    <Html>
      <LoadingText>{progress.toFixed(0)}%</LoadingText>
      <LoadingText>loaded</LoadingText>
    </Html>
  );
};

export default Loading;
