const GUEST_CART_KEY = "redflint_guest_cart";

export const getGuestCart = () => {
  try {
    const cart = localStorage.getItem(GUEST_CART_KEY);

    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

const saveGuestCart = (cart) => {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));

  return cart;
};

export const addGuestCartItem = (item) => {
  const cart = getGuestCart();

  const existingItem = cart.find(
    (cartItem) =>
      cartItem.productId === item.productId && cartItem.size === item.size,
  );

  if (existingItem) {
    const updatedCart = cart.map((cartItem) =>
      cartItem._id === existingItem._id
        ? {
            ...cartItem,
            quantity: Number(cartItem.quantity) + Number(item.quantity),
          }
        : cartItem,
    );

    return saveGuestCart(updatedCart);
  }

  const guestItem = {
    ...item,

    _id: `guest-${item.productId}-${item.size}`,

    quantity: Number(item.quantity),

    isGuestItem: true,

    createdAt: new Date().toISOString(),
  };

  return saveGuestCart([guestItem, ...cart]);
};

export const updateGuestCartItem = (id, quantity) => {
  const cart = getGuestCart();

  const updatedCart = cart.map((item) =>
    item._id === id
      ? {
          ...item,
          quantity: Number(quantity),
        }
      : item,
  );

  return saveGuestCart(updatedCart);
};

export const removeGuestCartItem = (id) => {
  const cart = getGuestCart();

  const updatedCart = cart.filter((item) => item._id !== id);

  return saveGuestCart(updatedCart);
};

export const clearGuestCart = () => {
  localStorage.removeItem(GUEST_CART_KEY);

  return [];
};
