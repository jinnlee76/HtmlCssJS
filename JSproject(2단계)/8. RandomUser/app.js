

const img = document.querySelector(".user-img");
const title = document.querySelector(".user-title");
const value = document.querySelector(".user-value");
const btn = document.querySelector(".btn");
const btns = [...document.querySelectorAll(".icon")];

const showUser = async () => {
  const person = await getUser();
  console.log(person);
  displayUser(person);
};

const URL = "https://randomuser.me/api/";

const getUser = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  // destructure
  const person = data.results[0];
  const { phone, email } = person;
  const { large: image } = person.picture;
  const {
    street: { number, name },
  } = person.location;
  const { password } = person.login;
  const { first, last } = person.name;
  const {
    dob: { age },
  } = person;

  return {
    phone,
    email,
    image,
    street: `${number} ${name}`,
    password,
    name: `${first} ${last}`,
    age,
  };
};


function displayUser(person) {
  img.src = person.image;
  value.textContent = person.name;
  title.textContent = `My name is `;
  btns.forEach((btn) => btn.classList.remove("active"));
  btns[0].classList.add("active");

  btns.forEach((btn) => {
    const label = btn.dataset.label;

    // btn.dataset.title = person[label];
    btn.addEventListener("click", () => {
      title.textContent = `My ${label} is `;
      value.textContent = person[label];
      btns.forEach((btn) => btn.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

window.addEventListener("DOMContentLoaded", showUser);
btn.addEventListener("click", showUser);