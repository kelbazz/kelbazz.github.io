{
  /* Colors */

  document.querySelectorAll(".color-box").forEach((el) => {
    const colorName = el.dataset.colorName.replace(/\b\w/g, (l) => {
      return l.toUpperCase();
    });

    const color = getComputedStyle(el)
      .getPropertyValue("--bg")
      .trimStart()
      .toUpperCase();

    const content = `
    <b><i>${colorName}</i></b><br />
    ${color}
  `;

    el.addEventListener("click", () => {
      navigator.clipboard.writeText(color);
      el.innerHTML = "<i>Copied</i>";

      setTimeout(() => {
        el.innerHTML = content;
      }, 1000);
    });

    el.innerHTML = content;
  });
}

{
  /* Images */

  document.querySelectorAll(".img-box").forEach((el) => {
    const image = getComputedStyle(el).getPropertyValue("--bg").trimStart();

    const imagePath = {
      svg: image.replace(/url\("(.*\/.*)"\)/i, "$1"),
      png: image
        .replace(/url\("(.*\/.*)"\)/i, "$1")
        .replace("svg", "img")
        .replace(".svg", ".png"),
    };
    const imageName = imagePath.svg
      .replace(/(?:.+\/)?(.+?)\..+/g, "$1")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => {
        return l.toUpperCase();
      });
    const image_name = imageName.replace(/ /g, "_").toLowerCase();

    console.log({ imagePath, imageName, image_name });

    el.innerHTML = `
    <b><i>${imageName}</i></b>

    <div class="img-dl-box">
      <a href="${imagePath.png}" download="${
      image_name + ".png"
    }" style="--i: .1s"><button>png</button></a>
      <a href="${imagePath.svg}" download="${
      image_name + ".svg"
    }" style="--i: .0s"><button>svg</button></a>
    </div>
  `;
  });
}
