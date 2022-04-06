if (!localStorage.getItem("jokeMade")) {
  localStorage.setItem("jokeMade", "yesSir !");

  let cookie = document.createElement("div");
  cookie.classList.add("cookie-banner");
  cookie.innerHTML = `
    <div>
      Hey cookies ! La j'ai dis cookies et t'es en panic,<br />
      mais en vrai j'en ai rien a foutre de ces trucs !<br />
      Donc ce message sert juste a faire chier ! Merci !
    </div>
    <button class="cookie-btn">Ok ?</button>
  `;

  cookie.style += {
    width: "calc(100% - 20px * 2)",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    bottom: "10px",
    left: "0",
    right: "0",
    backgroundColor: "#fff",
    borderRadius: "20px",
    border: "5px solid var(--primary)",
    color: "var(--primary)",
  };

  document.body.appendChild(cookie);

  document.querySelector(".cookie-btn").addEventListener("click", () => {
    document.querySelector(".cookie-banner").style.display = "none";
  });
}
