import { useCart } from './hooks/useCart';
import { createContext, useCallback } from 'react';
import { Header } from './layout/header';
import { Product } from './pages/product';
import { ICartItem } from './lib/cart';

interface CartContext {
    cart: ReturnType<typeof useCart>[0];
    dispatch: ReturnType<typeof useCart>[1];
    onCartChange(product: IProduct, amount: number): void;
    onCartItemAmountChange(action: 'SUM' | 'OVERRIDE', id: string, amount: number): void;
} 

export interface IProduct {
    id: string;
    title: string;
    description: string;
    company: string;
    images: string[];
    thumbnails: string[];
    currency: string;
    price: number;
    discountInPercentage: number;
    minAmount: number;
    maxAmount: number;
}

const product: IProduct = {
    id: '8dead525-e73d-4b3f-8ece-23167b74073a',
    title: 'Fall Limited Edition Sneakers',
    description: 'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.',
    company: 'Sneaker Company',
    minAmount: 1,
    maxAmount: 999,
    images: [
        '../images/image-product-1.jpg', 
        '../images/image-product-2.jpg', 
        '../images/image-product-3.jpg', 
        '../images/image-product-4.jpg',
    ],
    thumbnails: [
        '../images/image-product-1-thumbnail.jpg',
        '../images/image-product-2-thumbnail.jpg', 
        '../images/image-product-3-thumbnail.jpg', 
        '../images/image-product-4-thumbnail.jpg',
    ],
    currency: 'USD',
    price: 250,
    discountInPercentage: 50,
}

// @ts-expect-error The value will be provided right below.
export const CartContext = createContext<CartContext>(null);
// @ts-expect-error The value will be provided right below.
export const ProductContext = createContext<IProduct>(null);

export function App() {
    const [cart, dispatch] = useCart();

    const onCartItemAmountChange = useCallback((action: 'SUM' | 'OVERRIDE', id: string, amount: number) => {
        if (!cart.has(id)) {
            return;
        }

        const item = cart.get(product.id) as ICartItem;

        if (amount > item.maxAmount) {
            return;
        }

        if (amount < item.minAmount) {
            return;
        }

        const draft = structuredClone(item);
        const itemHasDiscount = draft.discountInPercentage > 0;

        switch (action) {
            case 'SUM': {
                const doesExceedMaxAmount = (draft.amount + amount) > draft.maxAmount;

                if (doesExceedMaxAmount) {
                    return;
                }
                
                draft.amount = draft.amount + amount;

                draft.totalPrice = itemHasDiscount ?
                    draft.totalPrice + ((draft.price * draft.discountInPercentage / 100) * amount) :
                    draft.totalPrice + (draft.price * amount)

                break;
            }
            case 'OVERRIDE':  {
                draft.amount = amount;

                draft.totalPrice = itemHasDiscount ?
                    amount * (draft.price * draft.discountInPercentage / 100) :
                    amount * draft.price;

                break;
            }
        }

        dispatch({ type: 'UPDATE', data: draft, });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]);

    const onCartChange = useCallback((product: IProduct, amount: number) => {
        const itemHasDiscount = product.discountInPercentage > 0;
        const ITEM_THUMBNAIL_INDEX = 0;

        const item: ICartItem = {
            id: product.id,
            title: product.title,
            thumbnail: product.thumbnails[ITEM_THUMBNAIL_INDEX],
            currency: product.currency,
            amount: amount,
            minAmount: product.minAmount,
            maxAmount: product.maxAmount,
            price:product.price,
            discountInPercentage: product.discountInPercentage,
            totalPrice: itemHasDiscount ?
                amount * (product.price * product.discountInPercentage / 100) :
                amount * product.price,
        };

        dispatch({ type: 'APPEND', data: item, });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]);

    return (
        <>
            <ProductContext.Provider value={product}>
                <CartContext.Provider value={{ cart, dispatch, onCartChange, onCartItemAmountChange }}>
                    <div className='max-w-7xl mx-auto'>
                        <Header />
                        <Product />
                    </div>
                </CartContext.Provider>
            </ProductContext.Provider>
        </>
    );
}   
