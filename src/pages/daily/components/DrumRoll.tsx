import { useState } from 'react';
import useSound from 'use-sound';
import { GiDrum } from 'react-icons/gi';
import { useSpring, animated } from 'react-spring';
import { useAppContext } from '@/contexts/AppContext';

type Props = {
  className?: string,
  onClick?: () => void;
}

const AnimatedDrum = animated(GiDrum);

export const DrumRoll = ({ className, onClick }: Props) => {
  const { mute } = useAppContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [play, { stop }] = useSound(`${process.env.PUBLIC_URL}/music/drum-roll.wav`, {
    interrupt: true,
    volume: 0.25,
    soundEnabled: !mute,
    onend: () => {
      setIsPlaying(false);
    },
  });

  const props = useSpring({ scale: isHovering ? 1 : 0 });

  const onClickDrum = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stop();
      return;
    }

    setIsPlaying(true);
    play();
    onClick?.();
  };

  return (
    <AnimatedDrum
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={className}
      onClick={onClickDrum}
      style={{
        transform: props.scale
          .to({
            range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
            output: [1, 0.97, 0.9, 1.1, 1.2, 1.3, 1.4, 1.5],
          })
          .to((scale) => `scale(${scale})`),
      }}
    />
  );
};
