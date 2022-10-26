
const featurePost = document.getElementById("feature-post");
const mostPopular = document.getElementById("most-popular");
const entertainment = document.getElementById("entertainment"); // Thế giới
const business = document.getElementById("business"); // Thời sự
const technology = document.getElementById("technology"); // Kinh doanh
const lastest = document.getElementById("lastest");

let original = loadStorage();


let paraLimit = 5;
loadLatest(paraLimit);


// Load More
document.getElementById('btn-load-more').addEventListener('click', function () {
  paraLimit += 2;
  loadLatest(paraLimit)
})

// Search
document.getElementById('btn-search').addEventListener('click', function () {
  let keyword = document.getElementById("input-search").value;
  keyword = keyword.replace(/[\s]+/g, ' ');
  window.location.href = 'search.html?keyword=' + keyword;
})
document.getElementById("input-search").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btn-search").click();
  }
});

function loadLatest(limit) {
  // Lastest
  axios
    .get(`articles?offset=0&limit=${limit}&sort_by=id&sort_dir=desc`)
    .then(function (response) {
      // handle success
      const lastestList = response.data;
      let content = ``;
      for (var i = 0; i < lastestList.length; i++) {
        const pubDate = dayjs(lastestList[i].publish_date).fromNow();
        const detailLink = 'detail.html?id=' + lastestList[i].id;

        content += `
      <!-- Item post -->
      <div class="flex-wr-sb-s p-t-40 p-b-15 how-bor2">
        <a href="${detailLink}" class="size-w-8 wrap-pic-w hov1 trans-03 w-full-sr575 m-b-25">
          <img src="${lastestList[i].thumb}" alt="IMG" />
        </a>
        <div class="size-w-9 w-full-sr575 m-b-25">
          <h5 class="p-b-12">
            <a href="${detailLink}" class="f1-l-1 cl2 hov-cl10 trans-03 respon2">
            ${lastestList[i].title}
            </a>
          </h5>
          <div class="cl8 p-b-18">
          <span class="f1-s-3"> ${pubDate} </span>
          <button><i style="color:${(original.includes(lastestList[i].id.toString())) ? "#17b978" : "lightgray"}" class="fas fa-heart heart" id="${lastestList[i].id}"></i></button>
          <span class="number-heart">0000</span>
          </div>
          <p class="f1-s-1 cl6 p-b-24">
          ${lastestList[i].description}
          </p>
        </div>
      </div>
    `}
      lastest.innerHTML = content;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  // arrHeart = document.getElementsByClassName("heart");

}



// Post - Kinh Doanh
axios
  .get("https://apiforlearning.zendvn.com/api/categories_news/3/articles?offset=0&limit=10&sort_by=id&sort_dir=desc")
  .then(function (response) {
    // handle success
    const postList = response.data;
    let content = ``;
    for (var i = 0; i < 3; i++) {
      const pubDate = dayjs(postList[i].publish_date).fromNow();
      const detailLink = 'detail.html?id=' + postList[i].id;

      if (i == 0) {
        content += `
        <!-- Main Item post -->
        <div class="m-b-30">
        <a href=${detailLink} class="wrap-pic-w hov1 trans-03">
          <img src="${postList[i].thumb}" alt="IMG" />
        </a>

        <div class="p-t-20">
          <h5 class="p-b-5">
            <a href=${detailLink} class="f1-m-3 cl2 hov-cl10 trans-03">
            ${postList[i].title}
            </a>
          </h5>

          <span class="cl8 love-bar">
          <span class="f1-s-3"> ${pubDate} </span>
          <button><i style="color:${(original.includes(postList[i].id.toString())) ? "#17b978" : "lightgray"}" class="fas fa-heart heart" id="${postList[i].id}"></i></button>
          <span class="number-heart">0000</span>
          </span>
      </div>
      </div>
      `;
      } else {
        content += `
        <!-- Item post -->
        <div class="flex-wr-sb-s m-b-30">
        <a href=${detailLink} class="size-w-1 wrap-pic-w hov1 trans-03">
          <img src="${postList[i].thumb}" alt="IMGDonec metus orci, malesuada et lectus vitae" />
        </a>

        <div class="size-w-2">
          <h5 class="p-b-5">
            <a href=${detailLink} class="f1-s-5 cl3 hov-cl10 trans-03">
            ${postList[i].title}
            </a>
          </h5>

          <span class="cl8 love-bar">
          <span class="f1-s-3"> ${pubDate} </span>
          <button><i style="color:${(original.includes(postList[i].id.toString())) ? "#17b978" : "lightgray"}" class="fas fa-heart heart" id="${postList[i].id}"></i></button>
          <span class="number-heart">0000</span>
          </span>
      </div>
      </div>
`      }
    }
    content = `<div class="how2 how2-cl2 flex-sb-c m-b-35">
    <h3 class="f1-m-2 cl13 tab01-title">${postList[0].category.name}</h3>

    <a href="category-01.html" class="tab01-link f1-s-1 cl9 hov-cl10 trans-03">
      Xem tất cả
      <i class="fs-12 m-l-5 fa fa-caret-right"></i>
    </a>
  </div>
`
      + content +
      `</div>`
    technology.innerHTML = content;

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

// Post - Thời Sự
axios
  .get("https://apiforlearning.zendvn.com/api/categories_news/2/articles?offset=0&limit=10&sort_by=id&sort_dir=desc")
  .then(function (response) {
    // handle success
    const postList = response.data;
    let content = ``;
    for (var i = 0; i < 3; i++) {
      const pubDate = dayjs(postList[i].publish_date).fromNow();
      const detailLink = 'detail.html?id=' + postList[i].id;

      if (i == 0) {
        content += `
        <!-- Main Item post -->
        <div class="m-b-30">
        <a href=${detailLink} class="wrap-pic-w hov1 trans-03">
          <img src="${postList[i].thumb}" alt="IMG" />
        </a>

        <div class="p-t-20">
          <h5 class="p-b-5">
            <a href=${detailLink} class="f1-m-3 cl2 hov-cl10 trans-03">
            ${postList[i].title}
            </a>
          </h5>

          <span class="cl8 love-bar">
          <span class="f1-s-3"> ${pubDate} </span>
          <button><i style="color:${(original.includes(postList[i].id.toString())) ? "#17b978" : "lightgray"}" class="fas fa-heart heart" id="${postList[i].id}"></i></button>
          <span class="number-heart">0000</span>
          </span>
      </div>
      </div>
`;
      } else {
        content += `
        <!-- Item post -->
        <div class="flex-wr-sb-s m-b-30">
        <a href=${detailLink} class="size-w-1 wrap-pic-w hov1 trans-03">
          <img src="${postList[i].thumb}" alt="IMGDonec metus orci, malesuada et lectus vitae" />
        </a>

        <div class="size-w-2">
          <h5 class="p-b-5">
            <a href=${detailLink} class="f1-s-5 cl3 hov-cl10 trans-03">
            ${postList[i].title}
            </a>
          </h5>

          <span class="cl8 love-bar">
          <span class="f1-s-3"> ${pubDate} </span>
          <button><i style="color:${(original.includes(postList[i].id.toString())) ? "#17b978" : "lightgray"}" class="fas fa-heart heart" id="${postList[i].id}"></i></button>
          <span class="number-heart">0000</span>
          </span>
      </div>
      </div>
`      }
    }
    content = `                <div class="how2 how2-cl2 flex-sb-c m-b-35">
    <h3 class="f1-m-2 cl13 tab01-title">${postList[0].category.name}</h3>

    <a href="category-01.html" class="tab01-link f1-s-1 cl9 hov-cl10 trans-03">
      Xem tất cả
      <i class="fs-12 m-l-5 fa fa-caret-right"></i>
    </a>
  </div>
`
      + content +
      `</div>`
    business.innerHTML = content;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

// Post - Thế giới
axios
  .get("https://apiforlearning.zendvn.com/api/categories_news/1/articles?offset=0&limit=10&sort_by=id&sort_dir=desc")
  .then(function (response) {
    // handle success
    const postList = response.data;
    let content = ``;
    for (var i = 0; i < 4; i++) {
      const pubDate = dayjs(postList[i].publish_date).fromNow();
      const detailLink = 'detail.html?id=' + postList[i].id;

      if (i == 0) {
        content += `
        <!-- Item post -->
        <div class="m-b-30">
          <a href="${detailLink}" class="wrap-pic-w hov1 trans-03">
            <img src="${postList[i].thumb}" />
          </a>

          <div class="p-t-20">
            <h5 class="p-b-5">
              <a href="${detailLink}" class="f1-m-3 cl2 hov-cl10 trans-03">
              ${postList[i].title}
              </a>
            </h5>

            <span class="cl8 love-bar">
            <span class="f1-s-3"> ${pubDate} </span>
            <button><i style="color:${(original.includes(postList[i].id.toString())) ? "#17b978" : "lightgray"}" class="fas fa-heart heart" id="${postList[i].id}"></i></button>
            <span class="number-heart">0000</span>
              </span>
          </div>
        </div>
      </div>

      <div class="col-sm-6 p-r-25 p-r-15-sr991">`;
      } else {
        content += `
        <!-- Item post -->
        <div class="flex-wr-sb-s m-b-30">
          <a href="${detailLink}" class="size-w-1 wrap-pic-w hov1 trans-03">
            <img src="${postList[i].thumb}" alt="IMGDonec metus orci, malesuada et lectus vitae" />
          </a>

          <div class="size-w-2">
            <h5 class="p-b-5">
              <a href="${detailLink}" class="f1-s-5 cl3 hov-cl10 trans-03">
              ${postList[i].title}
              </a>
            </h5>

            <span class="cl8 love-bar">
            <span class="f1-s-3"> ${pubDate} </span>
            <button><i style="color:${(original.includes(postList[i].id.toString())) ? "#17b978" : "lightgray"}" class="fas fa-heart heart" id="${postList[i].id}"></i></button>
            <span class="number-heart">0000</span>
              </span>
          </div>
        </div>`
      }
    }
    content = `<div class="how2 how2-cl1 flex-sb-c m-r-10 m-r-0-sr991">
    <h3 class="f1-m-2 cl12 tab01-title">${postList[0].category.name}</h3>

    <a href="category.html?id=1" class="tab01-link f1-s-1 cl9 hov-cl10 trans-03">
      Xem tất cả
      <i class="fs-12 m-l-5 fa fa-caret-right"></i>
    </a>
  </div>

  <div class="row p-t-35">
    <div class="col-sm-6 p-r-25 p-r-15-sr991">`
      + content +
      `</div>
    </div>
  </div>`
    entertainment.innerHTML = content;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

// Top Articles
axios
  .get("https://apiforlearning.zendvn.com/api/articles/top-articles?limit=6")
  .then(function (response) {
    // handle success
    const featuresList = response.data;
    let feature = ``;
    for (var i = 0; i < featuresList.length; i++) {
      const categoryLink = 'category.html?id=' + featuresList[i].category_id;
      const detailLink = 'detail.html?id=' + featuresList[i].id;
      feature += `
      <div class="col-sm-6 col-lg-4 p-rl-1 p-b-2">
        <div class="bg-img1 size-a-12 how1 pos-relative" style="background-image: url(${featuresList[i].thumb})">
          <a href="${detailLink}" class="dis-block how1-child1 trans-03"></a>
          <div class="flex-col-e-s s-full p-rl-25 p-tb-11">
            <a href="${categoryLink}" class="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2">${featuresList[i].category.name}</a>
            <h3 class="how1-child2 m-t-10">
              <a href="${detailLink}" class="f1-m-1 cl0 hov-cl10 trans-03">${featuresList[i].title}</a>
              <button><i style="color:${(original.includes(featuresList[i].id.toString())) ? "#17b978" : "lightgray"}" class="fas fa-heart heart" id="${featuresList[i].id}"></i></button>
              <span class="number-heart">0000</span>
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

// Most Popular
axios
  .get("https://apiforlearning.zendvn.com/api/articles/most-read?limit=5")
  .then(function (response) {
    // handle success
    const popularList = response.data;

    let popular = ``;
    for (var i = 0; i < popularList.length; i++) {
      const detailLink = 'detail.html?id=' + popularList[i].id;

      popular += `
      <li class="flex-wr-sb-s p-b-22">
        <div class="size-a-8 flex-c-c borad-3 size-a-8 bg9 f1-m-4 cl0 m-b-6">${i + 1}</div>
        <a href="${detailLink}" class="size-w-3 f1-s-7 cl3 hov-cl10 trans-03">${popularList[i].title}</a>
      </li>`;
    }

    mostPopular.innerHTML = popular;
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
  let id = ele.id;
  if (ele.className === "fas fa-heart heart") {
    if (!original.includes(id)) {
      ele.style.color = "#17b978"
      original.push(id);
      saveStorage(original);
      window.alert("Đã thêm yêu thích!");
    }
    else {
      ele.style.color = "lightgray"
      original = original.filter(item => item !== id)
      saveStorage(original);
      window.alert("Đã bỏ yêu thích!");
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
    $('.btn-show-menu-mobile').on('click', function () {
      $(this).toggleClass('is-active');
      $('.menu-mobile').slideToggle();
    });

    var arrowMainMenu = $('.arrow-main-menu-m');

    for (var i = 0; i < arrowMainMenu.length; i++) {
      $(arrowMainMenu[i]).on('click', function () {
        $(this).parent().find('.sub-menu-m').slideToggle();
        $(this).toggleClass('turn-arrow-main-menu-m');
      })
    }

    $(window).on('resize', function () {
      if ($(window).width() >= 992) {
        if ($('.menu-mobile').css('display') === 'block') {
          $('.menu-mobile').css('display', 'none');
          $('.btn-show-menu-mobile').toggleClass('is-active');
        }

        $('.sub-menu-m').each(function () {
          if ($(this).css('display') === 'block') {
            $(this).css('display', 'none');
            $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
          }
        });

      }
    });
  } catch (er) { console.log(er); }
}