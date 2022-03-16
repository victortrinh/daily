import VolumeOff from '@mui/icons-material/VolumeOff';
import VolumeOn from '@mui/icons-material/VolumeUp';
import styled from 'styled-components';
import { animated } from 'react-spring';
import { useAppContext } from '@/contexts/AppContext';
import useBoop from '@hooks/use-boop.hook';

const Wrapper = styled.div.attrs({ className: 'cursor-pointer' })``;

const AnimatedVolumeOff = animated(VolumeOff);
const AnimatedVolumeOn = animated(VolumeOn);

export const VolumeButtons = () => {
  const { mute, setMute } = useAppContext();
  const [style, trigger] = useBoop({ rotation: 20, timing: 200 });

  const setSound = () => {
    localStorage.setItem('mute', JSON.stringify(!mute));
    setMute?.(!mute);
  };

  if (mute) {
    return (
      <Wrapper>
        <AnimatedVolumeOff onMouseEnter={trigger} className="volume-icon" onClick={setSound} style={style} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <AnimatedVolumeOn onMouseEnter={trigger} className="volume-icon" onClick={setSound} style={style} />
    </Wrapper>
  );
};
