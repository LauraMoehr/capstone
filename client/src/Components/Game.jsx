import styled from "styled-components"

export default function Game({ game, id }) {
  const { roomName, disciplines, weather, players, votes } = game

  return (
    <>
      {id && <p>This game's id: {id}</p>}
      {players &&
        players.map(player => (
          <p>
            Player {player.name} has joined the game with the {player.animal.name}.
          </p>
        ))}
      {weather && (
        <p key={weather._id}>
          Today's weather: 🎲 ...
          <br />
          It's going to be {weather}.
        </p>
      )}
      <p>Today's three disciplines:</p>
      {disciplines &&
        disciplines.map(discipline => (
          <CardStyle key={discipline._id}>
            <h4>{discipline.name}</h4>
            <p>{discipline.type}</p>
          </CardStyle>
        ))}
      {players && <p>Number of players: {players.length}</p>}
    </>
  )
}

const CardStyle = styled.div`
  margin: 0.5rem 3rem;
  background-color: var(--beige-day);
  border: 2px solid var(--oliv-day);
  padding: 0.5em;
`
