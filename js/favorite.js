
const favorite = document.getElementById("favorite");
favorite.innerHTML = '';

let original = loadStorage();
let paraLimit = 2;
renderFav();

function renderFav() {
  let favList = loadStorage();
  let content = ``;
  for (let i = 0; i < favList.length; i++) {
    const element = favList[i];
    axios
      .get(`articles/${element}`)
      .then(function (response) {
        const favoriteItem = response.data;
        const pubDate = dayjs(favoriteItem.publish_date).fromNow();
        const detailLink = 'detail.html?id=' + favoriteItem.id;
        const colorFav = (favList.includes(favoriteItem.id.toString())) ? "#17b978" : "lightgray";
        const item = document.createElement('div');
        item.className = 'flex-wr-sb-s p-t-40 p-b-15 how-bor2 fav-item';
        item.innerHTML = `
        <a href="${detailLink}" class="size-w-8 wrap-pic-w hov1 trans-03 w-full-sr575 m-b-25">
          <img src="${favoriteItem.thumb}" alt="IMG" />
        </a>
        <div class="size-w-9 w-full-sr575 m-b-25">
          <h5 class="p-b-12">
            <a href="${detailLink}" class="f1-l-1 cl2 hov-cl10 trans-03 respon2">
            ${favoriteItem.title}
            </a>
          </h5>
          <div class="cl8 p-b-18">
          <span class="f1-s-3"> ${pubDate} </span>
          <button><i style="color:${colorFav}" class="fas fa-heart heart" id="${favoriteItem.id}"></i></button>
          <span class="number-heart">0000</span>
          </div>
          <p class="f1-s-1 cl6 p-b-24">
          ${favoriteItem.description}
          </p>
        </div>
        `;
        favorite.append(item);

        // content.innerHTML += '<img src="" alt="" />';
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

}

// Load More
document.getElementById('btn-load-more').addEventListener('click', function () {
  paraLimit += 1;
  renderFav(paraLimit);
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


// LOVE HEART
favorite.addEventListener('click', function (e) {
  // e.preventDefault();
  const ele = e.target;
  let id = ele.id;
  if (ele.className === "fas fa-heart heart") {
      ele.closest('.fav-item').remove();
      ele.style.color = "lightgray"
      original = original.filter(item => item !== id)
      saveStorage(original);
      alert("Đã bỏ yêu thích!");
  }
  // renderFav();
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