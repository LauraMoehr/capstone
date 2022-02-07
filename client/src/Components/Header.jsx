import styled from 'styled-components';

export default function Header() {
  return (
    <>
      <H2Style>The Champion Of The Wild</H2Style>
    </>
  );
}

const H2Style = styled.h2`
  background: linear-gradient(
    0deg,
    rgba(251, 209, 160, 1) 0%,
    rgba(254, 219, 178, 1) 100%
  );
  color: var(--mediumbrown);
  font-family: 'Graduate', cursive;
  font-size: 1.4rem;
  font-weight: 700;
  margin-top: 0;
  padding: 2rem 0 1rem 0;
  position: fixed;
  width: 100vw;
  z-index: 999;
`;
