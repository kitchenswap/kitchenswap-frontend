import { useEffect, useState } from "react";

const useScrollFix = () => {
  const [scrollY, setScrollY] = useState(window.scrollY);

  useEffect(() => {
    if (window.scrollY !== scrollY) {
      setScrollY(window.scrollY);
      window.scrollTo(0, 0);
    }
    return () => {
      if (window.scrollY !== scrollY) {
        window.scrollTo(0, scrollY);
      }
    };
  }, []);
};

export default useScrollFix;
