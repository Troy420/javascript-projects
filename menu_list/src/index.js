// Array
const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "src/images/1.jpg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "src/images/2.jpg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "src/images/3.jpg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "src/images/4.jpg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "src/images/5.jpg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "src/images/6.jpg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "src/images/7.jpg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "src/images/8.jpg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "src/images/9.jpg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "dinner dash",
    category: "dinner",
    price: 36.99,
    img: "src/images/10.jpg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];

const sectionCenter = document.querySelector(".section-center");
const buttonContainer = document.querySelector(".btn-container");

window.addEventListener("DOMContentLoaded", function () {
  displayMenuItems(menu);
  displayMenuBtns();
});

function displayMenuItems(menuItems) {
  let displayMenu = menuItems.map(function (item) {
    return `<article class="menu-item">
              <img src="${item.img}" class="photo" alt="pancakes" />
              <div class="item-info">
                <header>
                  <h4>${item.title}</h4>
                  <h4 class="price">$${item.price}</h4>
                </header>
                <p class="item-text">
                  ${item.desc}
                </p>
              </div>
            </article>`;
  });
  sectionCenter.innerHTML = displayMenu.join(" ");
}

function displayMenuBtns() {
  // reduce method always have 2 parameters, accumulator and current value
  // and MUST return the accumulator
  const categories = menu.reduce(
    function (total, eachItem) {
      // if the total does not have item.category
      if (!total.includes(eachItem.category)) {
        // add it to the array
        total.push(eachItem.category);
      }
      // return the accumulator
      return total;
    },
    // default value
    ["all"]
  );

  const categoryBtns = categories.map(function (category) {
    return `
        <button 
          class="filter-btn" 
          type="button" 
          data-category="${category}">
            ${category}
        </button>`;
  });

  buttonContainer.innerHTML = categoryBtns.join(" ");
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.target.dataset.category;
      const menuCategory = menu.filter(function (menuItem) {
        if (menuItem.category === category) {
          return menuItem;
        }
      });

      if (category === "all") {
        displayMenuItems(menu);
      } else {
        displayMenuItems(menuCategory);
      }
    });
  });
}
