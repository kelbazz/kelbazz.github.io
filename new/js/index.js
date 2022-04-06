if (!localStorage.getItem("jokeMade")) {
  localStorage.setItem("jokeMade", "yesSir !");

  document.querySelector("body") += `
  <div class="cookie-banner">
    <div>
      Hey cookies ! La j'ai dis cookies et t'es en panic,<br />
      mais en vrai j'en ai rien a foutre de ces trucs !<br />
      Donc ce message sert juste a faire chier ! Merci !
    </div>
    <button class="cookie-btn">Ok ?</button>
  </div>
  `

  document.querySelector(".cookie-btn").addEventListener("click", () => {
    document.querySelector(".cookie-banner").style.display = "none";
  })
}
