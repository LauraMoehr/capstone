import rhinos from "../rhinos.jpg"
import styled from "styled-components"

export default function HomeImage() {
  return (
    <>
      <H1Style>The Champion Of The Wild</H1Style>
    </>
  )
}
const H1Style = styled.h1`
  width: 100vw;
  height: 92vh;
  font-family: "Graduate", cursive;
  font-size: 3rem;
  font-weight: 700;
  color: var(--mediumbrown-day);
  position: fixed;
  margin-top: 0;
  padding: 4rem 2rem 0 2rem;
  z-index: 999;
  background-image: url(${rhinos});
  background-size: cover;
  background-repeat: no-repeat;
`
