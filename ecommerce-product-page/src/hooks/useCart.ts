import { Cart, ICartItem } from '@/lib/cart';
import { useLocalStorage } from '@uidotdev/usehooks';
import { Dispatch, useCallback, useState } from "react";

export type CartActionType = {
    type: 'APPEND',
    data: ICartItem,
} | {
    type: 'UPDATE',
    data: ICartItem,
} | {
    type: 'DELETE',
    id: string,
};

function reducer(state: Cart, action: CartActionType) {
    switch(action.type) {
        case "APPEND": {
            const item = action.data;

            if (state.has(item.id)) {
                return state;
            }

            // If the project was meant to scale, maybe i would be working
            // with both Immer and Zod.
            const draft = state.clone();

            draft.set(item.id, item);

            return draft;
        }

        case "UPDATE": {
            const item = action.data;

            if (!state.has(item.id)) {
                return state;
            }

            const draft = state.clone();

            draft.set(item.id, item);

            return draft;
        }

        case "DELETE": {
            const id = action.id;

            if (!state.has(id)) {
                return state;
            }

            const draft = state.clone();

            draft.delete(id);

            return draft;
        }
    }
}

export function useCart(): [Omit<Cart, 'set' | 'delete' | 'clear'>, Dispatch<CartActionType>] {
    const [entries, persist] = useLocalStorage('cart_entries', Array.from(new Cart().entries()));

    const [state, setState] = useState(new Cart(entries));

    const dispatch = useCallback((action: CartActionType) => {
        const draft = reducer(state, action);

        if (draft === state) {
            return;
        }

        persist(Array.from(draft.entries()));

        setState(draft);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);
    
    return [state, dispatch];
}
