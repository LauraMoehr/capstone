// import greatGreyOwl from "..greatGreyOwl.jpg"
// import polarBear from "../polarBear.jpg"
// import redPanda from "../redPanda.jpg"
// import walrus from "../walrus.jpg"
//import rhinos from "../rhinos.jpg"
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
  box-shadow: 4px 4px 5px var(--lightbrown-day);
  /* opacity: 0.5;
    &:hover {
    opacity: 1;
  } */
`
