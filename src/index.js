console.log("%c HI", "color: firebrick");
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
const imgDiv = document.querySelector("#dog-image-container");
const ul = document.querySelector("#dog-breeds");
const breedDropdown = document.querySelector("#breed-dropdown");
let dataKeys = [];

function appendToPage(breed) {
  let li = document.createElement("li");
  li.textContent = breed;
  ul.append(li);

  li.addEventListener("click", () => {
    li.style.color = "red";
  });
}

//1. fetch to imageUrl
fetch(imgUrl)
  //2. process the information with .then()
  .then((res) => res.json())
  //3. create an element with said infornation
  .then((data) => {
    data.message.forEach((img) => {
      let el = document.createElement("img");
      el.src = img;
      //4. append said element onto the page
      imgDiv.append(el);
    });
  });

//1. fetch to url
fetch(breedUrl)
  //2. process the information with .then()
  .then((res) => res.json())
  .then((data) => {
    //3. Get keys from data.message object
    //3a. Object.keys() returns an array of the object keys
    dataKeys = Object.keys(data.message);
    debugger
    dataKeys.forEach((breed) => appendToPage(breed));
  });

//Challenge 4
//1. add an eventlistener to <select>
breedDropdown.addEventListener("change", (e) => {
  //2. Clear the li from the current ul
  ul.textContent = "";

  //3. Get the value from the select
  let value = e.target.value;

  //4. callback filters out dogs based on select value
  let filteredArray = dataKeys.filter((breed) => value === breed[0]);

  //3. add those dogs to the page
  filteredArray.forEach((breed) => appendToPage(breed));
});


