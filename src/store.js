export function getCartItemDetails(id) {
  const cartItem = localStorage.getItem("cart");
  const cart = JSON.parse(cartItem);
  const itemEle = cart.find((item) => item.id == id);
  return itemEle ? itemEle : null;
}

export async function initializeCacheStore() {
  const storeData = localStorage.getItem("storeData");
  if (!storeData) {
    const fetchData = await fetch("https://fakestoreapi.com/products").then(
      (res) => res.json()
    );
    localStorage.setItem("storeData", JSON.stringify(fetchData));
  }
}

function getStoreData() {
  const storeData = JSON.parse(localStorage.getItem("storeData"));
  return storeData ? storeData : null;
}

export function initializeCart() {
  const cart = localStorage.getItem("cart");
  if (!cart) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
}

export function filterByCategory(category) {
  const storeData = getStoreData();
  const newArray = storeData.filter((item) => item.category === category);
  return newArray ? newArray : null;
}

export function getCategories() {
  const storeData = getStoreData();
  const categories = new Set(storeData.map((item) => item.category));
  return Array.from(categories);
}

export function getItemsByCategories(category, query) {
  const storeData = getStoreData();
  return storeData.filter((item) => {
    if (
      item.category == category &&
      item.title.toLowerCase().includes(query.toLowerCase())
    ) {
      return true;
    }
    return false;
  });
}

export function getItemDetails(id) {
  const storeData = getStoreData();
  const item = storeData.find((item) => {
    if (item.id == id) {
      return item;
    }
  });
  return item ? item : null;
}

export function handleAddItemToCart(id, title, price, img) {
  const cartItem = localStorage.getItem("cart");
  let cart = JSON.parse(cartItem);
  const oldItem = cart.find((it) => it.id == id);
  // console.log(cart);
  if (oldItem) {
    oldItem.count++;
  } else {
    cart = [
      ...cart,
      {
        id: id,
        title: title,
        price: price,
        image: img,
        count: 1,
      },
    ];
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function handleCartDecrease(id, cnt) {
  const cartItem = localStorage.getItem("cart");
  let cart = JSON.parse(cartItem);
  if (cnt == 1) {
    const filtered = cart.filter((it) => it.id != id);
    localStorage.setItem("cart", JSON.stringify(filtered));
  } else {
    const oldItem = cart.find((it) => it.id == id);
    oldItem.count--;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

export function handleCartIncrease(id) {
  const cartItem = localStorage.getItem("cart");
  let cart = JSON.parse(cartItem);
  const oldItem = cart.find((it) => it.id == id);
  // console.log(cart);
  oldItem.count++;
  localStorage.setItem("cart", JSON.stringify(cart));
}
