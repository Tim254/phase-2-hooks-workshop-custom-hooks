import { renderHook } from "@testing-library/react-hooks/pure";
import { fireEvent } from "@testing-library/react";
import { useMouseCoordinates } from "../exercise/03";
// import { useMouseCoordinates } from "../solution/03";

describe("Exercise 03", () => {
  test("returns an initial state with 0, 0 as the mouse coordinates", () => {
    const { result } = renderHook(() => useMouseCoordinates());
    expect(result.current).toMatchObject({ clientX: 0, clientY: 0 });
  });

  test("returns the mouse coordinates after the mouse has moved", () => {
    const { result } = rendimport { useState, useEffect } from "react";
    import hasi from "../data/assets/hasi.png";
    
    export function useMouseCoordinates() {
      const [coordinates, setCoordinates] = useState({
        clientX: 0,
        clientY: 0,
      });
    
      useEffect(() => {
        function handleMouseMove({ clientX, clientY }) {
          setCoordinates({ clientX, clientY });
        }
    
        window.addEventListener("mousemove", handleMouseMove);
    
        return function cleanup() {
          window.removeEventListener("mousemove", handleMouseMove);
        };
      }, []);
    
      return coordinates;
    }
    
    export default function MyComponent() {
      const { clientX, clientY } = useMouseCoordinates();
    
      return (
        <div style={{ cursor: "none", width: "100%", height: "100%" }}>
          <h2>Mouse X: {clientX}</h2>
          <h2>Mouse Y: {clientY}</h2>
          <Cursor x={clientX} y={clientY} />
        </div>
      );
    }
    
    function Cursor({ x, y }) {
      const style = {
        position: "fixed",
        top: y,
        left: x,
        height: "45px",
        width: "45px",
        borderRadius: "50%",
        background: `url(${hasi})`,
        backgroundSize: "cover",
        zIndex: 1,
      };
      return <div style={style} />;
    }
    erHook(() => useMouseCoordinates());
    fireEvent.mouseMove(window, {
      clientX: 100,
      clientY: 200,
    });
    expect(result.current).toMatchObject({ clientX: 100, clientY: 200 });
  });

  test("the event handler function is removed when the component unmounts", () => {
    const spy = jest.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useMouseCoordinates());
    unmount();
    expect(spy).toHaveBeenCalledWith("mousemove", expect.any(Function));
  });
});
