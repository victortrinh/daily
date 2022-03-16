import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import PlayIcon from '@mui/icons-material/PlayCircle';
import PauseIcon from '@mui/icons-material/PauseCircle';
import tw from 'twin.macro';

const interval = (delay = 0) => (callback: () => void) => useEffect(() => {
  const id = setInterval(callback, delay);

  return () => clearInterval(id);
}, [callback]);

const use1Second = interval(1e3);
export const use100millisecond = interval(100);

export const useTimer = ({
  seconds: initialSeconds = 0,
  running: initiallyRunning = true,
} = {}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(initiallyRunning);

  const tick = useCallback(
    () => (running ? setSeconds((prevSeconds) => prevSeconds + 1) : undefined),
    [running],
  );
  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => setSeconds(0);
  const stop = () => {
    pause();
    reset();
  };

  use1Second(tick);

  return {
    pause, reset, running, seconds, start, stop,
  };
};

export const Timer = () => {
  const {
    seconds, start, pause, running,
  } = useTimer();

  const minutes = Math.trunc(seconds / 60);
  const realSeconds = seconds - (minutes * 60);

  return (
    <StyledContainer>
      <div className="clock">
        {String(minutes).padStart(2, '0')}
        :
        {String(realSeconds).padStart(2, '0')}
      </div>
      {running
        ? <PauseIcon className="icon" color="error" fontSize="large" onClick={pause} />
        : <PlayIcon className="icon" color="success" fontSize="large" onClick={start} />}
    </StyledContainer>
  );
};

const StyledContainer = styled.div.attrs(
  { className: 'flex justify-center items-center gap-1' },
)`
  .clock {
    ${tw`flex justify-center items-center font-bold bg-brown dark:bg-dark`};
    ${tw`w-20 h-8 rounded-3xl text-lg`};
  }

  .icon {
    ${tw`cursor-pointer`};
  }
`;
