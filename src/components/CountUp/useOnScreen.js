import { useState, useEffect } from "react";

function useOnScreen(ref, rootMargin = "0px") {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (!ref.current) return;

      observer.unobserve(ref.current); // eslint-disable-line react-hooks/exhaustive-deps
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return isIntersecting;
}

export default useOnScreen;
