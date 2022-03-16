import { Container, ThemeProvider } from '@mui/material';
import { Routing } from '@routes/Routing';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/Brightness2';
import styled from 'styled-components';
import tw from 'twin.macro';
import { HashRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { animated } from 'react-spring';
import { light, dark } from './common/theme';
import { VolumeButtons } from './components/VolumeButtons';
import useBoop from './hooks/use-boop.hook';

const Wrapper = styled.div.attrs({ className: 'w-full h-full min-h-screen bg-beige text-black dark:bg-darkerkblue dark:text-white pb-8' })`
  .top {
    ${tw`flex justify-end w-full pt-4 pr-4 gap-4`};
  }

  .volume-icon {
    ${tw`cursor-pointer`};
  }

  h1 {
    ${tw`text-darkpurple dark:text-brightyellow`};
  }

  h2 {
    ${tw`text-blue`};
  }
`;

const AnimatedLightMode = animated(LightMode);
const AnimatedDarkMode = animated(DarkMode);

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [style, trigger] = useBoop({ rotation: 20, timing: 200 });

  const setDark = () => {
    setDarkMode(true);
    localStorage.theme = 'dark';
    document.documentElement.classList.add('dark');
  };

  const setLight = () => {
    setDarkMode(false);
    localStorage.theme = 'light';
    document.documentElement.classList.remove('dark');
  };

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDark();
    } else {
      setLight();
    }
  }, []);

  return (
    <ThemeProvider theme={darkMode ? dark : light}>
      <HashRouter>
        <Wrapper>
          <div className="top">
            <VolumeButtons />
            {darkMode
              ? <AnimatedLightMode onMouseEnter={trigger} className="volume-icon" onClick={setLight} style={style} />
              : <AnimatedDarkMode onMouseEnter={trigger} className="volume-icon" onClick={setDark} style={style} />}
          </div>
          <Container maxWidth="sm">
            <Routing />
          </Container>
        </Wrapper>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
