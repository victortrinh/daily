/* eslint-disable @typescript-eslint/no-explicit-any */
export const random = (min: number, max: number) => Math.random() * (max - min) + min;

export const normalize = (
  number: number,
  currentScaleMin: number,
  currentScaleMax: number,
  newScaleMin = 0,
  newScaleMax = 1,
) => {
  // FIrst, normalize the value between 0 and 1.
  const standardNormalization = (number - currentScaleMin) / (currentScaleMax - currentScaleMin);

  // Next, transpose that value to our desired scale.
  return (newScaleMax - newScaleMin) * standardNormalization + newScaleMin;
};

export const sample = (arr: string | any[]) => arr[Math.floor(Math.random() * arr.length)];
