import {
  Avatar, List, ListItem, ListItemAvatar, ListItemText,
} from '@mui/material';
import styled from 'styled-components';
import { Image } from '@components/Image';
import { Person } from '../../types/person';

type Props = {
  peopleToPass: Person[];
};

const StyledContainer = styled.div.attrs({ className: 'mt-5' })``;

export const PeopleToPass = ({ peopleToPass }: Props) => (
  <StyledContainer>
    <h2>People to pass</h2>
    <List>
      {peopleToPass.map((person) => (
        <ListItem key={person.id}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: person.backgroundColor }}>
              <Image
                src={`${process.env.PUBLIC_URL}/photos/${person.name.toLowerCase()}-glab.png`}
                alt={person.name}
              />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={person.name} />
        </ListItem>
      ))}
    </List>
  </StyledContainer>
);
