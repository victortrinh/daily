import {
  Avatar, List, ListItem, ListItemAvatar, ListItemText,
} from '@mui/material';
import styled from 'styled-components';
import { Image } from '@components/Image';
import tw from 'twin.macro';
import { Person } from '../../types/person';

type Props = {
  title: string;
  peopleToPass: Person[];
  onClickPerson: (index: number) => void;
};

const StyledContainer = styled.div.attrs({ className: 'mt-5' })`
  .person {
    ${tw`cursor-pointer`};
  }
`;

export const PeopleToPass = ({ title, peopleToPass, onClickPerson }: Props) => {
  const onClick = (index: number) => () => {
    onClickPerson(index);
  };

  return (
    <StyledContainer>
      <h2>{ title }</h2>
      <List>
        {peopleToPass.map((person, index) => (
          <ListItem className="person" key={person.id} onClick={onClick(index)}>
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
};
