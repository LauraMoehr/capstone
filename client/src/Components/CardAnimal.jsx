import { useEffect, useState } from 'react';

export default function Card() {
    //const [animals, setAnimals] = useState(loadFromDatabase);
    //useEffect(() => saveToDatabase())
    function getRandomIndex(max) {
        return Math.floor(Math.random() * max);
    }
    console.log(getRandomIndex(7));
    //get random animal from database
    //if 1 or more animals have been picked already: delete that one from the list of options
    
    const isInList = animal => listOfAnimals.some(animal => listOfAnimals.id === animal.id)
    const removeFromList = animal => listOfAnimals.filter((animal) => listOfAnimals.id !== animal.id)
    const remainingAnimals = removeFromList(animal)
        setAnimals(remainingAnimals)
    }
    return (
        <>
            <Card>
            <article key={index}>
                <h3>{animal.name}</h3>
                <p>{animal.type}</p>
            </article>
            </Card>
        </>
    )
}
