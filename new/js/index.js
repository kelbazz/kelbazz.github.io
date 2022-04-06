if (!localStorage.getItem("jokeMade")) {
  localStorage.setItem("jokeMade", "yesSir !");

  document.querySelector("body") += `
  <div></div>
  `
}
