import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Canvas } from "./Control/Canvas";
import Nav from "./Control/Nav";
import Feed from "./Page/Feed";

const Container = styled.div`
  height: 100%;
  max-width: 172rem;
  margin: 0 auto;
`;

const Main = () => {
  return (
    <Container>
      <Nav />
      <Outlet />
    </Container>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<Canvas />} />
          <Route path="/sensor" element={<Canvas />} />
          <Route path="/dsp-board" element={<Canvas />} />
          <Route path="/feed" element={<Feed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
