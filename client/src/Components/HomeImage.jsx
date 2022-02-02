import rhinos from "../rhinos.jpg"
import styled from "styled-components"

export default function HomeImage() {
  return (
    <>
      <ImageTitle src={rhinos}></ImageTitle>
    </>
  )
}

const ImageTitle = styled.img`
  width: 80vw;
  height: auto;
  margin: 6rem 0 0 0;
  object-fit: contain;
`
