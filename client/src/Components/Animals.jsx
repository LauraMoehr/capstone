import Header from './Header';
import ImageFile from './ImageFile.jsx';
import styled from 'styled-components';

export default function Animals({ animals }) {
  return (
    <>
      <Header />
      <main>
        <h3>Animals</h3>
        <>
          {animals.map((animal) => (
            <CardStyle key={animal._id}>
              <CardHeader>{animal.name}</CardHeader>
              <Image src={ImageFile(animal.name)} alt={animal.name} />
              <CardText>{animal.type}</CardText>
            </CardStyle>
          ))}
        </>
      </main>
    </>
  );
}
const CardStyle = styled.div`
  margin: 0.5rem auto;
  max-width: 70vw;
  position: relative;
`;
const CardHeader = styled.h4`
  font-size: 1.2rem;
  margin-left: 1rem;
  padding: 0.2rem;
  position: absolute;
  text-shadow: -1px 0 var(--beige), 0 1px var(--beige), 1px 0 var(--beige),
    0 -1px var(--beige);
  z-index: 500;
`;
const CardText = styled.p`
  background-color: rgba(254, 219, 178, 0.6);
  border-radius: 5px;
  color: var(--darkbrown);
  font-size: 0.8rem;
  margin: -3rem 1rem 0 0.5rem;
  padding: 0.5rem;
  position: absolute;
  z-index: 500;
`;
const Image = styled.img`
  border-radius: 10px;
  box-shadow: 4px 4px 5px var(--mediumbrown);
  height: auto;
  margin: 0;
  max-width: 70vw;
`;
