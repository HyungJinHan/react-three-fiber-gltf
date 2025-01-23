import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Canvas } from "./Control/Canvas";
import Feed from "./Page/Feed";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Canvas />} />
        <Route path="/sensor" element={<Canvas />} />
        <Route path="/dsp-board" element={<Canvas />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
};
