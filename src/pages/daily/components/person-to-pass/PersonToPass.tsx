import React from 'react';
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
    ${tw`flex justify-center items-center`};
    background-color: ${(props) => props.backgroundColor};
    width: 200px;
    height: 200px;
    border-radius: 100%;
  }

  .name {
    ${tw`my-3 font-bold`};
  }

  .wow {
    ${tw`mt-3`};
  }
`;

const AnimatedImage = animated(Image);

export const PersonToPass = ({ personPassing, isFirst, backgroundColor }: Props) => {
  const [style, trigger] = useBoop({ rotation: 30, scale: 1.3, timing: 200 });

  const color = backgroundColor ?? backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

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
      </div>
      {personPassing && <div className="name">{personPassing}</div>}
      {personPassing && <Timer key={personPassing} />}
      {personPassing && isFirst && <div className="wow">🎉 Wow, you are first. So lucky. 🎉</div>}
    </StyledContainer>
  );
};
