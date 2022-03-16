/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';
import Matter from 'matter-js';

import usePhysicsEngine from '@/pages/celebration/components/hooks/use-physics-engine.hook';
import useInterval from '@/hooks/use-interval.hook';
import {
  sample, random, normalize,
} from '@/utils';

import { faces } from '@/assets/default-sprites';

const convertDegreesToRadians = (angle: number) => (angle * Math.PI) / 180;

const useGeneratedParticles = (
  engine: any,
  position: [any, any],
  angle: number,
  velocity: number,
  concentration: number,
  airFriction: number,
  angularVelocity: number,
  enableCollisions: any,
  volatility: number,
  spread: number,
) => {
  const timeBetweenParticles = 1000 / concentration;

  useInterval(() => {
    if (!engine) {
      return;
    }

    const [top, left] = position;

    const sprite: any = sample(faces);

    const config: any = {
      frictionAir: airFriction * sprite.airFrictionMultiplier,
      render: {
        sprite: {
          texture: sprite.src,
        },
      },
    };

    if (!enableCollisions) {
      config.collisionFilter = {
        category: null,
      };
    }

    const particle = Matter.Bodies.rectangle(
      top,
      left,
      sprite.width,
      sprite.height,
      config,
    );

    const particleAngle = random(angle - spread, angle + spread);

    const velocityMultiple = Math.random();

    const particleVelocity = normalize(
      velocityMultiple,
      0,
      1,
      velocity - velocity * volatility,
      velocity + velocity * volatility,
    );
    const particleAngularVelocity = normalize(
      velocityMultiple,
      0,
      1,
      angularVelocity - angularVelocity * volatility,
      angularVelocity + angularVelocity * volatility,
    );

    const particleAngleInRads = convertDegreesToRadians(particleAngle);

    const x = Math.cos(particleAngleInRads) * particleVelocity;
    const y = Math.sin(particleAngleInRads) * particleVelocity;

    Matter.Body.setVelocity(particle, { x, y });
    Matter.Body.setAngularVelocity(particle, particleAngularVelocity);

    Matter.World.add(engine.world, [particle]);
  }, timeBetweenParticles);
};

const useParticleCleanup = (engine: any) => {
  useInterval(() => {
    if (!engine) {
      return;
    }

    Matter.Composite.allBodies(engine.world).forEach((particle) => {
      if (particle.position.y > window.innerHeight) {
        Matter.World.remove(engine.world, particle);
      }
    });
  }, 500);
};

export const ConfettiGeyser = ({
  // The position for the geyser.
  // Specified as a tuple-like array, [top, left]
  position,

  // Whether or not confetti particles should bump into each other
  enableCollisions,

  // How much air should affect velocity/gravity
  airFriction,

  // How fast each particle should be moving
  velocity,

  // How much each particle should be rotating
  angularVelocity,

  // The direction that the geyser should be facing
  angle,

  // The amount of deviation from the specified angle
  spread,

  // The amount of deviation from the specified velocity
  volatility,

  // The rate of particles fired, specified as # per second
  // 4: slow
  // 15: moderate
  // 30: intense
  concentration,
}: any) => {
  const canvasRef = React.useRef(null);

  const [engine] = usePhysicsEngine(canvasRef);

  useGeneratedParticles(
    engine,
    position,
    angle,
    velocity,
    concentration,
    airFriction,
    angularVelocity,
    enableCollisions,
    volatility,
    spread,
  );
  useParticleCleanup(engine);

  return (
    <Wrapper>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
