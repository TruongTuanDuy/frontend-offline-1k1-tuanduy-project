
const featurePost = document.getElementById("feature-post");
const mostPopular = document.getElementById("most-popular");
const entertainment = document.getElementById("entertainment");
const lastest = document.getElementById("lastest");


// Lastest
axios
  .get("articles")
  .then(function (response) {
    // handle success
    const lastestList = response.data;
    const lastestListUnsort = response.data;

    console.log(lastestListUnsort);

    lastestList.sort((a, b) => a.publish_date - b.publish_date);
    console.log(lastestList);

    let content = ``;
    for (var i = 0; i < lastestList.length; i++) {
      const pubDate = dayjs(lastestList[i].publish_date).fromNow();
      content += `
<!-- Item post -->
<div class="flex-wr-sb-s p-t-40 p-b-15 how-bor2">
  <a href="${lastestList[i].link}" class="size-w-8 wrap-pic-w hov1 trans-03 w-full-sr575 m-b-25">
    <img src="${lastestList[i].thumb}" alt="IMG" />
  </a>

  <div class="size-w-9 w-full-sr575 m-b-25">
    <h5 class="p-b-12">
      <a href="${lastestList[i].link}" class="f1-l-1 cl2 hov-cl10 trans-03 respon2">
      ${lastestList[i].title}
      </a>
    </h5>

    <div class="cl8 p-b-18">
      <a href="#" class="f1-s-4 cl8 hov-cl10 trans-03">
        by John Alvarado
      </a>

      <span class="f1-s-3 m-rl-3"> - </span>

      <span class="f1-s-3"> ${pubDate} </span>
    </div>

    <p class="f1-s-1 cl6 p-b-24">
    ${lastestList[i].description}
    </p>

    <a href="${lastestList[i].link}" class="f1-s-1 cl9 hov-cl10 trans-03">
      Read More
      <i class="m-l-2 fa fa-long-arrow-alt-right"></i>
    </a>
  </div>
</div>
`    }

    lastest.innerHTML = content;
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
      if (i == 0) {
        content += `
        <!-- Item post -->
        <div class="m-b-30">
          <a href="${postList[i].link}" class="wrap-pic-w hov1 trans-03">
            <img src="${postList[i].thumb}" />
          </a>

          <div class="p-t-20">
            <h5 class="p-b-5">
              <a href="${postList[i].link}" class="f1-m-3 cl2 hov-cl10 trans-03">
              ${postList[i].title}
              </a>
            </h5>

            <span class="cl8">
              <a href="#" class="f1-s-4 cl8 hov-cl10 trans-03">
                Music
              </a>

              <span class="f1-s-3 m-rl-3"> - </span>

              <span class="f1-s-3"> Feb 18 </span>
            </span>
          </div>
        </div>
      </div>

      <div class="col-sm-6 p-r-25 p-r-15-sr991">`;
      } else {
        content += `
        <!-- Item post -->
        <div class="flex-wr-sb-s m-b-30">
          <a href="${postList[i].link}" class="size-w-1 wrap-pic-w hov1 trans-03">
            <img src="${postList[i].thumb}" alt="IMGDonec metus orci, malesuada et lectus vitae" />
          </a>

          <div class="size-w-2">
            <h5 class="p-b-5">
              <a href="${postList[i].link}" class="f1-s-5 cl3 hov-cl10 trans-03">
              ${postList[i].title}
              </a>
            </h5>

            <span class="cl8">
              <a href="#" class="f1-s-6 cl8 hov-cl10 trans-03">
                Music
              </a>

              <span class="f1-s-3 m-rl-3"> - </span>

              <span class="f1-s-3"> Feb 17 </span>
            </span>
          </div>
        </div>`
      }
    }
    content = `<div class="how2 how2-cl1 flex-sb-c m-r-10 m-r-0-sr991">
    <h3 class="f1-m-2 cl12 tab01-title">${postList[0].category.name}</h3>

    <a href="category.html?id=1" class="tab01-link f1-s-1 cl9 hov-cl10 trans-03">
      View all
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
      popular += `
      <li class="flex-wr-sb-s p-b-22">
        <div class="size-a-8 flex-c-c borad-3 size-a-8 bg9 f1-m-4 cl0 m-b-6">${i + 1}</div>
        <a href="#" class="size-w-3 f1-s-7 cl3 hov-cl10 trans-03">${popularList[i].title}</a>
      </li>`;
    }

    mostPopular.innerHTML = popular;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });


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