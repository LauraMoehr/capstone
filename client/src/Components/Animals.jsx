import Header from './Header';
import ImageFile from './ImageFile.jsx';
import styled from 'styled-components';

export default function Animals({ animals }) {
  return (
    <>
      <Header />
      <main>
        <h3>Animals</h3>
        <Grid>
          {animals.map((animal) => (
            <CardStyle key={animal._id}>
              <h4>{animal.name}</h4>
              <p>{animal.type}</p>
              <Card src={ImageFile(animal.name)} alt={animal.name}></Card>
            </CardStyle>
          ))}
        </Grid>
      </main>
    </>
  );
}
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  overflow: scroll;
`;
const CardStyle = styled.div`
  background-color: var(--beige-day);
  border-radius: 10px;
  border: 1px solid var(--oliv-day);
  box-shadow: 4px 4px 5px var(--lightbrown-day);
  margin: 0.5rem;
  padding: 0.2rem;
`;
const Card = styled.img`
  height: 40vh;
  margin: 0;
  max-width: 50vw;
`;
