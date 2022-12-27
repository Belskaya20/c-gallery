
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
const textarea = document.querySelectorAll('textarea');
const body = document.querySelector('body');
let uploadedPhoto = document.querySelector('#uploaded-photo');
let file = null;

buttonAddPhoto.addEventListener('click', addPost);
buttonFirstPost.addEventListener('click', addPost);

function addPost() {
  postModal.classList.add('active');
  body.classList.add('with-overlay');
  bodyOverlay.classList.add('active');
  fileUpload.accept = '.png, .jpg, .jpeg';
}

bodyOverlay.addEventListener('click', () => {
  postModal.classList.remove('active');
  bodyOverlay.classList.remove('active');
  body.classList.remove('with-overlay');
});

//добавление фото
function loadPhoto() {
  fileUpload.addEventListener('change', () => {
    file = fileUpload.files[0];
    uploadedPhoto.src = URL.createObjectURL(file);

    stepOne.classList.add('hidden');
    stepTwo.classList.remove('hidden');
    stepTwo.classList.add('active');
    modalFooter.classList.remove('hidden');
  })
}
loadPhoto();


//post запрос
publishButton.addEventListener('click', () => {
  const formData = new FormData();
  formData.append('text', postText.value);
  formData.append('image', file);
  formData.append('tags', hashtags.value);



  //показ уведомлений
function showSuccessMessage() {
  const successMessage = document.querySelector('#alert-success');
  const clon = successMessage.content.firstElementChild.cloneNode(true);
  document.body.appendChild(clon);

  setTimeout(() => {
      clon.remove();
  }, 2000);

};

function showErrorMessage() {
  const errorMessage = document.querySelector('#alert-fail');
  const clon = errorMessage.content.firstElementChild.cloneNode(true);
  document.body.appendChild(clon);

  setTimeout(() => {
      clon.remove();
  }, 2000);

};

const PostUrl = 'https://c-gallery.polinashneider.space/api/v1/posts/';
const Token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc2MzIxNTU0LCJpYXQiOjE2NzE0ODMxNTQsImp0aSI6ImZiNTlmMGE0YTgyMDRkMjNiMGQ3YWE0MTA5YmIzZDY2IiwidXNlcl9pZCI6MzB9.4mRe6i_DxZLZtpdJfNsn7oR7HeMQYkXf2ucU9mDIRNE';


  fetch( PostUrl, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: Token
    },
  })

    .then((result) => {
      if (result.status === 201) {
        postModal.classList.remove('active');
        bodyOverlay.classList.remove('active');
        body.classList.remove('with-overlay');
        successMessage.textContent = 'Успешно!'
        showSuccessMessage(successMessage);
        closeModal(postModal);
        hideOverlay();
      }
    })
    .catch((error) => {
      error.textContent = 'Ошибка!'
      showErrorMessage();
      closeModal(postModal);
      hideOverlay();
    })
    .finally(() => {
      fileUpload.value = '';
      hashtags.value = '';
      postText.value = '';
      uploadedPhoto.src = '';
      textarea.value = '';
    })
})

function hideOverlay() {
  body.classList.remove('with-overlay');
  bodyOverlay.classList.remove('active');
}

function closeModal(postModal) {
  postModal.classList.remove('active');
}




//week2
const photoCount = document.querySelector('#photo-count');
const emptyContent = document.querySelector('.empty-content');
const photoContent = document.querySelector('.photos__content');
const postTemplate = document.querySelector('#post-template');
const previewPostModal = document.querySelector('.preview-post-modal');
const PostsUrl = 'https://c-gallery.polinashneider.space/api/v1/users/me/posts';
const Token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc2MzIxNTU0LCJpYXQiOjE2NzE0ODMxNTQsImp0aSI6ImZiNTlmMGE0YTgyMDRkMjNiMGQ3YWE0MTA5YmIzZDY2IiwidXNlcl9pZCI6MzB9.4mRe6i_DxZLZtpdJfNsn7oR7HeMQYkXf2ucU9mDIRNE';

fetch(PostsUrl, {
  method: 'GET',
  headers: {
    Authorization: Token
  },
})

  .then((result) => {
    if (result.status === 200) {
      return result.json();
    }
  })
  .then((data) => {
    if (data) {
        photoCount.append(data.length);
        data.forEach((content) => {
            const elementHTML = createElement(content.image, content.text, content.tags, content.created_at);
            photoContent.append(elementHTML);                  
        })
    } else {
        emptyContent.classList.remove('hidden'); 
    }
})
const createElement = (photoURL, textURL, hashtagsURL, created_at) => {
  const clonPost = postTemplate.content.firstElementChild.cloneNode(true);
  const imgElement = document.createElement('img');
  imgElement.src = photoURL;
  const postDiv = document.createElement('div');
  postDiv.className = 'post';
  postDiv.append(imgElement);
  postDiv.append(clonPost);

  postDiv.addEventListener('click', () => {

      previewPostModal.classList.add('active');
      body.classList.add('with-overlay');
      bodyOverlay.classList.add('active');
      
      const postPhoto = document.querySelector('#post-photo');
      postPhoto.src = photoURL;

      postText.textContent = textURL;
      
      const hashtags = document.createElement('a');
      hashtags.textContent = hashtagsURL;
      hashtags.append(hashtagsURL);

      const accountTime = document.querySelector('.account-info__time');
      const date = created_at;
      accountTime.append(date);//date

      bodyOverlay.addEventListener('click', () => {
          previewPostModal.classList.remove('active');
          bodyOverlay.classList.remove('active');
          body.classList.remove('with-overlay');
      });
  })

  return postDiv;
}
