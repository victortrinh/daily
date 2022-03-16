import { Container, ThemeProvider } from '@mui/material';
import { Routing } from '@routes/Routing';
import VolumeOff from '@mui/icons-material/VolumeOff';
import VolumeOn from '@mui/icons-material/VolumeUp';
import LightMode from '@mui/icons-material/LightMode';
import DarkIcon from '@mui/icons-material/Brightness2';
import styled from 'styled-components';
import tw from 'twin.macro';
import { HashRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppContext } from './contexts/AppContext';
import { light, dark } from './common/theme';

const Wrapper = styled.div.attrs({ className: 'w-full h-full min-h-screen bg-beige text-black dark:bg-dark dark:text-white pb-8' })`
  .top {
    ${tw`flex justify-end w-full pt-4 pr-4 gap-4`};
  }

  .volume-icon {
    ${tw`cursor-pointer`};
  }
`;

const App = () => {
  const { mute, setMute } = useAppContext();
  const [darkMode, setDarkMode] = useState(true);

  const setSound = () => {
    localStorage.setItem('mute', JSON.stringify(!mute));
    setMute?.(!mute);
  };

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
            {mute ? <VolumeOff className="volume-icon" onClick={setSound} /> : <VolumeOn className="volume-icon" onClick={setSound} />}
            {darkMode ? <LightMode className="volume-icon" onClick={setLight} /> : <DarkIcon className="volume-icon" onClick={setDark} />}
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
