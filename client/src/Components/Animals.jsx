import CardAnimal from "./CardAnimal"

export default function Animals(animals) {
  return (
    <>
      <h3>Gallery of Animals</h3>
      <CardAnimal animals={animals} />
      <p>
        <em>Animals to follow soon...</em>
      </p>
    </>
  )
}
