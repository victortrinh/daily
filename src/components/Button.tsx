import styled from 'styled-components';
import tw from 'twin.macro';

const StyledButton = styled.button.attrs(
  { className: 'relative border-none bg-transparent p-0 cursor-pointer w-full' },
)`
  outline-offset: 4px;
  transition: filter 250ms;

  &[disabled] {
    pointer-events: none;

    .front {
      ${tw`bg-white`}
    }
  }

  .shadow,
  .edge {
    ${tw`absolute top-0 left-0 w-full h-full rounded`};
  }

  .shadow {
    background: hsl(0deg 0% 0% / 0.25);
    will-change: transform;
    transform: translateY(2px);
    transition:
      transform
      600ms
      cubic-bezier(.3, .7, .4, 1);
  }

  .edge {
    background: linear-gradient(
      to left,
      hsl(340deg 0% 16%) 0%,
      hsl(340deg 0% 32%) 8%,
      hsl(340deg 0% 32%) 92%,
      hsl(340deg 0% 16%) 100%
    );
  }

  .front {
    ${tw`block relative px-5 py-2.5 rounded uppercase bg-black dark:bg-dark text-white`};
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    letter-spacing: 0.02857em;
    will-change: transform;
    transform: translateY(-4px);
    transition:
      transform
      600ms
      cubic-bezier(.3, .7, .4, 1);
  }

  :hover {
    filter: brightness(110%);
  }

  :hover .front {
    transform: translateY(-6px);
    transition:
      transform
      250ms
      cubic-bezier(.3, .7, .4, 1.5);
  }

  :active .front {
    transform: translateY(-2px);
    transition: transform 34ms;
  }

  :hover .shadow {
    transform: translateY(4px);
    transition:
      transform
      250ms
      cubic-bezier(.3, .7, .4, 1.5);
  }

  :active .shadow {
    transform: translateY(1px);
    transition: transform 34ms;
  }

  :focus:not(:focus-visible) {
    outline: none;
  }
`;

type Props = {
  text: string;
  onMouseUp: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const Button = ({
  text, onMouseUp, disabled,
}: Props) => (
  <StyledButton onMouseUp={onMouseUp} disabled={disabled}>
    <span className="shadow" />
    <span className="edge" />
    <span className="front">
      { text }
    </span>
  </StyledButton>
);
