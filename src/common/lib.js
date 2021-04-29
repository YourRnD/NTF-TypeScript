const drawImg = (src, id) => {
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

  img.addEventListener('click', (e) => {
    e.currentTarget.style.display = 'none';
  });
};

const drawBtn = (text, indent) => {
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
    document.getElementById(text).style.display = 'block';
  });

  return btn.offsetWidth + 25;
};

export const lib = () => {
  const script = document.getElementById('pixelPerfectLib');
  const arrImgs = script.getAttribute('data-src-to-imgs').split(',');
  const arrBtnsDescription = script
    .getAttribute('data-btns-description')
    .split(',');
  const enabledLayotId = script.getAttribute('data-enabled-layot');
  let indent = 25;

  document.body.style.position = 'response';
  document.body.style.zIndex = '1';

  arrImgs.forEach((item, index) => {
    drawImg(item, arrBtnsDescription[index]);
  });

  arrBtnsDescription.forEach((item) => {
    indent += drawBtn(item, indent);
  });

  if (enabledLayotId) {
    document.getElementById(enabledLayotId).style.display = 'block';
  }
};
