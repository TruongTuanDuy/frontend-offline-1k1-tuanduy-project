const featurePost = document.getElementById("feature-post");
const mainMenuDesktop = document.getElementById("main-menu-desktop");
const mainMenuMobile = document.getElementById("main-menu-mobile");
const article = document.getElementById("article");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");



// Top Articles
axios
  .get("https://apiforlearning.zendvn.com/api/articles/top-articles?limit=6")
  .then(function (response) {
    // handle success
    const featuresList = response.data;
    let feature = ``;
    for (var i = 0; i < featuresList.length; i++) {
      const categoryLink = "category.html?id=" + featuresList[i].category_id;
      const detailLink = "detail.html?id=" + featuresList[i].id;
      feature += `
      <div class="col-sm-6 col-lg-4 p-rl-1 p-b-2">
        <div class="bg-img1 size-a-12 how1 pos-relative" style="background-image: url(${featuresList[i].thumb})">
          <a href="${detailLink}" class="dis-block how1-child1 trans-03"></a>

          <div class="flex-col-e-s s-full p-rl-25 p-tb-11">
            <a href="${categoryLink}" class="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2">${featuresList[i].category.name}</a>

            <h3 class="how1-child2 m-t-10">
              <a href="${detailLink}" class="f1-m-1 cl0 hov-cl10 trans-03">${featuresList[i].title}</a>
            </h3>
          </div>
        </div>
      </div>`;
    }
    featurePost.innerHTML = feature;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

// Menu Desktop
axios
  .get(
    "https://apiforlearning.zendvn.com/api/categories_news?offset=0&limit=20"
  )
  .then(function (response) {
    // handle success
    const catagories = response.data;
    let category = ``;
    let categoryOther = ``;
    let categoryOtherMobile = ``;
    for (var i = 0; i < catagories.length; i++) {
      const categoryLink = "category.html?id=" + catagories[i].id;
      if (i < 3) {
        category += `<li><a href="${categoryLink}">${catagories[i].name}</a></li>`;
      } else {
        categoryOther += `<li><a href="${categoryLink}">${catagories[i].name}</a></li>`;
      }
    }

    if (categoryOther) {
      categoryOtherMobile = `
    <li>
      <a href="#">Danh mục khác</a>
      <ul class="sub-menu-m">
        ${categoryOther}
      </ul>
      <span class="arrow-main-menu-m">
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </span>
    </li>`;
      categoryOther = `
    <li>
      <a href="#">Danh mục khác&nbsp;<i class="fas fa-angle-down"></i></a>
      <ul class="sub-menu">
        ${categoryOther}
      </ul>
    </li>`;
    }
    mainMenuDesktop.innerHTML = category + categoryOther;
    mainMenuMobile.innerHTML = category + categoryOtherMobile;

    addEventForMobileMenu();
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

// Content
axios
  .get(
    `https://apiforlearning.zendvn.com/api/articles/${id}`
  )
  .then(function (response) {
    // handle success

    const articleContent = response.data;

    let currentTime = new Date().getTime()
    let publishTime = new Date(articleContent.publish_date).getTime();
    var time = millisecondsToStr(currentTime - publishTime);

    let content = `<div class="p-b-70" id="article">
    <a href="#" class="f1-s-10 cl2 hov-cl10 trans-03 text-uppercase">${articleContent.category.name}</a>
    <h3 class="f1-l-3 cl2 p-b-16 p-t-33 respon2">${articleContent.title}</h3>
    <div class="flex-wr-s-s p-b-40">
      <span class="f1-s-3 cl8 m-r-15">
        <a href="#" class="f1-s-4 cl8 hov-cl10 trans-03">by John Alvarado</a>
        <span class="m-rl-3">-</span>
        <span>${time}</span>
      </span>
      <span class="f1-s-3 cl8 m-r-15">5239 Views</span>
      <a href="#" class="f1-s-3 cl8 hov-cl10 trans-03 m-r-15">0 Comment</a>
    </div>
    <div class="wrap-pic-max-w p-b-30"><img src="${articleContent.thumb}"></div>
    <p class="f1-s-11 cl6 p-b-25">${articleContent.content}</p>

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
  </div>
`;

    article.innerHTML = content;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

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

function millisecondsToStr(milliseconds) {
  // TIP: to find current time in milliseconds, use:
  // var  current_time_milliseconds = new Date().getTime();

  function numberEnding(number) {
    return (number > 1) ? 's' : '';
  }

  var temp = Math.floor(milliseconds / 1000);
  var years = Math.floor(temp / 31536000);
  if (years) {
    return years + ' year' + numberEnding(years);
  }
  //TODO: Months! Maybe weeks? 
  var days = Math.floor((temp %= 31536000) / 86400);
  if (days) {
    return days + ' day' + numberEnding(days);
  }
  var hours = Math.floor((temp %= 86400) / 3600);
  if (hours) {
    return hours + ' hour' + numberEnding(hours);
  }
  var minutes = Math.floor((temp %= 3600) / 60);
  if (minutes) {
    return minutes + ' minute' + numberEnding(minutes);
  }
  var seconds = temp % 60;
  if (seconds) {
    return seconds + ' second' + numberEnding(seconds);
  }
  return 'less than a second'; //'just now' //or other string you like;
}