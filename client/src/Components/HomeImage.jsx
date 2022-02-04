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
  background-repeat: no-repeat;
  background-size: cover;
  color: var(--mediumbrown-day);
  font-family: 'Graduate', cursive;
  font-size: 3rem;
  font-weight: 700;
  height: 92vh;
  margin-top: 0;
  padding: 4rem 2rem 0 2rem;
  position: fixed;
  width: 100vw;
  z-index: 999;
`;
