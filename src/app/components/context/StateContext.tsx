import { createContext,useContext,useState,useEffect,ReactNode } from "react";
import toast, { Toast, Toaster } from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  price: string;
  [key: string]: any; 
}

interface CartContextValues {
  showCart?: boolean;
  CartItem: Product[];
  subTotal: number;
  qty: number;
  totalQuantities: number;
  incQty: () => void;
  decQty: () => void;
  AddToCart: (product: Product, quantity: number) => void;
}

interface StateProps {
    children: ReactNode;
  }

const Context = createContext<CartContextValues | undefined>(undefined);



export const StateContext: React.FC<StateProps> = ({children}) => {
    const [showCart, setShowCart] = useState();
    const [CartItem, setCartItem] = useState<Product[]>([]);
    const [subTotal, setSubTotal] = useState(0);
    const [qty, setQty] = useState(1);
    const [totalQuantities, setTotalQuantities] = useState(0);

    const incQty = () => {
      setQty(qty + 1);
    }
    const decQty = () => {
      if (qty > 1) {
        setQty(qty - 1);
      }
      else {
        toast.error('Cannot decrement quantity below 1');
      }
    }


    const AddToCart = (product: Product, quantity: number) => {
      const current_Product = CartItem.find((item) => item.id === product.id);
    
      if (current_Product) {
        
        setSubTotal((current) => current + product.pricePerDay * quantity);
        setTotalQuantities((current) => current + quantity);
    
        const UpdatedCart = CartItem.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });
    
        setCartItem(UpdatedCart);
      } else {
        
        const newProduct = { ...product, quantity };
        setCartItem([...CartItem, newProduct]);
        setSubTotal((current) => current + product.pricePerDay * quantity);
        setTotalQuantities((current) => current + quantity);
      }
    
      
      toast.success(`${quantity} ${product.name} added successfully`);
    };
    

 
    return (
      <Context.Provider
      value={{
        showCart,
        CartItem,
        subTotal,
        qty,
        totalQuantities,
        incQty,
        decQty,
        AddToCart,
      }}
    >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useStateContext must be used within a StateContext provider");
  }
  return context;
};