export default function CardAnimal({ animals }) {
  //const [animals, setAnimals] = useState(get all from database);
  // const getRandomIndex = (max) =>  Math.floor(Math.random() * max)
  // console.log(getRandomIndex(7));
  //get random animal from database
  //if 1 or more animals have been picked already: delete that one from the list of options
  //const isInList = animal => listOfAnimals.some(animal => listOfAnimals.id === animal.id)
  //const removeFromList = animal => listOfAnimals.filter((animal) => listOfAnimals.id !== animal.id)
  //const remainingAnimals = removeFromList(animal), setAnimals(remainingAnimals)
  return (
    <>
      {animals.map((animal, index) => (
        <CardStyle>
          <article key={index}>
            <h3>{animal.name}</h3>
            <p>{animal.type}</p>
          </article>
        </CardStyle>
      ))}
    </>
  )
}
