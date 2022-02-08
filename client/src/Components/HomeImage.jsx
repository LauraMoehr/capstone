import rhinos from '../rhinos.jpg';
import styled from 'styled-components';

export default function HomeImage() {
  return (
    <>
      <H1Style>The Champion Of The Wild</H1Style>
    </>
  );
}
const H1Style = styled.h1`
  background-image: url(${rhinos});
  background-position: 80%;
  background-repeat: no-repeat;
  background-size: cover;
  color: var(--mediumbrown);
  font-family: 'Graduate', cursive;
  font-size: 3rem;
  font-weight: 700;
  height: 92vh;
  margin-top: 0;
  padding: 1rem 0.5rem 0 0.5rem;
  position: fixed;
  text-align: right;
  text-shadow: -2px 0 var(--beige), 0 2px var(--beige), 2px 0 var(--beige),
    0 -2px var(--beige);
  width: 100vw;
  z-index: 999;
`;
