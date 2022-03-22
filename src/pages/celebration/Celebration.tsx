import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Gif } from '@giphy/react-components/';
import { GifsResult, GiphyFetch } from '@giphy/js-fetch-api';
import { colors } from '@mui/material';
import tw from 'twin.macro';
import { animated } from 'react-spring';
import Icon from '@mui/icons-material/Celebration';
import useBoop from '@/hooks/use-boop.hook';
import { faces } from '@/assets/default-sprites';
import { Quote } from './types/quote';
import { ConfettiGeyser } from './components';
import { backgroundColors } from '../daily/utils/background-colors';

const gf = new GiphyFetch('HTMGm6cO0h71Clpw9QqXqpoOyEApQZHp');
const CelebrationIcon = animated(Icon);

const StyledContainer = styled.div.attrs(
  { className: 'w-full flex items-center flex-col p-8 my-8 rounded-xl bg-white dark:bg-darkblue shadow-default' },
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
  const [showConfettis, setShowConfettis] = useState(false);
  const [engineOn, setEngineOn] = useState(false);
  const [gifs, setGifs] = useState<GifsResult>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [gif, setGif] = useState<any>();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quote, setQuote] = useState<Quote>();
  const [style, trigger] = useBoop({ rotation: 20, timing: 200 });

  const randomQuote = () => setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  const randomGif = () => setGif(gifs?.data?.[Math.floor(Math.random() * gifs.data.length)]);
  const timeoutId : { current: NodeJS.Timeout | undefined } = useRef(undefined);
  const secondTimeoutId: { current: NodeJS.Timeout | undefined } = useRef(undefined);

  const boopConfettis = () => {
    clearTimeout(timeoutId?.current as NodeJS.Timeout);
    clearTimeout(secondTimeoutId?.current as NodeJS.Timeout);
    setShowConfettis(true);
    setEngineOn(true);

    timeoutId.current = setTimeout(() => {
      setShowConfettis(false);
    }, 1000);

    secondTimeoutId.current = setTimeout(() => {
      setEngineOn(false);
    }, 5000);
  };

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

    boopConfettis();

    return () => {
      clearTimeout(timeoutId.current as NodeJS.Timeout);
      clearTimeout(secondTimeoutId.current as NodeJS.Timeout);
    };
  }, []);

  return (
    <StyledContainer>
      <h1>
        End of daily!
        {' '}
        <CelebrationIcon
          aria-hidden="true"
          onMouseEnter={trigger}
          onClick={boopConfettis}
          className="confetti"
          style={style}
        />
      </h1>
      {gif && (
        <Gif
          backgroundColor={backgroundColors[Math.floor(Math.random() * backgroundColors.length)]}
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
      {engineOn && (
        <ConfettiGeyser
          position={[
            window.innerWidth / 2,
            window.innerHeight,
          ]}
          airFriction={0.04}
          velocity={30}
          angularVelocity={0.5}
          angle={-90}
          spread={20}
          volatility={0.75}
          concentration={50}
          samples={showConfettis ? faces : [{ airFrictionMultiplier: 0 }]}
        />
      )}
    </StyledContainer>
  );
};

export default Celebration;
