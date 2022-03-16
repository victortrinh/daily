import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Gif } from '@giphy/react-components/';
import { GifsResult, GiphyFetch } from '@giphy/js-fetch-api';
import { colors } from '@mui/material';
import tw from 'twin.macro';
import { useSpring, animated } from 'react-spring';
import Icon from '@mui/icons-material/Celebration';
import { Quote } from './types/quote';
import { ConfettiGeyser } from './components';

const gf = new GiphyFetch('HTMGm6cO0h71Clpw9QqXqpoOyEApQZHp');
const CelebrationIcon = animated(Icon);

const StyledContainer = styled.div.attrs(
  { className: 'w-full flex items-center flex-col p-8 my-8 rounded-xl bg-white dark:bg-black shadow-default' },
)`  
  .confetti {
    ${tw`cursor-pointer`};
  }

  .gif {
    width: 100% !important;

    img {
      width: 100% !important;
      ${tw`cursor-pointer`};
    }
  }

  .end {
    ${tw`pt-6`};
  }

  .quote-container {
    ${tw`cursor-pointer text-center`};
  }

  .quote {
    ${tw`mb-2 italic`};
  }

  .author {
    color: ${colors.grey[600]};
  }
`;

const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

const Celebration = () => {
  const [showConfettis, setShowConfettis] = useState(true);
  const [gifs, setGifs] = useState<GifsResult>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [gif, setGif] = useState<any>();
  const [isHovering, setIsHovering] = useState(false);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quote, setQuote] = useState<Quote>();

  const props = useSpring({ scale: isHovering ? 1 : 0 });

  const randomQuote = () => setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  const randomGif = () => setGif(gifs?.data?.[Math.floor(Math.random() * gifs.data.length)]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await gf.search('celebrate', { sort: 'relevant', limit: 80 });
      setGifs(result);
      setGif(result.data?.[Math.floor(Math.random() * result.data.length)]);
    };

    fetchData();

    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data.quotes);
        setQuote(data.quotes[Math.floor(Math.random() * data.quotes.length)]);
      });
  }, []);

  const [position] = React.useState([
    window.innerWidth / 2,
    window.innerHeight,
  ]);

  const [enableCollisions] = React.useState(true);
  const [airFriction] = React.useState(0.04);
  const [velocity] = React.useState(15);
  const [angularVelocity] = React.useState(0.6);
  const [angle] = React.useState(-90);
  const [spread] = React.useState(20);
  const [volatility] = React.useState(0.75);
  const [concentration] = React.useState(10);

  return (
    <StyledContainer>
      <h2>
        End of daily!
        {' '}
        <CelebrationIcon
          aria-hidden="true"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={() => setShowConfettis(!showConfettis)}
          className="confetti"
          style={{
            transform: props.scale
              .to({
                range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                output: [1, 0.97, 0.9, 1.1, 1.2, 1.3, 1.4, 1.5],
              })
              .to((scale) => `scale(${scale})`),
          }}
        />
      </h2>
      {gif && (
        <Gif
          className="gif"
          width={500}
          gif={gif}
          hideAttribution
          noLink
          onGifClick={randomGif}
        />
      )}
      <h3>Quote of the day</h3>
      {quote && (
      <div className="quote-container" onClick={randomQuote} aria-hidden="true">
        <div className="quote">
          {`"${quote.quote}"`}
        </div>
        <div className="author">
          {quote.author}
        </div>
      </div>
      )}
      <h2 className="end">🤘 Have a nice day everyone! 🤘</h2>
      {showConfettis && (
      <ConfettiGeyser
        position={position}
        enableCollisions={enableCollisions}
        airFriction={airFriction}
        velocity={velocity}
        angularVelocity={angularVelocity}
        angle={angle}
        spread={spread}
        volatility={volatility}
        concentration={concentration}
      />
      )}
    </StyledContainer>
  );
};

export default Celebration;
