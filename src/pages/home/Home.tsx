import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

const StyledContainer = styled.div.attrs(
  { className: 'w-full h-screen' },
)`
  .checkboxes {
    ${tw`flex flex-col gap-2 mb-6`};
  }
  
  .form {
    ${tw`w-full p-8 flex flex-col justify-center rounded-xl bg-white dark:bg-darkblue my-8 shadow-default`};
  }
  
  .error {
    ${tw`mb-2 text-error`};
  }

  .step-one-error {
    ${tw`mb-3 text-error`};
  }

  .button-container {
    ${tw`mt-6`};
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [names, setNames] = useState('Kevin\nMaxime\nVictor\nJean-Luc\nEric\nFrancis\nJonathan\nSteve');
  const [error, setError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setError(false);
    setNames(event.target.value);
  };

  const onSubmit = () => {
    if (!names?.trim()) {
      setError(true);
      return;
    }

    navigate('/start', { state: { names } });
  };

  return (
    <StyledContainer>
      <div className="form">
        <h1>Enter people participating in daily</h1>
        <TextField
          error={error}
          fullWidth
          label="Names"
          minRows={3}
          multiline
          defaultValue={names}
          onChange={handleChange}
          variant="outlined"
        />
        { error && <div className="error">Cannot be blank</div> }
        <div className="button-container">
          <Button size="large" variant="outlined" fullWidth onMouseUp={onSubmit}>Start daily</Button>
        </div>
      </div>
    </StyledContainer>
  );
};

export default Home;
