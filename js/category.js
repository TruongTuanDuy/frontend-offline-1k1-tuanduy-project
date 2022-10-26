const featurePost = document.getElementById("feature-post");
const articles = document.getElementById("articles");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

axios
  .get(
    `https://apiforlearning.zendvn.com/api/categories_news/${id}`
  )
  .then(function (response) {
    const categoryList = response.data;
    document.getElementById("page-heading").textContent = categoryList.name;
    document.getElementById("category").innerHTML = categoryList.name;
    document.getElementById("title").innerHTML = categoryList.name;
  })
  .catch(function (error) {
    console.log(error);
  });


const LIMIT = 6;
let TOTAL = 0;
let PAGES = 10;
let CURR_PAGE = 1;
let PAGE_RANGE = 4;
// let IDX = PAGES - PAGE_RANGE + 1;
let start = 1;
let end = start + PAGE_RANGE - 1;
loadArticle((CURR_PAGE - 1) * LIMIT);

document.getElementById('paginate-area').addEventListener('click', function (e) {
  e.preventDefault();
  const ele = e.target;

  if (ele.id === 'btn-page-next') {
    CURR_PAGE++;
    loadArticle((CURR_PAGE - 1) * LIMIT);
  }

  if (ele.id === 'btn-page-prev') {
    CURR_PAGE--;
    loadArticle((CURR_PAGE - 1) * LIMIT);
  }

  if (ele.classList.contains('my-pagi-item')) {
    CURR_PAGE = parseInt(ele.innerText);
    loadArticle((CURR_PAGE - 1) * LIMIT);
  }
})

function renderPagination() {
  let htmlPaginate = '';

  if (CURR_PAGE === end + 1) {
    start = CURR_PAGE;
    end = start + PAGE_RANGE - 1;
  }

  if (end >= PAGES) {
    end = PAGES;
    // start = Math.min(CURR_PAGE, Math.floor(CURR_PAGE / PAGE_RANGE) * PAGE_RANGE + 1);
    start = end - PAGE_RANGE + 1;
  }

  if (CURR_PAGE === start - 1) {
    end = CURR_PAGE;
    start = end - PAGE_RANGE + 1;
  }

  if (start <= 1) {
    start = 1;
    end = start + PAGE_RANGE - 1;
  }

  for (let index = start; index <= end; index++) {
    const activeClass = index === CURR_PAGE ? 'pagi-active' : '';
    htmlPaginate += `<a href="#" class="flex-c-c pagi-item hov-btn1 trans-03 m-all-7 my-pagi-item ${activeClass}">${index}</a>`
  }

  const firstPageClass = CURR_PAGE === 1 ? 'pagi-item-disabled' : '';
  const lastPageClass = CURR_PAGE === PAGES ? 'pagi-item-disabled' : '';
  htmlPaginate = `
    <a href="#" class="flex-c-c pagi-item hov-btn1 trans-03 m-all-7 ${firstPageClass}" id="btn-page-prev">&laquo;</a>
    ${htmlPaginate}
    <a href="#" class="flex-c-c pagi-item hov-btn1 trans-03 m-all-7 ${lastPageClass}" id="btn-page-next">&raquo;</a>
    `;
  document.getElementById('paginate-area').innerHTML = htmlPaginate;
}

function loadArticle(offset) {
  // Articles
  axios
    .get(
      `https://apiforlearning.zendvn.com/api/categories_news/${id}/articles?offset=${offset}&limit=${LIMIT}&sort_by=id&sort_dir=desc`
    )
    .then(function (response) {
      const articleList = response.data;
      let articleItem = ``;
      for (var i = 0; i < articleList.length; i++) {
        articleItem += renderArticleItem(articleList[i]);
      }
      articles.innerHTML = articleItem;
      renderPagination();

      console.log('CURR_PAGE', CURR_PAGE);
      console.log('start', start);
      console.log('end', end);

    })
    .catch(function (error) {
      console.log(error);
    });
}

function renderArticleItem(item) {
  const pubDate = dayjs(item.publish_date).fromNow();
  return `
  <div class="col-sm-6 p-r-25 p-r-15-sr991">
      <div class="m-b-45">
          <a href="detail.html?id=${item.id}" class="wrap-pic-w hov1 trans-03">
              <img src="${item.thumb}" alt="IMG">
          </a>
          <div class="p-t-16">
              <h5 class="p-b-5">
                  <a href="detail.html?id=${item.id}" class="f1-m-3 cl2 hov-cl10 trans-03">
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

