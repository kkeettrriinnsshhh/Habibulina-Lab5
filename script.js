
const modelViewer = document.querySelector('#cat-model');

// Полоска загрузки 3D-модели
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');

  if (!progressBar || !updatingBar) return;

  updatingBar.style.width =
    `${event.detail.totalProgress * 100}%`;

  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};

modelViewer.addEventListener('progress', onProgress);

// Проверяем, что модель загружена
let modelReady = false;

modelViewer.addEventListener('load', () => {
  modelReady = true;

  console.log(
    'Доступные анимации:',
    modelViewer.availableAnimations
  );

  if (modelViewer.availableAnimations.includes('Walk')) {
    modelViewer.animationName = 'Walk';
  } else if (modelViewer.availableAnimations.length > 0) {
    modelViewer.animationName =
      modelViewer.availableAnimations[0];
  }
});

// Кнопка «Запустить»
document.querySelector('#play-animation')
  .addEventListener('click', () => {
    if (!modelReady) return;

    modelViewer.play();
  });

// Кнопка «Остановить»
document.querySelector('#pause-animation')
  .addEventListener('click', () => {
    if (!modelReady) return;

    modelViewer.pause();
  });

// Кнопка «Повторить»
document.querySelector('#restart-animation')
  .addEventListener('click', () => {
    if (!modelReady) return;

    modelViewer.currentTime = 0;
    modelViewer.play();
  });
