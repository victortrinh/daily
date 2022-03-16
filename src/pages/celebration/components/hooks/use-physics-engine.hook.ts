/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Matter from 'matter-js';

export default function usePhysicsEngine(ref: any) {
  const [engine, setEngine] = React.useState<Matter.Engine | null>(null);
  const [renderer, setRenderer] = React.useState<Matter.Render | null>(null);

  React.useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    // create an engine
    const newEngine = Matter.Engine.create();

    // create a renderer
    const newRenderer = Matter.Render.create({
      canvas: ref.current,
      engine: newEngine,
      options: {
        width: ref.current.width,
        height: ref.current.height,
        wireframes: false,
        background: 'transparent',
      },
    });

    Matter.Engine.run(newEngine);
    Matter.Render.run(newRenderer);

    setEngine(newEngine);
    setRenderer(newRenderer);
  }, [ref]);

  return [engine, renderer];
}
