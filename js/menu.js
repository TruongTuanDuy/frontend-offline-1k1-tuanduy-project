const mainMenuDesktop = document.getElementById("main-menu-desktop");
const mainMenuMobile = document.getElementById("main-menu-mobile");

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
    mainMenuDesktop.innerHTML = category + categoryOther;
    mainMenuMobile.innerHTML = category + categoryOtherMobile;

    addEventForMobileMenu();
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });