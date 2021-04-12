import React, { useEffect, useState, useRef } from "react";
import CountUp from "react-countup";

import useOnScreen from "./useOnScreen";
import { getRandomInt, getRandomSign } from "./util";

const CountUpWrapper = ({
  end,
  formattingFn,
  decimals = 0,
  quiet = false,
  prefix,
  suffix
}) => {
  const [options, setOptions] = useState({
    start: end
  });

  const timerRef = useRef();
  const ref = useRef();
  const onScreen = useOnScreen(ref);

  const update = () => {
    const delay = getRandomInt(1, 3);
    const duration = getRandomInt(0, 2);
    const delta = (getRandomSign() * getRandomInt(0, 3)) / 10 ** decimals;
    let start = end - delta;
    if (start < 0) {
      start = 0;
    }

    setOptions({
      start,
      delay,
      duration
    });
  };

  const tick = () => {
    if (!quiet) update();
    timerRef.current = setTimeout(() => {
      tick();
    }, getRandomInt(10000, 15000));
  };

  useEffect(() => {
    if (!onScreen) {
      clearTimeout(timerRef.current);
      return;
    }

    tick();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onScreen]);

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div ref={ref}>
      <CountUp
        start={options.start}
        end={end}
        decimals={decimals}
        duration={options.duration}
        delay={options.delay}
        formattingFn={formattingFn}
        prefix={prefix}
        suffix={suffix}
      />
    </div>
  );
};

export default CountUpWrapper;
