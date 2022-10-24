const article = document.getElementById("article");
const heart = document.getElementsByClassName("heart");
const postComment = document.getElementById("btn-post-comment");
const introComment = document.getElementById("intro-comment");
const inputMsg = document.getElementById("msg");
const inputName = document.getElementById("name");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const idString = id.toString();
let favorite = loadStorage('favorite');
let comments = loadStorage('comments') || {};
let commentId = "";

let commentArticle = comments.filter(ele => ele.article_id === id);
commentArticle.forEach(comment => {
  console.log(comment.parent_id);
  if (comment.parent_id) {
    // Cap 2
    let htmlChildComment = renderCommentItem(comment, false);
    document.querySelector(`#comment-item-${comment.parent_id} .reply-list`).innerHTML += htmlChildComment;
  } else {
    // Cap 1
    let htmlComment = renderCommentItem(comment);
    document.querySelector('.comment-list').innerHTML += htmlComment;
  }
});

document.addEventListener('click', function (e) {
  const ele = e.target;
  if (ele.id === "reply-close") {
    introComment.innerHTML = "";
    commentId = "";
  }
});

// Post comment
postComment.addEventListener('click', function (e) {
  e.preventDefault();
  const name = inputName.value;
  const message = inputMsg.value;
  const newComment = {
    article_id: id,
    comment_id: createId(6),
    name: name,
    message: message,
    parent_id: null || commentId,
    time: new Date()
  }
  console.log(newComment.parent_id);
  if ((name) && (message)) {
    if (comments) comments.push(newComment)
    else comments = newComment;
    saveStorage('comments', comments);

    if (newComment.parent_id) {
      // Cap 2
      const htmlChildComment = renderCommentItem(newComment, false);
      document.querySelector(`#comment-item-${newComment.parent_id} .reply-list`).innerHTML += htmlChildComment;
    } else {
      // Cap 1
      const htmlComment = renderCommentItem(newComment);
      document.querySelector('.comment-list').innerHTML += htmlComment;
    }

    inputMsg.focus();
    inputMsg.value = '';
  }
});

// Post Reply
document.addEventListener('click', function (e) {
  const ele = e.target;
  if (ele.className === "btn-reply") {
    commentId = ele.id.substr(-6, 6);
    console.log(commentId);
    let replyComment = comments.filter(element => element.comment_id === commentId);
    console.log(replyComment);
    introComment.innerHTML = `<h3 class="f1-s-13 cl8 p-b-40" id="${replyComment[0].comment_id}">
    <button><i class="far fa-window-close" id="reply-close"></i></button>
    Trả lời bình luận của ${replyComment[0].name}:</h3>`
    inputMsg.focus();
  }
})

// RENDER COMMENT
function renderCommentItem(comment, isParent = true) {
  const replyList = isParent ? '<div class="reply-list"></div>' : '';
  return `
  <div class="item" id="comment-item-${comment.comment_id}">
    <div class="user">
      <figure><img src="images/icons/IMG_20190713_195112.jpg"></figure>
      <div class="details">
        <h5 class="name">${comment.name}</h5>
        <div class="time">${comment.time}</div>
        <div class="description">${comment.message}</div>
        <footer><a href="#" class="btn-reply" id="reply-item-${comment.comment_id}">Reply</a></footer>
      </div>
    </div>
    ${replyList}
  </div>
  `}


// Content
axios
  .get(
    `https://apiforlearning.zendvn.com/api/articles/${id}`
  )
  .then(function (response) {
    // console.log(response);
    // handle success

    const articleContent = response.data;

    // let currentTime = new Date().getTime()
    // let publishTime = new Date(articleContent.publish_date).getTime();
    var time = dayjs(articleContent.publish_date).fromNow();

    document.getElementById("category").innerHTML = articleContent.category.name;
    document.getElementById("category").href = `category.html?id=${articleContent.category.id}`;
    document.getElementById("article-title").innerHTML = articleContent.title;

    // <div class="p-b-70" id="article">
    let content = `
      <a href="#" class="f1-s-10 cl2 hov-cl10 trans-03 text-uppercase">
      ${articleContent.category.name}
    </a>

    <h3 class="f1-l-3 cl2 p-b-16 p-t-33 respon2">
    ${articleContent.title}
    </h3>

    <div class="flex-wr-s-s p-b-40">
      <span class="f1-s-3 cl8 m-r-15">
        <a href="#" class="f1-s-4 cl8 hov-cl10 trans-03">
          by John Alvarado
        </a>

        <span class="m-rl-3">-</span>

        <span>
        ${time}
        </span>
      </span>

      <span class="f1-s-3 cl8 m-r-15">
        5239 Views
      </span>

      <a href="#" class="f1-s-3 cl8 hov-cl10 trans-03 m-r-15">
        0 Comment
      </a>
      <button><i style="color:lightgray" class="fas fa-heart heart"></i></button>
      <span class="number-heart">0000</span>
    </div>

    <div class="wrap-pic-max-w p-b-30">
      <img src="${articleContent.thumb}" alt="IMG">
    </div>

    <p class="f1-s-11 cl6 p-b-25">
    ${articleContent.content}
    </p>

    <!-- Tag -->
    <div class="flex-s-s p-t-12 p-b-15">
      <span class="f1-s-12 cl5 m-r-8">
        Tags:
      </span>

      <div class="flex-wr-s-s size-w-0">
        <a href="#" class="f1-s-12 cl8 hov-link1 m-r-15">
          Streetstyle
        </a>

        <a href="#" class="f1-s-12 cl8 hov-link1 m-r-15">
          Crafts
        </a>
      </div>
    </div>

    <!-- Share -->
    <div class="flex-s-s">
      <span class="f1-s-12 cl5 p-t-1 m-r-15">
        Share:
      </span>

      <div class="flex-wr-s-s size-w-0">
        <a href="#"
          class="dis-block f1-s-13 cl0 bg-facebook borad-3 p-tb-4 p-rl-18 hov-btn1 m-r-3 m-b-3 trans-03">
          <i class="fab fa-facebook-f m-r-7"></i>
          Facebook
        </a>

        <a href="#"
          class="dis-block f1-s-13 cl0 bg-twitter borad-3 p-tb-4 p-rl-18 hov-btn1 m-r-3 m-b-3 trans-03">
          <i class="fab fa-twitter m-r-7"></i>
          Twitter
        </a>

        <a href="#"
          class="dis-block f1-s-13 cl0 bg-google borad-3 p-tb-4 p-rl-18 hov-btn1 m-r-3 m-b-3 trans-03">
          <i class="fab fa-google-plus-g m-r-7"></i>
          Google+
        </a>

        <a href="#"
          class="dis-block f1-s-13 cl0 bg-pinterest borad-3 p-tb-4 p-rl-18 hov-btn1 m-r-3 m-b-3 trans-03">
          <i class="fab fa-pinterest-p m-r-7"></i>
          Pinterest
        </a>
      </div>
    </div>

`;
    article.innerHTML = content;
    if (favorite.includes(idString)) heart[0].style.color = "#17b978";
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

// LOVE HEART
document.addEventListener('click', function (e) {
  // e.preventDefault();
  const ele = e.target;
  if (ele.className === "fas fa-heart heart") {
    if (!favorite.includes(idString)) {
      ele.style.color = "#17b978"
      favorite.push(idString);
      saveStorage('favorite', favorite);
    }
    else {
      ele.style.color = "lightgray"
      favorite = favorite.filter(item => item !== idString)
      saveStorage('favorite', favorite);
    }
  }
})

function createId(length = 12) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function loadStorage(key) {
  let data = JSON.parse(localStorage.getItem(key));
  if (!data) data = [];
  return data;
}

function saveStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function addEventForMobileMenu() {
  try {
    $(".btn-show-menu-mobile").on("click", function () {
      $(this).toggleClass("is-active");
      $(".menu-mobile").slideToggle();
    });

    var arrowMainMenu = $(".arrow-main-menu-m");

    for (var i = 0; i < arrowMainMenu.length; i++) {
      $(arrowMainMenu[i]).on("click", function () {
        $(this).parent().find(".sub-menu-m").slideToggle();
        $(this).toggleClass("turn-arrow-main-menu-m");
      });
    }

    $(window).on("resize", function () {
      if ($(window).width() >= 992) {
        if ($(".menu-mobile").css("display") === "block") {
          $(".menu-mobile").css("display", "none");
          $(".btn-show-menu-mobile").toggleClass("is-active");
        }

        $(".sub-menu-m").each(function () {
          if ($(this).css("display") === "block") {
            $(this).css("display", "none");
            $(arrowMainMenu).removeClass("turn-arrow-main-menu-m");
          }
        });
      }
    });
  } catch (er) {
    console.log(er);
  }
}

// function millisecondsToStr(milliseconds) {
//   // TIP: to find current time in milliseconds, use:
//   // var  current_time_milliseconds = new Date().getTime();

//   function numberEnding(number) {
//     return (number > 1) ? 's' : '';
//   }

//   var temp = Math.floor(milliseconds / 1000);
//   var years = Math.floor(temp / 31536000);
//   if (years) {
//     return years + ' year' + numberEnding(years);
//   }
//   //TODO: Months! Maybe weeks?
//   var days = Math.floor((temp %= 31536000) / 86400);
//   if (days) {
//     return days + ' day' + numberEnding(days);
//   }
//   var hours = Math.floor((temp %= 86400) / 3600);
//   if (hours) {
//     return hours + ' hour' + numberEnding(hours);
//   }
//   var minutes = Math.floor((temp %= 3600) / 60);
//   if (minutes) {
//     return minutes + ' minute' + numberEnding(minutes);
//   }
//   var seconds = temp % 60;
//   if (seconds) {
//     return seconds + ' second' + numberEnding(seconds);
//   }
//   return 'less than a second'; //'just now' //or other string you like;
// }