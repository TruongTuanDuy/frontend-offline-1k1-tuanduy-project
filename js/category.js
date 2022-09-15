const featurePost = document.getElementById("feature-post");
const articles = document.getElementById("articles");
const category = document.getElementById("category");
const title = document.getElementById("title");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Search
document.getElementById('btn-search').addEventListener('click', function () {
  const keyword = document.getElementById("input-search").value;
  console.log(keyword);
  window.location.href = 'search.html?keyword=' + keyword;
})

document.getElementById("input-search").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btn-search").click();
  }
});


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

let paraOffset = 0;
let paraLimit = 4;
loadArticle(paraOffset, paraLimit);

document.getElementById('btn-page-prev').addEventListener('click', function () {
  paraOffset -= paraLimit;
  loadArticle(paraOffset, paraLimit);
})

document.getElementById('btn-page-next').addEventListener('click', function () {
  paraOffset += paraLimit;
  if (document.querySelector('.pagi-active').nextElementSibling.id == 'btn-page-next') {
    document.getElementById('btn-page-one').innerHTML = parseInt(document.getElementById('btn-page-one').textContent) + 3;
    document.getElementById('btn-page-two').innerHTML = parseInt(document.getElementById('btn-page-two').textContent) + 3;
    document.getElementById('btn-page-three').innerHTML = parseInt(document.getElementById('btn-page-three').textContent) + 3;
    document.querySelector('.pagi-active').classList.remove('pagi-active');
    document.getElementById('btn-page-one').classList.add('pagi-active');
    console.log(paraOffset);
  };
  document.querySelector('.pagi-active').nextElementSibling.classList.add('pagi-active');
  document.querySelector('.pagi-active').classList.remove('pagi-active');
  loadArticle(paraOffset, paraLimit);
})

document.getElementById('btn-page-one').addEventListener('click', function () {
  paraOffset = paraLimit * 0;
  document.querySelector('.pagi-active').classList.remove('pagi-active');
  document.getElementById('btn-page-one').classList.add('pagi-active');
  loadArticle(paraOffset, paraLimit);
})

document.getElementById('btn-page-two').addEventListener('click', function () {
  paraOffset = paraLimit * 1;
  document.querySelector('.pagi-active').classList.remove('pagi-active');
  document.getElementById('btn-page-two').classList.add('pagi-active');
  loadArticle(paraOffset, paraLimit);
})

document.getElementById('btn-page-three').addEventListener('click', function () {
  paraOffset = paraLimit * 2;
  document.querySelector('.pagi-active').classList.remove('pagi-active');
  document.getElementById('btn-page-three').classList.add('pagi-active');
  loadArticle(paraOffset, paraLimit);
})


function loadArticle(offset, limit) {
  // Articles
  axios
    .get(
      `https://apiforlearning.zendvn.com/api/categories_news/${id}/articles?offset=${offset}&limit=${limit}&sort_by=id&sort_dir=desc`
    )
    .then(function (response) {
      // handle success

      const articleList = response.data;
      document.getElementById("page-heading").textContent = articleList[1].category.name;
      category.innerHTML = articleList[1].category.name
      title.innerHTML = articleList[1].category.name

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

}

function renderArticleItem(item) {
  const pubDate = dayjs(item.publish_date).fromNow();
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
                  <span class="f1-s-3">${pubDate}</span>
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
