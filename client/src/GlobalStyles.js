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
    --grass-day: #92B202;
    /* reserved for possible dark mode later on:
    --oliv-night: #5B5028;
    --mediumbrown-night: #9A6D46;
    --lightbrown-night: #BE9463;
    --beige-night: #EBD9C5;
    --grass-night: #76862E; */
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
    padding: 7vh 0;
    background: linear-gradient(0deg, rgba(236,152,54,1) 25%, rgba(254,219,178,1) 100%);
    background-attachment: fixed
}
h1, h3 {
    font-family: 'Monoton', cursive;
    font-size: 1rem;
}
h2 {
    font-family: 'Graduate', cursive;
    font-size: 2rem;
    font-weight: 700;
    color: var(--mediumbrown-day);
    margin: 1rem 0;
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
    margin: 0.5rem 0;
    object-fit: contain;
}
input, button {
    font-family: 'Righteous', cursive;
}
button {
    background-color: var(--lightbrown-day);
    border: 3px solid var(--mediumbrown-day);
    margin: 5px;
}
.inactive { //kann weg! TODO in App.jsx
    color: var(--oliv-day);
    display: block;
    text-align: center;
    margin: 0.5rem 0;
}
.active { //kann weg! TODO in App.jsx
    color: var(--mediumbrown-day);
    text-decoration: none;
    display: block;
    text-align: center;
    margin: 0.5rem 0;
}
`
