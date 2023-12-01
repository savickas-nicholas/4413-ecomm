

// array of objects of format { quantity, item }
let contents = [];

export const getContents = () => {
  return contents;
}

// get current quantity for specific vehicle
export const getCurrentQuantity = (id) => {
  let quantity = 0;
  for(let elem of contents) {
    if(elem.item._id === id) {
      quantity = elem.quantity;
    }
  }
  return quantity;
}

export const addToCart = (item, quantity) => {
  contents.push({
    quantity,
    item
  });
  localStorage.setItem('cart', JSON.stringify(contents));
}

export const removeFromCart = (id) => {
  contents = contents.filter(elem => {
    return elem.item._id !== id
  })
  localStorage.setItem('cart', JSON.stringify(contents));
}

export const updateCart = (id, quantity) => {
  contents = contents.map(elem => {
    return elem.item._id === id ? {
      quantity,
      item: elem.item
    } : elem; 
  });
  localStorage.setItem('cart', JSON.stringify(contents));
}

// populate cart from localStorage
export const initCart = () => {
  const cart = localStorage.getItem('cart');
  contents = cart ? JSON.parse(cart) : [];
}

export const clearCart = () => {
  contents = [];
  localStorage.removeItem('cart');
}


