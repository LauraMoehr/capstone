import { useEffect, useState } from "react"
import styled from "styled-components"

export default function Enter({ animals }) {
  let [count, setCount] = useState(0)
  const [messages, setMessages] = useState([])
  useEffect(() => subscribe(), [messages])

  //const hasNameMinLength = name => name.length > 0

  function submitMessage(event) {
    event.preventDefault()
    const value = event.target.message.value
    if (value) {
      fetch("/api/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: value }),
      })
    }
  }
  async function subscribe() {
    let response = await fetch("/api/subscribe")
    if (response.status == 502) {
      //Heroku reagiert auf 502, als wäre es 503
      setMessages([...messages, "Error happened – Timeout"])
    } else if (response.status == 503) {
      setMessages([...messages, "Error 503"])
    } else if (response.status != 200) {
      setMessages([...messages, "Error happened"])
      await new Promise(resolve => setTimeout(resolve, 1000))
    } else {
      let message = await response.text()
      setMessages([...messages, message])
    }
  }
  //if randomFromApi in chosenAnimals: zurück auf Los :)
  //const isInList = animal => listOfAnimals.some(animal => listOfAnimals.id === animal.id)
  //const removeFromList = animal => listOfAnimals.filter((animal) => listOfAnimals.id !== animal.id)
  //const remainingAnimals = removeFromList(animal), setAnimals(remainingAnimals)

  // const randomNum = max => Math.floor(Math.random() * max)
  // const randomIndex = animals.find((animal, index, animals) => index == randomNum(animals.length))

  const animals2 = [
    {
      name: "Beaver",
      type: "Beaverish",
    },
    {
      name: "WOLF",
      type: "capslock animal",
    },
  ]

  const chosenAnimals = []
  function getrandomAnimal(array) {
    const randomNum = max => Math.floor(Math.random() * max)
    let index_ = randomNum(array.length)
    // index_ = 0
    console.log(index_)
    // const randomItem = array.find((item, index, array) => index == index_)
    const randomItem = array[index_]
    if (typeof randomItem == "undefined") {
      return animals2[0]
    } else {
      chosenAnimals.push(randomItem)
      // console.log(randomItem) //mal object, mal undefined
      // console.log(typeof randomItem) //mal object, mal undefined
      return randomItem
    }
  }
  //console.log(getrandomAnimal(animals))
  console.log(animals)
  const animal = getrandomAnimal(animals2) //undefined
  console.log(animal)
  //console.log(typeof randomAnimal) //type object

  return (
    <>
      <form onSubmit={submitMessage}>
        <input type="text" name="message" placeholder="Enter name please" />
        <br />
        <button type="reset">Cancel</button>
        {/* if hasNameMinLength(input.message.value) {setCount...} and reset input form: value= {tagInput}; reset(input.value)? */}
        <button
          onClick={() => {
            setCount(count => count + 1)
          }}
        >
          Join Game
        </button>
      </form>
      <section>{messages.length > 0 ? <p>Hi, {messages[messages.length - 1]}!</p> : ""}</section>
      <p>Number of players: {count}</p>
      <p>Your Animal is the following:</p>
      {/* {animals.find((animal, index, animals) => {
        index ==
          Math.floor(Math.random() * animals.length)(
            <CardStyle key={animal._id}>
              <h4>{animal.name}</h4>
              <p>{animal.type}</p>
            </CardStyle>
          )
      })} */}
      <CardStyle animal={animal} key={animal._id}>
        <h4>{animal.name}</h4>
        <p>{animal.type}</p>
      </CardStyle>
    </>
  )
}

const CardStyle = styled.div`
  margin: 0.5rem 3rem;
  background-color: var(--beige-day);
  border: 2px solid var(--oliv-day);
  padding: 0.5em;
`
