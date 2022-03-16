import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import useSound from 'use-sound';
import { useAppContext } from '@/contexts/AppContext';
import tw from 'twin.macro';

type Props = {
  name?: string;
  size?: number;
  checked?: boolean;
  label?: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({
  size = 18,
  name,
  checked,
  label,
  onChange,
  onMouseDown,
  onMouseUp,
}: Props) => {
  const { mute } = useAppContext();
  const [active, setActive] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(checked);

  const [playActive] = useSound(`${process.env.PUBLIC_URL}/music/pop-down.mp3`, { id: 'active', volume: 0.25, soundEnabled: !mute });
  const [playOn] = useSound(`${process.env.PUBLIC_URL}/music/pop-up-on.mp3`, { id: 'on', volume: 0.25, soundEnabled: !mute });
  const [playOff] = useSound(`${process.env.PUBLIC_URL}/music/pop-up-off.mp3`, { id: 'off', volume: 0.25, soundEnabled: !mute });

  const springConfig = {
    tension: 400,
    friction: 22,
    clamp: !isChecked,
  };

  const filledScale = isChecked ? (active ? 1.4 : 1) : 0;
  const filledSpring = useSpring({
    transform: `scale(${filledScale})`,
    config: springConfig,
  });

  const outlineScale = active ? 0.8 : 1;
  const outlineSpring = useSpring({
    transform: `scale(${outlineScale})`,
    config: springConfig,
  });

  const onClickCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    onChange?.(event);
  };

  return (
    <Wrapper>
      <RealCheckbox
        name={name}
        onMouseDown={(e) => {
          setActive(true);
          playActive();
          onMouseDown?.(e);
        }}
        onMouseUp={(e) => {
          setActive(false);

          if (checked) {
            playOff();
          } else {
            playOn();
          }

          onMouseUp?.(e);
        }}
        onChange={onClickCheckbox}
      />
      <VisibleContents>
        <VisibleBox style={{ width: size, height: size, ...outlineSpring }}>
          <Filled style={filledSpring} />
        </VisibleBox>
        {label}
      </VisibleContents>
    </Wrapper>
  );
};

const Wrapper = styled.div.attrs({ className: 'relative' })``;

const RealCheckbox = styled.input.attrs(
  {
    type: 'checkbox',
    className: 'cursor-pointer absolute top-0 left-0 bottom-0 right-0 w-full h-full opacity-0',
  },
)`
  z-index: 2;
`;

const VisibleContents = styled.div.attrs(
  {
    className: 'relative flex items-center',
  },
)`
  z-index: 1;
`;

const VisibleBox = styled(animated.div).attrs(
  {
    className: 'relative rounded mr-2 border-2 border-black dark:border-white',
  },
)`
  ${RealCheckbox}:hover + ${VisibleContents} & {
    ${tw`border-[#111] dark:border-beige`};
  }
  ${RealCheckbox}:focus.focus-visible + ${VisibleContents} & {
    ${tw`outline-black`}
    outline: 2px auto;
    outline-offset: 2px;
  }
`;

const Filled = styled(animated.div).attrs({
  className: 'absolute top-0.5 left-0.5 right-0.5 bottom-0.5 rounded-sm bg-black dark:bg-white',
})``;
