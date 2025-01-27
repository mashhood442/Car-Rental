import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  pricePerDay: number;
  quantity: number;
  [key: string]: any;
}

interface CartContextValues {
  showCart?: boolean;
  CartItem: Product[];
  subTotal: number;
  totalQuantities: number;
  saveCart: () => void;
  AddToCart: (product: Product, quantity: number) => void;
  RemoveFromCart: (product: Product, quantity: number) => void;
  updateSubTotal: (cartItems: Product[]) => void;
  deleteFromCart: () => void;
}

interface StateProps {
  children: ReactNode;
}

const Context = createContext<CartContextValues | undefined>(undefined);

export const StateContext: React.FC<StateProps> = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [CartItem, setCartItem] = useState<Product[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);

  const deleteFromCart = () => {
    setCartItem([])
    localStorage.removeItem('cart')  
    
  }

  // Save the cart to localStorage
  const saveCart = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(CartItem));
    }
  };

  // Load cart from localStorage
  const loadCart = () => {
    try {
      const fromStorage = localStorage.getItem("cart");
      if (fromStorage) {
        const parsedCart = JSON.parse(fromStorage) 
        setCartItem(parsedCart);
        updateSubTotal(parsedCart);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
      localStorage.removeItem("cart");
      setCartItem([]);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    saveCart();
  }, [CartItem]);

  // Update subtotal and total quantities
  const updateSubTotal = (myCart: Product[]) => {
    const subtotal = myCart.reduce((sum, item) => sum + item.quantity * item.pricePerDay, 0);
    const totalQty = myCart.reduce((sum, item) => sum + item.quantity, 0);
    setSubTotal(subtotal);
    setTotalQuantities(totalQty);
  };

  const AddToCart = (product: Product, quantity: number) => {
    if (quantity <= 0) {
      toast.error("Quantity must be greater than zero");
      return;
    }

    const existingProduct = CartItem.find((item) => item.id === product.id);

    if (existingProduct) {
      const updatedCart = CartItem.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
      setCartItem(updatedCart);
    } else {
      setCartItem([...CartItem, { ...product, quantity }]);
    }

    toast.success(`${quantity} ${product.name} added successfully`);
    updateSubTotal([...CartItem, { ...product, quantity }]);
  };

  const RemoveFromCart = (product: Product, quantity: number) => {
    if (quantity <= 0) {
      toast.error("Quantity must be greater than zero");
      return;
    }

    const updatedCart = CartItem.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity - quantity } : item
    ).filter((item) => item.quantity > 0);

    setCartItem(updatedCart);

    toast.error(`${quantity} ${product.name} removed successfully`);
    updateSubTotal(updatedCart);
  };

  return (
    <Context.Provider
      value={{
        deleteFromCart,
        updateSubTotal,
        showCart,
        CartItem,
        subTotal,
        totalQuantities,
        saveCart,
        AddToCart,
        RemoveFromCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useStateContext must be used within a StateContext provider");
  }
  return context;
};
