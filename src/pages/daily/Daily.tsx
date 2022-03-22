import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Person } from '@/pages/daily/types/person';
import tw from 'twin.macro';
import BackIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import useSound from 'use-sound';
import { useAppContext } from '@/contexts/AppContext';
import { Checkbox } from '@/components/Checkbox';
import { Button, Tooltip } from '@mui/material';
import { sprites } from '@/assets/default-sprites';
import {
  DrumRoll, ParkingLot, PeopleToPass, PersonToPass,
} from './components';
import { backgroundColors } from './utils/background-colors';
import { ConfettiGeyser } from '../celebration/components';

const StyledContainer = styled.div.attrs({ className: 'my-8 p-8 rounded-xl relative bg-white dark:bg-darkblue shadow-default' })`
  .back-button {
    ${tw`absolute left-8 top-8 mt-0.5 cursor-pointer w-6`};
  }

  .draw-randomly {
    ${tw`flex justify-center items-center gap-2`};
  }

  .button {
    ${tw`w-full`};
  }

  img {
    ${tw`w-4/5`};
  }

  .drum {
    ${tw`w-6 h-6 cursor-pointer`};
  }

  .parking-lot-subjects {
    ${tw`mt-4 flex flex-col gap-2`};
  }

  .subject {
    ${tw`flex justify-between`};
  }

  .delete-icon {
    ${tw`cursor-pointer`};
  }

  .buttons {
    ${tw`mt-4`};
  }
`;

type Props = {
  names?: string;
}

const DailyDetails = ({
  names,
}: Props) => {
  const allNames: Person[] = names?.split(/\r?\n/).filter((name) => !!name).map((name, index) => ({
    id: index,
    name: name.trim(),
    backgroundColor: backgroundColors[Math.floor(Math.random() * backgroundColors.length)],
  })) ?? [];

  const [peopleToPass, setPeopleToPass] = useState<Person[]>(allNames);
  const [personPassing, setPersonPassing] = useState<Person | undefined>();
  const [count, setCount] = useState(0);
  const [isDrumming, setIsDrumming] = useState(false);
  const [parkingLotSubjects, setParkingLotSubjects] = useState<{id: string, name: string, checked: boolean}[]>([]);
  const [showConfettis, setShowConfettis] = useState(false);
  const [engineOn, setEngineOn] = useState(false);
  const timeoutConfettis : { current: NodeJS.Timeout | undefined } = useRef(undefined);
  const timeoutEngine: { current: NodeJS.Timeout | undefined } = useRef(undefined);

  const hasParkingLotSubjects = parkingLotSubjects.length > 0;

  const onClick = () => {
    if (!peopleToPass) {
      return;
    }

    if (peopleToPass.length === 0) {
      if (hasParkingLotSubjects) {
        setPersonPassing(undefined);
        return;
      }

      onClickFinish();
      return;
    }

    const [person] = peopleToPass.splice(Math.floor(Math.random() * peopleToPass.length), 1);
    setPeopleToPass(peopleToPass);
    setPersonPassing(person);

    if (count <= 1) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const navigate = useNavigate();

  const onClickBack = () => {
    navigate('/');
  };

  const onClickFinish = () => {
    navigate('/celebration', { state: { names } });
  };

  const { mute } = useAppContext();
  const [playTada] = useSound(`${process.env.PUBLIC_URL}/music/tada.flac`, { soundEnabled: !mute, volume: 0.25 });

  const onClickDrumRoll = () => {
    setIsDrumming(true);
    let number = 0;
    const interval = setInterval(() => {
      setPersonPassing(peopleToPass[Math.floor(Math.random() * peopleToPass.length)]);
      if (++number === 19) {
        setIsDrumming(false);
        onClick();
        playTada();
        clearInterval(interval);
      }
    }, 1e2);
  };

  const onAdd = (parkingLotSubject: string) => {
    setParkingLotSubjects((prevState) => prevState.concat({ id: (parkingLotSubjects.length + 1).toString(), name: parkingLotSubject, checked: false }));
  };

  const onClickDeleteSubject = (index: number) => () => {
    const array = [...parkingLotSubjects];
    array.splice(index, 1);
    setParkingLotSubjects(array);
  };

  const getMessage = () => {
    if (isDrumming) {
      return 'Drumming!';
    }

    if (peopleToPass.length > 1) {
      return 'Draw randomly';
    }

    if (peopleToPass.length === 1) {
      return 'Draw last person';
    }

    if (hasParkingLotSubjects) {
      return 'Last person finished';
    }

    return 'End daily';
  };

  const onChangeParkingLotSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setParkingLotSubjects((prevState) => prevState.map((x) => (x.id === id ? { ...x, checked } : x)));
  };

  const isEndDisabled = parkingLotSubjects.some((x) => !x.checked);

  useEffect(() => {
    if (count === 1) {
      setEngineOn(true);
      setShowConfettis(true);
      timeoutConfettis.current = setTimeout(() => {
        setShowConfettis(false);
      }, 500);
      timeoutEngine.current = setTimeout(() => {
        setEngineOn(false);
      }, 4000);
    }

    return () => {
      clearTimeout(timeoutConfettis.current as NodeJS.Timeout);
      clearTimeout(timeoutEngine.current as NodeJS.Timeout);
    };
  }, [count]);

  return (
    <StyledContainer>
      <BackIcon onClick={onClickBack} className="back-button" />
      <PersonToPass backgroundColor={personPassing?.backgroundColor} isFirst={count === 1} personPassing={personPassing?.name} />
      {(peopleToPass.length > 0 || personPassing) && (
        <div className="draw-randomly">
          <Button size="large" fullWidth variant="outlined" disabled={isDrumming} onClick={onClick}>{getMessage()}</Button>
          {peopleToPass.length > 1 && <DrumRoll className="drum" onClick={onClickDrumRoll} />}
        </div>
      )}
      <ParkingLot onAdd={onAdd} />
      {parkingLotSubjects.length > 0 && (
        <div className="parking-lot-subjects">
          {parkingLotSubjects.map((subject, index) => (
            <div key={subject.id} className="subject">
              <Checkbox id={subject.id} onChange={onChangeParkingLotSubject} label={subject.name} />
              <DeleteIcon className="delete-icon" onClick={onClickDeleteSubject(index)} />
            </div>
          ))}
        </div>
      )}
      <div className="buttons">
        {peopleToPass.length === 0 && !personPassing && (
          <Tooltip arrow title={isEndDisabled ? 'Complete all parking lot subjects' : ''} followCursor>
            <span>
              <Button disabled={isEndDisabled} size="large" fullWidth variant="outlined" onClick={onClickFinish}>End daily</Button>
            </span>
          </Tooltip>
        )}
      </div>
      {peopleToPass.length > 0 && (
        <PeopleToPass peopleToPass={peopleToPass} />
      )}
      {engineOn && (
        <ConfettiGeyser
          position={[
            window.innerWidth / 2,
            window.innerHeight,
          ]}
          airFriction={0.04}
          velocity={30}
          angularVelocity={0.6}
          angle={-90}
          spread={20}
          volatility={0.75}
          concentration={50}
          samples={showConfettis ? sprites : [{ airFrictionMultiplier: 0 }]}
        />
      )}
    </StyledContainer>
  );
};

const Daily = () => {
  const location = useLocation();

  const props = location?.state ? location.state as Props : null;

  return <DailyDetails {...props} />;
};

export default Daily;
