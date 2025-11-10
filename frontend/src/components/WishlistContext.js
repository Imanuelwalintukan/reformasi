import React, { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WISHLIST':
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(item => item.productId !== action.payload)
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    loading: false,
    error: null
  });

  // Inisialisasi wishlist dari localStorage untuk sementara
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        dispatch({ type: 'SET_WISHLIST', payload: parsedWishlist });
      } catch (e) {
        console.error('Error parsing wishlist from localStorage', e);
      }
    }
  }, []);

  // Fungsi-fungsi wishlist yang menyimpan ke localStorage
  const addToWishlist = (product) => {
    const newItem = {
      productId: String(product.id), // Konversi ke string untuk konsistensi
      addedAt: new Date().toISOString(),
      product: product
    };
    
    const updatedItems = [...state.items, newItem];
    dispatch({ type: 'ADD_TO_WISHLIST', payload: newItem });
    localStorage.setItem('wishlist', JSON.stringify(updatedItems));
    return true;
  };

  const removeFromWishlist = (productId) => {
    // Konversi tipe ID untuk perbandingan yang akurat
    const updatedItems = state.items.filter(item => item.productId !== String(productId));
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
    localStorage.setItem('wishlist', JSON.stringify(updatedItems));
    return true;
  };

  const isInWishlist = (productId) => {
    // Konversi tipe ID untuk perbandingan yang akurat
    return state.items.some(item => item.productId === String(productId));
  };

  const getWishlistItemCount = () => {
    return state.items.length;
  };

  return (
    <WishlistContext.Provider value={{
      ...state,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      getWishlistItemCount
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};