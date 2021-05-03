const drawImg = (src: string, id: string) => {
  const img = document.createElement('img');

  img.setAttribute('src', src);
  img.setAttribute('id', id);

  img.style.cssText = `   
        position: absolute;FFF
        zIndex: 9998;
        top: -80px;
        left: 50%;
        transform: translate(-50%, 0);
        margin: auto;
        opacity: 0.3;
        display: none;
        width: 720px;
    `;
  document.body.appendChild(img);

  img.addEventListener('click', () => {
    img.style.display = 'none';
  });
};

const drawBtn = (text: string, indent: number) => {
  const btn = document.createElement('button');

  btn.style.cssText = `   
        position: fixed;
        z-index: 9999;
        color: #fff;
        background-color: #0d73fc;
        padding: 15px 30px;
        bottom: 50px;
        right: ${indent}px;
        border-radius: 15px;
        border: 0px;
    `;

  btn.textContent = text;

  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    const elem = document?.getElementById(text);
    if (elem !== undefined && elem !== null) {
      elem.style.display = 'block';
    }
  });

  return btn.offsetWidth + 25;
};

export const lib = (): void => {
  const script = document?.getElementById('pixelPerfectLib');
  if (script !== null && script !== undefined) {
    const arrImgs = script.getAttribute('data-src-to-imgs')?.split(',');
    const arrBtnsDescription = script
      .getAttribute('data-btns-description')
      ?.split(',');
    const enabledLayotId = script.getAttribute('data-enabled-layot');
    let indent = 25;

    document.body.style.position = 'response';
    document.body.style.zIndex = '1';

    if (
      arrImgs !== null &&
      arrImgs !== undefined &&
      arrBtnsDescription !== null &&
      arrBtnsDescription !== undefined
    ) {
      arrImgs.forEach((item, index) => {
        drawImg(item, arrBtnsDescription[index]);
      });

      arrBtnsDescription.forEach((item) => {
        indent += drawBtn(item, indent);
      });

      if (enabledLayotId) {
        const enabledLayotElem = document?.getElementById(enabledLayotId);
        if (enabledLayotElem !== null && enabledLayotElem !== undefined) {
          enabledLayotElem.style.display = 'block';
        }
      }
    }
  }
};
