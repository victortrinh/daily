import { useState } from 'react';
import useSound from 'use-sound';
import { GiDrum } from 'react-icons/gi';
import { animated } from 'react-spring';
import { useAppContext } from '@/contexts/AppContext';
import useBoop from '@/hooks/use-boop.hook';

type Props = {
  className?: string,
  onClick?: () => void;
}

const AnimatedDrum = animated(GiDrum);

export const DrumRoll = ({ className, onClick }: Props) => {
  const { mute } = useAppContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [style, trigger] = useBoop({ rotation: 20, timing: 200 });
  const [play, { stop }] = useSound(`${process.env.PUBLIC_URL}/music/drum-roll.wav`, {
    interrupt: true,
    volume: 0.25,
    soundEnabled: !mute,
    onend: () => {
      setIsPlaying(false);
    },
  });

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
      onMouseEnter={trigger}
      className={className}
      onClick={onClickDrum}
      style={style}
    />
  );
};
