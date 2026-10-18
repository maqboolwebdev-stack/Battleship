// src/index.js
import "./styles.css";
import catImage from "./images.jpeg";
import { greeting } from "./greeting.js";

const image = document.createElement("img");
image.src = catImage;

document.body.appendChild(image);
console.log(greeting);
