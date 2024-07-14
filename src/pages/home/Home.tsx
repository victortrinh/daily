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
    ${tw`flex justify-center w-full`};
  }

  .checkboxes {
    ${tw`flex flex-col gap-2 mb-6`};
  }

  .form {
    ${tw`flex flex-col justify-center w-full p-8 my-8 bg-white rounded-xl dark:bg-darkblue shadow-default`};
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
    ${tw`flex gap-3 my-4 cursor-pointer`};
  }
`;

const projects = {
  softstart: 'Eric\nFrancis\nJonathan 🐔\nJovan',
  portrait: 'GR\nAbdoulaye\nKevin\nKFales\nFrancis',
  ovcore: 'Victor\nJasmin\nAlex\nXavier\nPatrick\nMabl',
};

type Project = keyof typeof projects;

const Home = () => {
  const softstartNames = 'Eric\nFrancis\nJonathan 🐔\nJovan';
  const portraitNames = 'GR\nAbdoulaye\nKevin\nKFales\nFrancis';

  const navigate = useNavigate();
  const initialProject = localStorage.getItem('project') as Project | null;
  const [project, setProject] = useState<Project>(initialProject ?? 'softstart');
  const [names, setNames] = useState(projects[project]);
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
    newProject: Project,
  ) => {
    setProject(newProject);
    localStorage.setItem('project', newProject);
    setNames(projects[newProject]);
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
        <ToggleButton value="portrait">Workleap</ToggleButton>
        <ToggleButton value="ovcore">Ovcore</ToggleButton>
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
