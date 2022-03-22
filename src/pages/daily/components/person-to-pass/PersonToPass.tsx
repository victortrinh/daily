import React, { useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Image } from '@components/Image';
import { animated } from 'react-spring';
import useBoop from '@/hooks/use-boop.hook';
import { Timer } from './components';
import { backgroundColors } from '../../utils/background-colors';

type Props = {
  personPassing?: string;
  isFirst: boolean;
  backgroundColor?: string;
};

type StyledProps = {
  backgroundColor: string
}

const StyledContainer = styled.div.attrs(
  { className: 'w-full flex flex-col justify-center items-center text-center mb-5' },
)<StyledProps>`
  .image-wrapper {
    ${tw`w-full h-full flex justify-center items-center`};
  }

  .avatar {
    ${tw`flex justify-center items-center relative`};
    background-color: ${(props) => props.backgroundColor};
    width: 200px;
    height: 200px;
    border-radius: 100%;
  }

  .name {
    ${tw`my-3 font-bold`};
  }

  .celebrate {
    ${tw`absolute bg-white dark:bg-darkblue border`};
    ${tw`-bottom-2 left-0 right-0 text-lg rounded-3xl px-2`};
  }
`;

const AnimatedImage = animated(Image);

export const PersonToPass = ({ personPassing, isFirst, backgroundColor }: Props) => {
  const [style, trigger] = useBoop({ rotation: 30, scale: 1.3, timing: 200 });

  const color = backgroundColor ?? backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

  useEffect(() => {
    if (isFirst) {
      trigger();
    }
  }, [isFirst]);

  return (
    <StyledContainer backgroundColor={color}>
      <h1>Person passing</h1>
      <div className="avatar">
        {!personPassing
          ? <Image src={`${process.env.PUBLIC_URL}/photos/avatar.png`} alt="avatar" />
          : (
            <animated.div className="image-wrapper" onMouseEnter={trigger} style={style}>
              <AnimatedImage
                src={`${process.env.PUBLIC_URL}/photos/${personPassing.toLowerCase()}-glab.png`}
                alt={personPassing}
              />
            </animated.div>
          )}
        {isFirst && <div className="celebrate">1st🥇 - Lucky you 😏</div>}
      </div>
      <div className="name">{personPassing ?? 'Draw someone'}</div>
      {personPassing ? <Timer key={personPassing} /> : (
        <StyledEmptyTimer>
          <div className="clock">
            00:00
          </div>
        </StyledEmptyTimer>
      )}
    </StyledContainer>
  );
};

const StyledEmptyTimer = styled.div.attrs(
  { className: 'flex justify-center items-center gap-1' },
)`
  .clock {
    ${tw`flex justify-center items-center font-bold bg-brown dark:bg-dark`};
    ${tw`w-20 h-8 rounded-3xl text-lg`};
  }
`;
