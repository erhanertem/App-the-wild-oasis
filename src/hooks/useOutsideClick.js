import { useEffect, useRef } from "react";

export function useOutsideClick(
  handler,
  listenCapturing = true,
  listenKey = "Escape"
) {
  // Points to the window modal on the DOM
  const ref = useRef();

  // -> #1 ALTERNATE TO CLOSE THE MODAL
  useEffect(
    function () {
      // Event handler for Close-On-Click-Outside
      function handleClick(e) {
        // if (ref.current && e.target.contains(ref.current)) { - Alternate of below code w/out needing capturing set to true
        if (ref.current && !ref.current.contains(e.target)) {
          // console.log('Clicked outside');
          handler();
        }
      }
      // Event handler for Close-On-Hitting-Key
      function handleKeyPress(e) {
        if (ref.current && e.key === listenKey) {
          // console.log('Escape key pressed');
          handler();
        }
      }

      // DOM Event Listeners
      // Event listener for Click outside
      document.addEventListener("click", handleClick, listenCapturing);
      // Event listener for Escape key
      document.addEventListener("keydown", handleKeyPress);

      // Cleanup function upon component dismount
      return () => {
        document.removeEventListener("click", handleClick, listenCapturing);
        document.removeEventListener("keydown", handleKeyPress);
      };
    },
    [handler, listenCapturing, listenKey]
  );

  return ref;
}
