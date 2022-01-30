import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
*, *::before, *::after {
    box-sizing: border-box;
}
:root {
    --oliv-day: #745E0F;
    --mediumbrown-day: #C36B1C;
    --lightbrown-day: #EC9836;
    --beige-day: #FEDBB2;
    --grass-day: #92B202; //raus?
}
body {
    margin: 0;
}
.App {
    min-height: 100vh;
    font-family: 'Righteous', cursive;
    font-weight: 100;
    text-align: center;
    overflow: scroll;
    color: var(--oliv-day);
    padding: 0 0 7vh 0;
    background: linear-gradient(0deg, rgba(236,152,54,1) 25%, rgba(251,209,160,1) 90%, rgba(254,219,178,1) 100%);
    background-attachment: fixed
}
main {
    margin-top: 15vh;
    margin-bottom: 5vh
}
h3 {
    font-family: 'Monoton', cursive;
    font-size: 1rem;
}
h4 {
    font-family: 'Graduate', cursive;
    font-weight: 500;
}
p {
    padding: 0 10vw;
}
img {
    width: 80vw;
    height: auto;
    margin: 6rem 0 0 0;
    object-fit: contain;
    transition: all 1s;
    &:hover {
    transform: rotateZ(360deg);}
}
`
