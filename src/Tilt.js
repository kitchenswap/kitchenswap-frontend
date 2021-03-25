import React, { useEffect, useState, useRef } from 'react';

const Tilt = ({
  children,
  className,
  reverse = 1,
  max = 35,
  perspective = 1000,
  easing = 'cubic-bezier(.03,.98,.52,.99)',
  scale = '1.1',
  speed = '1000',
  axis = null,
  reset = true
}) => {
  const [style, setStyle] = useState({
    willChange: 'transform',
    transition: `${speed}ms ${easing}`
  })
  const tiltRef = useRef();

  const handlePointerLeave = () => {
    if (tiltRef.current) {
      cancelAnimationFrame(tiltRef.current.updateCall);
    }
    
    if (!reset) return;

    window.requestAnimationFrame(() => {
      setStyle({
        ...style,
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
      });
    });
  }

  const handlePointerMove = (e) => {
    if (tiltRef.current.updateCall !== null) {
      window.cancelAnimationFrame(tiltRef.current.updateCall);
    }

    const rect = tiltRef.current.getBoundingClientRect();
    const { left, top } = rect;
    const width = tiltRef.current.offsetWidth;
    const height = tiltRef.current.offsetHeight;

    tiltRef.current.pointer = {
      clientX: e.nativeEvent.clientX,
      clientY: e.nativeEvent.clientY
    }
    
    tiltRef.current.updateCall = requestAnimationFrame(() => {
      const x = (e.nativeEvent.clientX - left) / width;
      const y = (e.nativeEvent.clientY - top) / height;

      const _x = Math.min(Math.max(x, 0), 1);
      const _y = Math.min(Math.max(y, 0), 1);

      const tiltX = (reverse * (max / 2 - _x * max)).toFixed(2);
      const tiltY = (reverse * (_y * max - max / 2)).toFixed(2);

      setStyle({
        ...style,
        transform: `perspective(${perspective}px) ` +
                   `rotateX(${(axis === "x" ? 0 : tiltY)}deg) ` +
                   `rotateY(${(axis === "y" ? 0 : tiltX)}deg) ` +
                   `scale3d(${scale}, ${scale}, ${scale})`
      });
    
      tiltRef.current.updateCall = null;
    });
  }

  useEffect(() => {
    return () => {
      if (!tiltRef.current) return;
      cancelAnimationFrame(tiltRef.current.updateCall); // eslint-disable-line react-hooks/exhaustive-deps
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={tiltRef}
      style={style}
      className={className}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      {children}
    </div>
  );
}

export default Tilt;
