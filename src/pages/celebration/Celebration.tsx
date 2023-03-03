import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Gif } from '@giphy/react-components/';
import { GifsResult, GiphyFetch } from '@giphy/js-fetch-api';
import { LinearProgress, colors } from '@mui/material';
import tw from 'twin.macro';
import { animated } from 'react-spring';
import Icon from '@mui/icons-material/Celebration';
import useBoop from '@/hooks/use-boop.hook';
import { faces } from '@/assets/default-sprites';
import { Configuration, OpenAIApi } from 'openai';
import { sample } from '@/utils';
import { ConfettiGeyser } from './components';
import { backgroundColors } from '../daily/utils/background-colors';
import { IGif } from './types/gif';

const configuration = new Configuration({
  organization: process.env.REACT_APP_ORGANIZATION_ID,
  apiKey: process.env.REACT_APP_OPEN_API_SECRET,
});
const openai = new OpenAIApi(configuration);

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
    ${tw`text-center`};
  }

  .quote {
    ${tw`mb-2 italic`};
  }

  .author {
    color: ${colors.grey[600]};
  }

  .loading {
    ${tw`w-full`}
  }
`;

const Celebration = () => {
  const [showConfettis, setShowConfettis] = useState(false);
  const [engineOn, setEngineOn] = useState(false);
  const [gifs, setGifs] = useState<GifsResult>();
  const [gif, setGif] = useState<IGif>();
  const [quote, setQuote] = useState<string>();
  const [style, trigger] = useBoop({ rotation: 20, timing: 200 });

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

  const initialProject = localStorage.getItem('project');

  const softstart = ['Eric', 'Francis', 'Jonathan 🐔', 'Jovan', 'Jonathan 🍐'];
  const portrait = ['Maxime', 'Etienne', 'Kanika', 'GR', 'Mike', 'Ben', 'Abdoulaye', 'Victor', 'Kevin'];

  const prompts = [
    // 'Generate a non existent random inspirational quote that will energize my team in Yoda style and attribute it to Yoda',
    // 'Generate a non existent random inspirational quote that will energize my team in a pirate voice and attribute it to pirate character',
    // 'Generate a non existent random inspirational quote that sounds like a quote from a sci-fi movie and attribute it to a character.',
    // 'Generate a non existent random inspirational quote that will revolutionize the tech industry and attribute it to the God of tech',
    // 'Generate a non existent random inspirational quote using metaphors and attribute it to a real athlete.',
    // 'Generate a home repairs protip from a 90s movie and attribute it to the movie\'s character.',
    // 'Start writing an inspirational quote but veer into unspeakable dark eldrich horror right before the end. Attribute it to a comedy movie bad guy.',
    `Write a shout out to ${sample(initialProject === 'softstart' ? softstart : portrait)}`,
  ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await gf.search('celebrate', { sort: 'relevant', limit: 80 });
      setGifs(result);
      setGif(result.data?.[Math.floor(Math.random() * result.data.length)]);
    };

    openai.createCompletion({
      model: 'text-davinci-003',
      prompt: sample(prompts),
      max_tokens: 120,
      temperature: 0.9,
      presence_penalty: 2,
    }).then((response) => {
      const [firstChoice] = response.data.choices;
      setQuote(firstChoice.text);
    });

    fetchData();

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
      {quote ? (
        <div className="quote-container" aria-hidden="true">
          <div className="quote">
            {quote}
          </div>
          <div className="author">
            Generated by ChatGPT
          </div>
        </div>
      ) : <LinearProgress className="loading" color="success" />}
      <h2 className="end">🤘 Wish you to have the best of days everyone! 🤘</h2>
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
