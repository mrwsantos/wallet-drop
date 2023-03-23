import React, { useState, useRef } from 'react';

function HoverEffect() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const ref = useRef(null);

  function handleMouseMove(event) {
    setMouseX(event.clientX);
    setMouseY(event.clientY);
  }

  function handleMouseLeave() {
    setMouseX(0);
    setMouseY(0);
  }

  const x = mouseX - ref.current?.offsetLeft - ref.current?.offsetWidth / 2;
  const y = mouseY - ref.current?.offsetTop - ref.current?.offsetHeight / 2;
  const style = {
    transform: `perspective(500px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg)`,
  };

  return (
    <div
      className="component-x"
      ref={ref}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
    </div>
  );
}

export default HoverEffect;