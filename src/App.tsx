import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Canvas } from "./Control/Canvas";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Canvas />} />
        <Route path="/mount" element={<Canvas />} />
        <Route path="/tripod" element={<Canvas />} />
      </Routes>
    </BrowserRouter>
  );
};
