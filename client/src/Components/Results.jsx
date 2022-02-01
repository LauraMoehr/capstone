import Confetti from "react-confetti"
import styled from "styled-components"

export default function Results({ game, sortedResults }) {
  const { roomName, disciplines, weather, players } = game

  return (
    <>
      <Confetti />
      <ResultsPosition>
        {players &&
          sortedResults &&
          sortedResults.length === players.length &&
          sortedResults.map((player, index) => {
            if (index == 0) {
              return <Large key={index}>The {player.animal} won!🏆</Large>
            } else if (index == 1) {
              return <p key={index}>The {player.animal} was rated Second.</p>
            } else {
              return <p key={index}>The {player.animal} wasn't so lucky this time.</p>
            }
          })}
      </ResultsPosition>
    </>
  )
}

const Large = styled.p`
  font-size: 1.2rem;
  z-index: 999;
  padding: 5vh 0;
`
const ResultsPosition = styled.div`
  margin: 20vh 0;
`
