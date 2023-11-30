

// array of objects of format { quantity, item }
let contents = [];

export const getContents = () => {
  return contents;
}

export const addToCart = (item, quantity) => {
  let exists = false;
  contents = contents.map(elem => {
    if(elem.item._id !== item._id) {
      return elem;
    } else {
      exists = true;
      return {
        quantity: Number.parseInt(elem.item.quantity) + quantity,
        item,
      }
    }
  })

  if(!exists) {
    contents.push({
      quantity,
      item
    });
  }
  localStorage.setItem('cart', JSON.stringify(contents));
}

export const removeFromCart = (id) => {
  contents = contents.filter(elem => {
    return elem.item._id !== id
  })
  localStorage.setItem('cart', JSON.stringify(contents));
}

export const updateCart = (item, quantity) => {
  contents = contents.map(elem => {
    return elem.item._id === item._id ? {
      quantity,
      item
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


