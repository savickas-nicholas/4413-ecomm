

// in-memory storage with backup to localStorage

// array of objects of format { quantity, item }
let contents = [];


export const addToCart = () => {

}

export const removeFromCart = () => {

}

export const updateCart = () => {

}

// populate cart from localStorage
export const initCart = (cart) => {
  contents = JSON.parse(cart);
}

export const clearCart = () => {
  contents = [];
  localStorage.removeItem('cart');
}


