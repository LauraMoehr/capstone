import Confetti from "react-confetti"
//npm install --save canvas-confetti
//import 'canvas-confetti'...
import styled from "styled-components"

export default function Results({ game, sortedResults }) {
  const { roomName, disciplines, weather, players } = game

  // confetti({
  //   particleCount: 100,
  //   spread: 70,
  //   origin: { y: 0.6 }
  // });

  return (
    <>
      <Confetti />
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
    </>
  )
}

const Large = styled.p`
  font-size: 1.2rem;
  z-index: 999;
  padding-top: 15vh;
`
