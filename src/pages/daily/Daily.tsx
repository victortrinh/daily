import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Person } from '@/pages/daily/types/person';
import tw from 'twin.macro';
import BackIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import useSound from 'use-sound';
import { useAppContext } from '@/contexts/AppContext';
import { Checkbox } from '@/components/Checkbox';
import { Button } from '@mui/material';
import {
  DrumRoll, ParkingLot, PeopleToPass, PersonToPass,
} from './components';
import { backgroundColors } from './utils/background-colors';

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
  })) ?? [];

  const [backgroundColor, setBackgroundColor] = useState(backgroundColors[Math.floor(Math.random()
    * backgroundColors.length)]);
  const [peopleToPass, setPeopleToPass] = useState<Person[]>(allNames);
  const [personPassing, setPersonPassing] = useState<string>();
  const [count, setCount] = useState(0);
  const [isDrumming, setIsDrumming] = useState(false);

  const onClick = () => {
    if (!peopleToPass) {
      return;
    }

    setBackgroundColor(backgroundColors[Math.floor(Math.random() * backgroundColors.length)]);
    const [person] = peopleToPass.splice(Math.floor(Math.random() * peopleToPass.length), 1);
    setPeopleToPass(peopleToPass);
    setPersonPassing(person.name);
    setCount((prevCount) => prevCount + 1);
  };

  const navigate = useNavigate();

  const onClickBack = () => {
    navigate('/');
  };

  const [parkingLotSubjects, setParkingLotSubjects] = useState<{id: number, name: string}[]>([]);
  const [numberOfCheckedItems, setNumberOfCheckedItems] = useState(0);
  const completedAllParkingLotSubjects = numberOfCheckedItems === parkingLotSubjects.length;

  const onClickFinish = () => {
    if (!completedAllParkingLotSubjects) {
      setPersonPassing(undefined);
      return;
    }

    navigate('/celebration', { state: { names } });
  };

  const { mute } = useAppContext();
  const [playTada] = useSound(`${process.env.PUBLIC_URL}/music/tada.flac`, { soundEnabled: !mute, volume: 0.25 });

  const onClickDrumRoll = () => {
    setIsDrumming(true);
    let number = 0;
    const interval = setInterval(() => {
      setPersonPassing(peopleToPass[Math.floor(Math.random() * peopleToPass.length)].name);

      if (++number === 19) {
        setIsDrumming(false);
        onClick();
        playTada();
        clearInterval(interval);
      }
    }, 1e2);
  };

  const onAdd = (parkingLotSubject: string) => {
    setParkingLotSubjects((prevState) => prevState.concat({ id: parkingLotSubjects.length + 1, name: parkingLotSubject }));
  };

  const onClickDeleteSubject = (index: number) => () => {
    const array = [...parkingLotSubjects];
    array.splice(index, 1);
    setParkingLotSubjects(array);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfCheckedItems((prevState) => (event.target.checked ? prevState + 1 : prevState - 1));
  };

  const message = isDrumming ? 'Currently drumming!' : (peopleToPass.length > 1 ? 'Draw randomly' : 'Draw last person');

  return (
    <StyledContainer>
      <BackIcon onClick={onClickBack} className="back-button" />
      {(personPassing || peopleToPass.length > 0)
        && <PersonToPass backgroundColor={backgroundColor} isFirst={count === 1} personPassing={personPassing} /> }
      {peopleToPass.length === 0 ? (
        <Button size="large" fullWidth variant="outlined" onClick={onClickFinish}>{parkingLotSubjects.length > 0 && !completedAllParkingLotSubjects ? 'Complete parking lot tickets' : 'End daily'}</Button>
      ) : (
        <div className="draw-randomly">
          <Button size="large" fullWidth variant="outlined" disabled={isDrumming} onClick={onClick}>{message}</Button>
          {peopleToPass.length > 1 && <DrumRoll className="drum" onClick={onClickDrumRoll} />}
        </div>
      )}
      <ParkingLot onAdd={onAdd} />
      {parkingLotSubjects.length > 0 && (
        <div className="parking-lot-subjects">
          {parkingLotSubjects.map((subject, index) => (
            <div key={subject.id} className="subject">
              <Checkbox onChange={onChange} label={subject.name} />
              <DeleteIcon className="delete-icon" onClick={onClickDeleteSubject(index)} />
            </div>
          ))}
        </div>
      )}
      {peopleToPass.length > 0 && (
        <PeopleToPass peopleToPass={peopleToPass} />
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
