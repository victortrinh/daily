/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay: number) => {
  const intervalId = useRef<any>(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => savedCallback.current();

    intervalId.current = window.setInterval(tick, delay);

    return () => window.clearInterval(intervalId.current);
  }, [delay]);

  return intervalId.current;
};

export default useInterval;
