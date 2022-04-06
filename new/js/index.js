if (!localStorage.getItem("jokeMade")) {
  localStorage.setItem("jokeMade", "yesSir !");

  let cookie = document.createElement("div");
  cookie.classList.add("cookie-banner");
  cookie.innerHTML = `
    <div>
      <img width="50px" class="no-style" src="./img/cookie.png">
      <span>
        Hey cookies ! La j'ai dis cookies et t'es en panic,<br />
        mais en vrai j'en ai rien a foutre de ces trucs !<br />
        Donc ce message sert juste a faire chier ! Merci !
      </span>
    </div>
    <button class="cookie-btn">Ok ?</button>
  `;

  document.body.appendChild(cookie);

  document.querySelector(".cookie-btn").addEventListener("click", () => {
    document.querySelector(".cookie-banner").style.display = "none";
  });
}
