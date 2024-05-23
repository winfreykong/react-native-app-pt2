import { CartItem, Product } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

type CartType = {
    items: CartItem[];
    addItem: (product: Product, size: CartItem["size"]) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void; // return nothing
    total: number;
}

export const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
    total: 0,
});

const CartProvider = ({children}: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product, size: CartItem["size"]) => {

        // if already in cart, increment quantity
        const existingItem = items.find((item) => item.product === product && item.size === size);

        if (existingItem) {
            updateQuantity(existingItem.id, 1);
            return;
        }

       const newCartItem: CartItem = {
        id: randomUUID(), // generate
        product,
        product_id: product.id, 
        size,
        quantity: 1,
       };

       console.log(items);

       setItems([newCartItem, ...items]); // append to existing array

    }

    // update quantity
    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        // use array methods to loop
        // const updatedItems = items.map(item => item.id !== itemId ? item : {...item, quantity: item.quantity + amount}); // only overwrite quantity, keep the rest the same
        setItems(items
            .map(item => item.id !== itemId ? item : {...item, quantity: item.quantity + amount})
            .filter((item) => item.quantity > 0)
        );
    };

    const total = items.reduce((sum, item) => (sum = sum + item.product.price*item.quantity), 0);

    return (
        <CartContext.Provider 
            value={{ items : items, addItem, updateQuantity, total }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);