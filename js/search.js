const featurePost = document.getElementById("feature-post");
const articles = document.getElementById("articles");
const category = document.getElementById("category");
const title = document.getElementById("title");

const urlParams = new URLSearchParams(window.location.search);
const keyword = urlParams.get("keyword");
console.log(keyword);

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


let paraOffset = 0;
let paraLimit = 4;
loadArticle(keyword, paraOffset, paraLimit);

document.getElementById('btn-page-prev').addEventListener('click', function () {
  paraOffset -= paraLimit;
  loadArticle(keyword, paraOffset, paraLimit);
})

document.getElementById('btn-page-next').addEventListener('click', function () {
  paraOffset += paraLimit;
  loadArticle(keyword, paraOffset, paraLimit);
})


function loadArticle(key, offset, limit) {
  // Articles
  axios
    .get(
      `https://apiforlearning.zendvn.com/api/articles/search?q=${key}&offset=${offset}&limit=${limit}&sort_by=id&sort_dir=desc`
    )
    .then(function (response) {
      // handle success

      const articleList = response.data;
      document.getElementById("page-heading").textContent = `Tìm kiếm với từ: "${key}"`;
      category.innerHTML = "Tìm kiếm"

      let articleItem = ``;
      for (var i = 0; i < articleList.length; i++) {
        articleItem += renderArticleItem(articleList[i], key);
      }
      articles.innerHTML = articleItem;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

function renderArticleItem(item, key = '') {
  const pubDate = dayjs(item.publish_date).fromNow();

  let title = item.title;
  if (key) {
    let regex = new RegExp(key, "gi");
    title = title.replace(regex, function (match) {
      return `<mark>${match}</mark>`;
    });
  }

  return `
  <div class="col-sm-6 p-r-25 p-r-15-sr991">
      <div class="m-b-45">
          <a href="${item.link}" class="wrap-pic-w hov1 trans-03">
              <img src="${item.thumb}" alt="IMG">
          </a>
          <div class="p-t-16">
              <h5 class="p-b-5">
                  <a href=href="${item.link}" class="f1-m-3 cl2 hov-cl10 trans-03">
                  ${title}
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
