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
h3, h4 {
    font-family: 'Graduate', cursive;
    font-weight: 500;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem
}
p {
    padding: 0 10vw;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem
}
img {
    width: 80vw;
    height: auto;
    margin: 6rem 0 0 0;
    object-fit: contain;
}
`
