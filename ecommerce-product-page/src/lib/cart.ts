import { IProduct } from "@/App";

export type ICartItem = Omit<IProduct, 'images' | 'description' |'thumbnails' | 'company' | 'stock'> & { 
    thumbnail: string; 
    amount: number;
    minAmount: number;
    maxAmount: number;
    totalPrice: number;
};

export class Cart {
    private _nativeMap: Map<string, ICartItem>;

    constructor(iterable?: Iterable<readonly [string, ICartItem]> | null) {
        this._nativeMap = new Map(iterable);
    }

    get size() {
        return this._nativeMap.size;
    }

    get totalAmount() {
        return Array.from(this._nativeMap.values()).reduce((count, item) => count + item.amount, 0);
    }

    get(id: string) {
        return this._nativeMap.get(id);
    }

    set(id: string, item: ICartItem) {
        return this._nativeMap.set(id, item);
    }

    delete(id: string) {
        return this._nativeMap.delete(id);
    }

    clear() {
        return this._nativeMap.clear();
    }

    has(id: string) {
        return this._nativeMap.has(id);
    }

    entries() {
        return this._nativeMap.entries();
    }

    values() {
        return this._nativeMap.values();
    }

    keys() {
        return this._nativeMap.keys();
    }

    clone() {
        return new Cart(this.entries());
    }
}
