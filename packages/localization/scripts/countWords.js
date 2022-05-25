const json = require("../src/locales/en/.ignore.json");

let count = 0;
Object.keys(json).forEach(key => {
  if (typeof json[key] === "string") count += json[key].split(" ").length;
});

console.log(count);

{
  /*
.ignore 520
component 18
dappy 266
vault 29
view 26
foundation 120
*/
}
