const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      };

    case "INCREASE": {
      let tempCart = state.cart.map((item) => {
        if (item.id === action.payload) {
          //   console.log(item.amount);
          return { ...item, amount: item.amount++ };
        } else {
          return item;
        }
      });
      //   console.log(tempCart);
      return { ...state, cart: tempCart };
    }

    case "DECREASE": {
      let tempCart = state.cart
        .map((item) => {
          if (item.id === action.payload) {
            return { ...item, amount: item.amount-- };
          } else {
            return item;
          }
        })
        .filter((cartItem) => cartItem.amount !== 0);
      return { ...state, cart: tempCart };
    }

    case "GET_TOTALS":
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          //   console.log(cartTotal);
          const { price, amount } = cartItem;
          cartTotal.amount += amount;
          const itemTotal = price * amount;
          cartTotal.total += itemTotal;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, total, amount };

    case "LOADING":
      return { ...state, loading: true };

    case "DISPLAY_ITEM":
      return { ...state, cart: action.payload, loading: false };

    default:
      throw new Error("No matching action found");
  }
  throw new Error("No matching action found");
  //   if (action.type === "CLEAR_CART") {
  //     return { ...state, cart: [] };
  //   }
  //   return state;
};

export default reducer;
