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

function loadPhoto() {
  fileUpload.addEventListener('change', () => {
    uploadedPhoto.src = URL.createObjectURL(fileUpload.files[0]);

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
  formData.append('image', fileUpload.files[0]);
  formData.append('tags', hashtags.value)

  const POST_URL = 'https://c-gallery.polinashneider.space/api/v1/posts/';
  const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc2MzIxNTU0LCJpYXQiOjE2NzE0ODMxNTQsImp0aSI6ImZiNTlmMGE0YTgyMDRkMjNiMGQ3YWE0MTA5YmIzZDY2IiwidXNlcl9pZCI6MzB9.4mRe6i_DxZLZtpdJfNsn7oR7HeMQYkXf2ucU9mDIRNE';


  fetch(POST_URL, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: TOKEN
    },
  })
    .then((result) => {
      if (result.status === 201) {
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
    })
})


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
const POST_URL2 = 'https://c-gallery.polinashneider.space/api/v1/posts/';
const TOKEN2 = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc2MzIxNTU0LCJpYXQiOjE2NzE0ODMxNTQsImp0aSI6ImZiNTlmMGE0YTgyMDRkMjNiMGQ3YWE0MTA5YmIzZDY2IiwidXNlcl9pZCI6MzB9.4mRe6i_DxZLZtpdJfNsn7oR7HeMQYkXf2ucU9mDIRNE';


fetch(POST_URL2, {
  method: 'GET',
  headers: {
    Authorization: TOKEN2
  },
})

  .then((result) => {
    if (result.status === 200) {
      return result.json();
    }
  })

  .then((obj) => {
    if (obj) {
      photoCount.append(data.length);
      obj.forEach((content) => {
        const elementHTML = createElement(content.image, content.text, content.tags, content.created_at);
        photoContent.append(elementHTML);
      })
    } else {
      emptyContent.classList.remove('hidden');
    }
    return obj;
  })

const createElement = (photoURL, textURL, hashtagsURL, created_at) => {
  const clonPost = postTemplate.content.firstElementChild.cloneNode(true);
  const imgElement = document.createElement('img');
  imgElement.src = photoURL;
  const postDiv = document.createElement('div');
  postDiv.className = 'post';
  postDiv.append(imgElement);
  postDiv.remove(clonPost);

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
    accountTime.append(date);

    bodyOverlay.addEventListener('click', () => {
      previewPostModal.classList.remove('active');
      bodyOverlay.classList.remove('active');
      body.classList.remove('with-overlay');
    });
  })

  return postDiv;
}



//week 3 //delete
let postId = null;
const statisticsLikes = document.querySelector('.statistics__likes');
let likeNum = null;
let nowPost = null;
const commentsButton = document.querySelector('.comments-button');
let commentsNum = null;
let postsOverlay = null;
const postComment = document.querySelector('#post-comment');
const postCommentsCounter = document.querySelector('.statistics__comments');
const commentsContent = document.querySelector('.comments__content');
const commentTemplate = document.querySelector('#comment-template');

async function deletePost() {
  const POST_DELETE = POST_URL2 + `${postId}`;

  try {
    fetch(POST_DELETE, {
      method: 'DELETE',
      headers: {
        Authorization: TOKEN2
      },
    });

    if (response.status === 204) {
      showSuccessMessage(true, 'Пост удален');
      closeModal();
    } else {
      showErrorMessage(false, `Ошибка ${response.status}`, 'Не удалось удалить пост');
    }
  } catch (error) {
    showErrorMessage(false, `${error}`, 'Не удалось удалить пост');

  } finally {
    closeModal();
  }
}

//likes
async function sendLike() {
  const LIKE = POST_URL2 + `${postId}/like/`;
  try {
    fetch(LIKE, {
      method: 'POST',
      headers: {
        Authorization: TOKEN2
      },
    });

    if (response.ok) {
      statisticsLikes.classList.add('liked');
      likeNum += 1;
      showLikes();
    } else {
      showErrorMessage(false, `Ошибка ${response.status}`, 'Не удалось поставить лайк');
    }
  } catch (error) {
    showErrorMessage(false, `${error}`, 'Не удалось поставить лайк');
  }
}

function showLikes() {
  statisticsLikes.querySelector('span').textContent = likeNum;
  nowPost.querySelector('.likes span').textContent = likeNum;
}

//comments
postComment.addEventListener('keydown', sendCommendEnter);
commentsButton.addEventListener('click', sendComment);

function sendCommendEnter(event) {
  if (event.key === 'Enter') {
    sendComment();
  }
}

async function sendComment() {
  if (!postComment.value) {
    return;
  }

  const COMMENT = POST_URL2 + 'comments/';
  const data = JSON.stringify({
    'text': postComment.value,
    'post': postId
  });

  try {
    const response = await fetch(COMMENT, {
      method: "POST",
      body: data,
      headers: {
        Authorization: TOKEN2,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201) {
      commentsNum += 1;
      showCommentsNum();
    } else {
      showErrorMessage(false, `Ошибка ${response.status}`, 'Не удалось добавить комментарий');
    }
  } catch (error) {
    showErrorMessage(false, `${error}`, 'Не удалось добавить комментарий');
  } finally {
    clearInput();
  }
};
function clearInput() {
  commentInput.value = '';
}

function showCommentsNum() {
  postCommentsCounter.querySelector('span').textContent = commentsNum;
  postsOverlay.querySelector('.comments span').textContent = commentsNum;
}
