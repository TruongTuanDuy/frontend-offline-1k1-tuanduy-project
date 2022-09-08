const mainMenuDesktop = document.getElementById("main-menu-desktop");
const mainMenuMobile = document.getElementById("main-menu-mobile");
const featurePost = document.getElementById("feature-post");
const mostPopular = document.getElementById("most-popular");

window.location.href = 'search.html?keyword=' + 'viet nam';

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
      const categoryLink = 'category.html?id=' + catagories[i].id;
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