import styled from "styled-components"

export default function Game({ game, id, onSubmitVotes, animalsToChooseFrom, sortedResults }) {
  const { roomName, disciplines, weather, players } = game

  return (
    <>
      {id && <p>This game's id: {id}</p>}
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
          <>
            <CardStyle key={discipline._id}>
              <h4>{discipline.name}</h4>
              <p>{discipline.type}</p>
            </CardStyle>
          </>
        ))}
      {/* <label htmlFor="animals">Choose your Animal here:</label>
        <select defaultValue="" name="animals" id="animals">
          {" "}
          {/* onChange={handleChange} value={animals} */}
      {/* <option value="">""</option>
          {animalsToChooseFrom &&
            animalsToChooseFrom.map(option => (
              <option key={option._id} value={option.name}>
                {option.name}
              </option>
            ))}
        </select> */}
      {players && (
        <p>
          Number of players: {players.length}
          <br />
          Enter votes for each discipline below. You can give points between 1 and{" "}
          {players.length - 1}
        </p>
      )}
      {players &&
        players.map(player => (
          <>
            <p>
              Player {player.name} has joined the game with the {player.animal.name}.
            </p>
            <form onSubmit={onSubmitVotes}>
              <Input
                type="number"
                name="vote1"
                min="1"
                max={players.length - 1}
                placeholder="Discipline 1"
              />
              <br />
              <Input
                type="number"
                name="vote2"
                min="1"
                max={players.length - 1}
                placeholder="Discipline 2"
              />
              <br />
              <Input
                type="number"
                name="vote3"
                min="1"
                max={players.length - 1}
                placeholder="Discipline 3"
              />
              <Input type="hidden" name="playerId" value={player.id} />
              <br />
              <Button>Submit Votes</Button>
            </form>
            {sortedResults && //TODO Bedingung votes.length bei players.every!
              //votes == anzahl spieler - 1 mal disc., das in func
              //players && playersResults muss beides true
              sortedResults.length === players.length &&
              sortedResults.map((player, index) => {
                if (index == 0) {
                  return (
                    <CardStyle key={player._id}>
                      <p>
                        🏆{player.name} received {player.num} points ✨✨✨🏆
                      </p>
                    </CardStyle>
                  )
                } else {
                  return (
                    <CardStyle key={player._id}>
                      <p>
                        {player.name}, {player.num} points
                      </p>
                    </CardStyle>
                  )
                }
              })}
          </>
        ))}
    </>
  )
}

const CardStyle = styled.div`
  margin: 0.5rem 3rem;
  background-color: var(--beige-day);
  border: 2px solid var(--oliv-day);
  padding: 0.5rem;
`
const Input = styled.input`
  font-family: "Righteous", cursive;
  color: var(--oliv-day);
  background-color: var(--beige-day);
  border: 2px solid var(--oliv-day);
  padding: 0.3rem;
  margin: 0.5rem;
`
const Button = styled.button`
  font-family: "Righteous", cursive;
  color: var(--olive-day);
  background-color: var(--beige-day);
  border: 2px solid var(--oliv-day);
  margin: 5px;
`
