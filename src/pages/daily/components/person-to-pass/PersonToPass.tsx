import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Image } from '@components/Image';
import { Timer } from './components';

type Props = {
  personPassing?: string;
  isFirst: boolean;
  backgroundColor: string;
};

type StyledProps = {
  backgroundColor: string
}

const StyledContainer = styled.div.attrs(
  { className: 'w-full flex flex-col justify-center items-center text-center mb-5' },
)<StyledProps>`
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

export const PersonToPass = ({ personPassing, isFirst, backgroundColor }: Props) => (
  <StyledContainer backgroundColor={backgroundColor}>
    <h2>Person passing</h2>
    <div className="avatar">
      {!personPassing
        ? <Image src={`${process.env.PUBLIC_URL}/photos/avatar.png`} alt="avatar" />
        : (
          <Image
            src={`${process.env.PUBLIC_URL}/photos/${personPassing.toLowerCase()}-glab.png`}
            alt={personPassing}
          />
        )}
    </div>
    {personPassing && <div className="name">{personPassing}</div>}
    {personPassing && <Timer key={personPassing} />}
    {personPassing && isFirst && <div className="wow">🎉 Wow, you are first. So lucky. 🎉</div>}
  </StyledContainer>
);
