import styled from "styled-components"

export default function Disciplines({ disciplines }) {
  return (
    <>
      <h3>Disciplines</h3>
      {disciplines.map(discipline => (
        <CardStyle key={discipline._id}>
          <h4>{discipline.name}</h4>
          <p>{discipline.type}</p>
        </CardStyle>
      ))}
      <p>
        <em>More disciplines to follow soon...</em>
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
`
