import {
  Button,
  Collapse,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const StyledContainer = styled.div.attrs({ className: 'w-full h-screen' })`
  .toggles {
    ${tw`w-full flex justify-center`};
  }

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

  .collapse {
    ${tw`cursor-pointer flex gap-3 my-4`};
  }
`;

const Home = () => {
  const softstartNames = 'Kevin\nMaxime\nVictor\nJean-Luc\nEric\nFrancis\nJonathan\nBen';
  const portraitNames = 'Maxime\nEtienne\nKanika\nGR\nEric';

  const navigate = useNavigate();
  const initialProject = localStorage.getItem('project');
  const [project, setProject] = useState(initialProject ?? 'softstart');
  const [names, setNames] = useState(project === 'portrait' ? portraitNames : softstartNames);
  const [waitlist, setWaitlist] = useState<null | string>(null);
  const [error, setError] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setError(false);
    setNames(event.target.value);
  };

  const handleWaitlistChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setWaitlist(event.target.value);
  };

  const onSubmit = () => {
    if (!names?.trim()) {
      setError(true);
      return;
    }

    navigate('/start', { state: { names, waitlist } });
  };

  const onClickCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleProjectChange = (
    event: React.MouseEvent<HTMLElement>,
    newProject: string,
  ) => {
    setProject(newProject);
    localStorage.setItem('project', newProject);

    if (newProject === 'portrait') {
      setNames(portraitNames);
      return;
    }

    setNames(softstartNames);
  };

  return (
    <StyledContainer>
      <ToggleButtonGroup
        className="toggles"
        color="primary"
        value={project}
        exclusive
        onChange={handleProjectChange}
      >
        <ToggleButton value="softstart">Softstart</ToggleButton>
        <ToggleButton value="portrait">Portrait</ToggleButton>
      </ToggleButtonGroup>
      <div className="form">
        <h1>Enter people participating in daily</h1>
        <TextField
          error={error}
          fullWidth
          label="Names"
          minRows={3}
          multiline
          value={names}
          onChange={handleChange}
          variant="outlined"
        />
        {error && <div className="error">Cannot be blank</div>}
        <div className="collapse" onClick={onClickCollapse} aria-hidden="true">
          Waitlist
          {collapsed ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </div>
        <Collapse in={!collapsed}>
          <TextField
            error={error}
            fullWidth
            label="Waitlist"
            minRows={2}
            multiline
            onChange={handleWaitlistChange}
            variant="outlined"
          />
        </Collapse>
        <div className="button-container">
          <Button
            size="large"
            variant="outlined"
            fullWidth
            onMouseUp={onSubmit}
          >
            Start daily
          </Button>
        </div>
      </div>
    </StyledContainer>
  );
};

export default Home;
