import styled from "styled-components"

export default function Animals({ animals }) {
  console.log("Animals1 here")
  return (
    <>
      <h3>Gallery of Animals</h3>
      {animals.map(animal => (
        <CardStyle key={animal._id}>
          <h4>{animal.name}</h4>
          <p>{animal.type}</p>
        </CardStyle>
      ))}
      <p>
        <em>Animals to follow soon...</em>
      </p>
    </>
  )
}

const CardStyle = styled.div`
  margin: 0.5rem 3rem;
  background-color: var(--beige-day);
  border: 2px solid var(--oliv-day);
  padding: 0.5em;
`
