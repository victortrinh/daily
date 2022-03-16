import { TextField, Button } from '@mui/material';
import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import tw from 'twin.macro';

type Props = {
  onAdd: (parkingLot: string) => void;
}

const StyledContainer = styled.form.attrs({ className: 'mt-4 flex gap-2' })`
  .parking-lot-input {
    ${tw`flex-1`};
  }

  .add-button {
    ${tw`min-w-[42px] p-0`};
  }
`;

export const ParkingLot = ({ onAdd }: Props) => {
  const [parkingLotSubject, setParkingLotSubject] = useState('');

  const onSubmitAddParkingLot = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onAdd(parkingLotSubject);
    setParkingLotSubject('');
  };

  return (
    <StyledContainer onSubmit={onSubmitAddParkingLot}>
      <TextField
        size="small"
        className="parking-lot-input"
        value={parkingLotSubject}
        label="Parking lot subject"
        required
        variant="outlined"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setParkingLotSubject(e.target.value)}
      />
      <Button className="add-button" variant="outlined" type="submit">
        <AddIcon />
      </Button>
    </StyledContainer>
  );
};
