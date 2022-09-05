const mainMenuDesktop = document.getElementById("main-menu-desktop");
const mainMenuMobile = document.getElementById("main-menu-mobile");
const featurePost = document.getElementById("feature-post");
const mostPopular = document.getElementById("most-popular");

// Menu Desktop
axios
  .get(
    "https://apiforlearning.zendvn.com/api/categories_news?offset=0&limit=20"
  )
  .then(function (response) {
    // handle success
    const catagories = response.data;
    let catagory = ``;
    let catagoryOther = ``;
    for (var i = 0; i < catagories.length; i++) {
      if (i < 3) {
        catagory += `
      <li>
      <a href="index.html">${catagories[i].name}</a>
      </li>
      `;
      } else {
        catagoryOther += `
       		<li><a href="category-01.html">${catagories[i].name}</a></li>
					`;
      }
    }

    if (catagoryOther) {
      catagoryOther = `
      <li>
        <a href="#">Danh mục khác&nbsp;<i class="fas fa-angle-down"></i></a>
        <ul class="sub-menu">
          ${catagoryOther}
        </ul>
      </li>
      `;
    }
    mainMenuDesktop.innerHTML = catagory + catagoryOther;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

// Menu Mobile
axios
  .get(
    "https://apiforlearning.zendvn.com/api/categories_news?offset=0&limit=20"
  )
  .then(function (response) {
    // handle success
    const catagories = response.data;
    let catagory = ``;
    let catagoryOther = ``;
    for (var i = 0; i < catagories.length; i++) {
      if (i < 3) {
        catagory += `
      <li>
      <a href="index.html">${catagories[i].name}</a>
      </li>
      `;
      } else {
        catagoryOther += `
       		<li><a href="category-01.html">${catagories[i].name}</a></li>
					`;
      }
    }

    if (catagoryOther) {
      catagoryOther = `
      <li>
      <a href="#">Danh muc khac</a>
      <ul class="sub-menu-m">
      ${catagoryOther}
      </ul>
      <span class="arrow-main-menu-m">
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </span>
    </li>
`;
    }
    mainMenuMobile.innerHTML = catagory + catagoryOther;
    console.log(catagoryOther);
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
      feature += `
      <div class="col-sm-6 col-lg-4 p-rl-1 p-b-2">
      <div
        class="bg-img1 size-a-12 how1 pos-relative"
        style="background-image: url(${featuresList[i].thumb})"
      >
        <a
          href="${featuresList[i].title}"
          class="dis-block how1-child1 trans-03"
        ></a>

        <div class="flex-col-e-s s-full p-rl-25 p-tb-11">
          <a
            href="#"
            class="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2"
          >
            Life Style
          </a>

          <h3 class="how1-child2 m-t-10">
            <a
              href="${featuresList[i].title}"
              class="f1-m-1 cl0 hov-cl10 trans-03"
            >
            ${featuresList[i].title}
            </a>
          </h3>
        </div>
      </div>
    </div>
`;
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
      <div
        class="size-a-8 flex-c-c borad-3 size-a-8 bg9 f1-m-4 cl0 m-b-6"
      >
      ${i + 1}
      </div>

      <a href="#" class="size-w-3 f1-s-7 cl3 hov-cl10 trans-03">
        ${popularList[i].title}
      </a>
    </li>
`;
    }

    popular = `
    <div class="how2 how2-cl4 flex-s-c">
    <h3 class="f1-m-2 cl3 tab01-title">Most Popular</h3>
  </div>

  <ul class="p-t-35">
  ${popular}
  </ul>

    `;
    mostPopular.innerHTML = popular;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
