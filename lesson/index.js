import { parseURL } from "./utils/url.js";
import { getPrice } from "./utils/price.js";
import { renderForm } from "./utils/form.js";
const options = parseURL();

fetch(`./prices.json`)
    .then((response) => response.json())
    .then((data) => getPrice(data, options))
    .then((price) => renderForm(price, options))
