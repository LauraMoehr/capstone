import styled from "styled-components"

export default function Animals({ animals }) {
  // const getRandomIndex = (max) =>  Math.floor(Math.random() * max)
  // console.log(getRandomIndex(7));
  //get random animal from database
  //if 1 or more animals have been picked already: delete that one from the list of options
  //const isInList = animal => listOfAnimals.some(animal => listOfAnimals.id === animal.id)
  //const removeFromList = animal => listOfAnimals.filter((animal) => listOfAnimals.id !== animal.id)
  //const remainingAnimals = removeFromList(animal), setAnimals(remainingAnimals)

  return (
    <>
      <h3>Gallery of Animals</h3>
      <div>
        {animals.map(animal => (
          <CardStyle key={animal._id}>
            <article>
              <h4>{animal.name}</h4>
              <p>{animal.type}</p>
            </article>
          </CardStyle>
        ))}
      </div>
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
