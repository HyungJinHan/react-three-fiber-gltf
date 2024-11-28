import { debounce } from "lodash";
import { SetStateAction, useCallback } from "react";

export const usePointEvent = (
  hovered: string,
  hover: React.Dispatch<React.SetStateAction<string>>,
  name: string
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHover = useCallback(debounce(hover, 30), []);

  const over =
    (name: SetStateAction<string>) => (e: { stopPropagation: () => any }) => (
      // eslint-disable-next-line no-sequences
      e.stopPropagation(), debouncedHover(name)
    );
  return {
    enabled: hovered === name,
    onPointerOver: over(name),
    onPointerUp: over(name),
    onPointerDown: over(name),
    onPointerEnter: over(name),
    onPointerLeave: over(name),
    // onPointerMissed: () => debouncedHover(""),
    onPointerOut: () => debouncedHover(""),
  };
};
