import styled from "styled-components"

export default function Animals({ animals }) {
  return (
    <>
      <h3>Animals</h3>
      {animals.map(animal => (
        <CardStyle key={animal._id}>
          <h4>{animal.name}</h4>
          <p>{animal.type}</p>
        </CardStyle>
      ))}
      <p>
        <em>More animals to follow soon...</em>
      </p>
    </>
  )
}

const CardStyle = styled.div`
  margin: 0.5rem 3rem;
  background-color: var(--beige-day);
  border: 1px solid var(--oliv-day);
  padding: 0.2rem;
  box-shadow: 4px 4px 2px 1px var(--oliv-day, 0.1); //andere Farbe
  //h4, p:
  //margin-top: 0.5rem
  //margin-bottom: 0.5rem
  /* opacity: 0.5;
    &:hover {
    opacity: 1;
  } */
`
