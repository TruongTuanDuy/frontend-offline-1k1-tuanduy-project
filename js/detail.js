const article = document.getElementById("article");
const postComment = document.getElementById("btn-post-comment");
const heart = document.getElementsByClassName("heart");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

let original = loadStorage();
let idString = id.toString();


// Post comment
document.postComment.addEventListener('click', function (e) {
  // e.preventDefault();
  const ele = e.target;
  console.log(ele.id);
  //   if (ele.className === "fas fa-heart heart") {
  //     if (!original.includes(idString)) {
  //       ele.style.color = "#17b978"
  //       original.push(idString);
  //       saveStorage(original);
  //     }
  //     else {
  //       ele.style.color = "lightgray"
  //       original = original.filter(item => item !== idString)
  //       saveStorage(original);
  //     }
  //   }
})


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
    if (original.includes(idString)) heart[0].style.color = "#17b978";
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

// LOVE HEART
document.addEventListener('click', function (e) {
  // e.preventDefault();
  const ele = e.target;
  console.log(ele.className);
  if (ele.className === "fas fa-heart heart") {
    if (!original.includes(idString)) {
      ele.style.color = "#17b978"
      original.push(idString);
      saveStorage(original);
    }
    else {
      ele.style.color = "lightgray"
      original = original.filter(item => item !== idString)
      saveStorage(original);
    }
  }
})

function loadStorage() {
  let data = JSON.parse(localStorage.getItem('favorite'));
  if (!data) data = [];
  return data;
}

function saveStorage(data) {
  localStorage.setItem('favorite', JSON.stringify(data));
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