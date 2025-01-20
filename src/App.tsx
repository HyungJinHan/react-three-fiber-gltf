import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Canvas } from "./Control/Canvas";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Canvas />} />
        <Route path="/sensor" element={<Canvas />} />
        <Route path="/dsp-board" element={<Canvas />} />
      </Routes>
    </BrowserRouter>
  );
};
