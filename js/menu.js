const mainMenuDesktop = document.getElementById("main-menu-desktop");
const mainMenuMobile = document.getElementById("main-menu-mobile");
const footerCategory = document.getElementById("footer-category");
const footerPopular = document.getElementById("footer-popular");

// Footer Popular
axios
  .get("https://apiforlearning.zendvn.com/api/articles/most-read?limit=3")
  .then(function (response) {
    const popularList = response.data;
    let popular = ``;
    for (var i = 0; i < popularList.length; i++) {
      const detailLink = 'detail.html?id=' + popularList[i].id;
      const pubDate = dayjs(popularList[i].publish_date).fromNow();

      popular += `<li class="flex-wr-sb-s p-b-20">
      <a href="${detailLink}" class="size-w-4 wrap-pic-w hov1 trans-03">
        <img src="${popularList[i].thumb}" alt="IMG" />
      </a>
      <div class="size-w-5">
        <h6 class="p-b-5">
          <a href="#" class="f1-s-5 cl11 hov-cl10 trans-03">
          ${popularList[i].title}
          </a>
        </h6>
        <span class="f1-s-3 cl6"> ${pubDate} </span>
      </div>
    </li>`;
    }
    footerPopular.innerHTML = popular;
  })
  .catch(function (error) {
    console.log(error);
  });

// Footer Categories

// let total = [0, 1, 2, 3, 4, 5];
// console.log(total);
// console.log(typeof total);

// axios.get("categories_news", {
//   params: {
//     offset: 0,
//     limit: 5
//   }
// })
//   .then(function (response) {
//     const catagories = response.data;
//     // let post = [{
//     //   categoryId: '',
//     //   total: ''
//     // }];
//     console.log(catagories);

//     let categoryId = "";
//     let category = ``;
//     for (var i = 0; i < catagories.length; i++) {
//       console.log(i);
//       console.log(catagories[i].id);
//       const categoryLink = 'category.html?id=' + catagories[i].id;
//       categoryId = catagories[i].id;

//       axios.get(`categories_news/${categoryId}/articles/total`)
//         .then(function (res) {
//           const totalArts = res.data;
//           console.log(totalArts);
//           total[i] = totalArts;
//           // if (i = 0) { total = totalArts } else { total.push(totalArts) }
//           console.log(total);
//           console.log(typeof total);



//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//       console.log(total);
//       console.log(typeof total);
//       console.log(total[i]);

//       category += `<li class="how-bor1 p-rl-5 p-tb-10">
//         <a href="${categoryLink}" class="f1-s-5 cl11 hov-cl10 trans-03 p-tb-8">
//         ${catagories[i].name} (${total[i]})
//         </a>
//       </li>`;
//     }
//     footerCategory.innerHTML = category;
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// Menu Desktop
axios.get("categories_news", {
  params: {
    offset: 0,
    limit: 20
  }
})
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

    categoryFavorite = `<li><a href="favorite.html">Yêu thích</a></li>`;
    mainMenuDesktop.innerHTML = category + categoryOther + categoryFavorite;
    mainMenuMobile.innerHTML = category + categoryOtherMobile + categoryFavorite;

    addEventForMobileMenu();
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });