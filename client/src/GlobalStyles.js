import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
*, *::before, *::after {
    box-sizing: border-box;
}
:root {
    --beige-day: #FEDBB2;
    --lightbrown-day: #EC9836;
    --mediumbrown-day: #C36B1C;
    --oliv-day: #745E0F;
}
body {
    margin: 0;
}
.App {
    background: linear-gradient(0deg, rgba(236,152,54,1) 25%, rgba(251,209,160,1) 90%, rgba(254,219,178,1) 100%);
    background-attachment: fixed;
    color: var(--oliv-day);
    font-family: 'Righteous', cursive;
    font-weight: 100;
    min-height: 100vh;
    overflow: scroll;
    padding: 0 0 7vh 0;
    text-align: center;
}
main {
    margin-bottom: 5vh;
    margin-top: 15vh;
}
h3, h4 {
    font-family: 'Graduate', cursive;
    font-weight: 500;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
}
p {
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    padding: 0 10vw;
}
img {
    height: auto;
    margin: 6rem 0 0 0;
    object-fit: contain;
    width: 80vw;
}
`
