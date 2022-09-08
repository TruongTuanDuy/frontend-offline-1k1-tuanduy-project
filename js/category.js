const featurePost = document.getElementById("feature-post");
const articles = document.getElementById("articles");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id);


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

// Articles
axios
  .get(
    `https://apiforlearning.zendvn.com/api/categories_news/${id}/articles?offset=0&limit=10&sort_by=id&sort_dir=desc`
  )
  .then(function (response) {
    // handle success

    const articleList = response.data;
    document.getElementById("page-heading").textContent = articleList[1].category.name;

    let articleItem = ``;
    for (var i = 0; i < articleList.length; i++) {
      articleItem += renderArticleItem(articleList[i]);
    }
    articles.innerHTML = articleItem;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

function renderArticleItem(item) {
  return `
  <div class="col-sm-6 p-r-25 p-r-15-sr991">
      <div class="m-b-45">
          <a href="${item.link}" class="wrap-pic-w hov1 trans-03">
              <img src="${item.thumb}" alt="IMG">
          </a>

          <div class="p-t-16">
              <h5 class="p-b-5">
                  <a href=href="${item.link}" class="f1-m-3 cl2 hov-cl10 trans-03">
                  ${item.title}
                  </a>
              </h5>

              <span class="cl8">
                  <a href="#" class="f1-s-4 cl8 hov-cl10 trans-03">${item.publish_date}</a>
                  <span class="f1-s-3 m-rl-3">-</span>
                  <span class="f1-s-3">Feb 18</span>
              </span>
          </div>
      </div>
  </div>`;
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
