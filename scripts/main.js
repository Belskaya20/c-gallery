const publishButton = document.querySelector('#post-publish');
const postModal = document.querySelector('.add-post-modal');
const buttonAddPhoto = document.querySelector('#add-photo');
const buttonFirstPost = document.querySelector('#add-first-post');
const bodyOverlay = document.querySelector('.body-overlay');
const postText = document.querySelector('#post-text');
const hashtags = document.querySelector('#post-hashtags');
const fileUpload = document.querySelector('#file-upload');
const stepOne = document.querySelector('.add-post-modal__step-1');
const stepTwo = document.querySelector('.add-post-modal__step-2');
const modalFooter = document.querySelector('.modal__footer');
const successMessage = document.querySelector('#alert-success');
const errorMessage = document.querySelector('#alert-fail');
const body = document.querySelector('body');
let uploadedPhoto = document.querySelector('#uploaded-photo');


buttonAddPhoto.addEventListener('click', addPost);
buttonFirstPost.addEventListener('click', addPost);

function addPost() {
  postModal.classList.add('active');
  body.classList.add('with-overlay');
  bodyOverlay.classList.add('active');
}

bodyOverlay.addEventListener('click', () => {
  postModal.classList.remove('active');
  bodyOverlay.classList.remove('active');
  body.classList.remove('with-overlay');
});

//добавление фото

fileUpload.addEventListener('change', () => {
  uploadedPhoto.src = URL.createObjectURL(fileUpload.files[0]);
})
fileUpload.addEventListener('click', () => {
  stepOne.classList.add('hidden');
  stepTwo.classList.remove('hidden');
  modalFooter.classList.remove('hidden');
});


//post запрос
publishButton.addEventListener('click', () => {
  const formData = new FormData();
  formData.append('text', postText.value);
  formData.append('image', fileUpload.files[0]);
  formData.append('tags', hashtags.value)

  fetch('https://c-gallery.polinashneider.space/api/v1/posts/', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc2MzIxNTU0LCJpYXQiOjE2NzE0ODMxNTQsImp0aSI6ImZiNTlmMGE0YTgyMDRkMjNiMGQ3YWE0MTA5YmIzZDY2IiwidXNlcl9pZCI6MzB9.4mRe6i_DxZLZtpdJfNsn7oR7HeMQYkXf2ucU9mDIRNE'
    },
  })

  .then((result) => {
    if (result.ok) {
      showSuccessMessage();
      postModal.classList.remove('active');
    }
  })
  .catch((error) => {
    showErrorMessage();
    console.log(error);
  })
  .finally(() => {
    fileUpload.value = '';
    hashtags.value = '';
    postText.value = '';
    uploadedPhoto.src = '';
  })
})

//показ уведомлений
function showSuccessMessage() {
setTimeout(() => {
  successMessage.remove();
}, 2000);
};

function showErrorMessage() {
setTimeout(() => {
  errorMessage.remove();
}, 2000);
};
