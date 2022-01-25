import styled from "styled-components"

export default function Header() {
  return (
    <>
      <H1Style>Animal Olympics</H1Style>
    </>
  )
}

const H1Style = styled.h1`
  font-family: "Graduate", cursive;
  font-size: 2rem;
  font-weight: 700;
  background: var(--beige-day);
  color: var(--mediumbrown-day);
  width: 100vw;
  position: fixed;
  margin-top: 0;
  padding: 2rem 0 1rem 0;
  border-bottom: 5px solid var(--oliv-day);
`
