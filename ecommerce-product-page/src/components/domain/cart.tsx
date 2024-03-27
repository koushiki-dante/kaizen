import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet';
import { useContext } from 'react';
import { CartContext } from '@/App';
import { ICartItem } from '@/lib/cart';
import { CounterBoard, CounterDecrease, CounterIncrease, CounterRoot } from '../ui/counter';

type CartItemProps = { 
    item: ICartItem;
    onRemoveItem(id: string): void;
    onCartItemAmountChange(action: 'SUM' | 'OVERRIDE', id: string, amount: number): void;
}

function CartItem({ item, onRemoveItem, onCartItemAmountChange }: CartItemProps) {
    const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: item.currency });

    function onAmountChange(amount: number) {
        onCartItemAmountChange('OVERRIDE', item.id, amount);
    }

    return (
        <div className='flex gap-x-4 p-6 pb-7 bg-nt-100 shadow-sm xs:gap-x-6'>
            <img
                src={item.thumbnail}
                alt={item.title}
                loading='lazy'
                decoding='async'
                className='w-16 h-16 aspect-square rounded-md xs:w-20 xs:h-20'
            />

            <div className='shrink flex flex-col justify-between gap-y-4 max-w-32 xs:max-w-56'>
                <h4 className='text-base align-top font-medium text-nt-600 xs:text-lg'>{item.title}</h4>

                <div className='flex -ml-20 pt-2 items-center gap-x-3 text-nt-400 md:text-base xs:ml-0 xs:pt-0'>
                    <span>
                        {currencyFormatter.format(
                            item.discountInPercentage > 0 ? 
                                item.price * item.discountInPercentage / 100 : 
                                item.price
                            ) 
                        }
                    </span>

                    <span>x</span>

                    <CounterRoot
                        counter={{ onCountChange: onAmountChange, config: { initialValue: item.amount, minValue: item.minAmount, maxValue: item.maxAmount } }}
                        className='flex items-center justify-between gap-x-1 px-2 py-1 ring-1 ring-nt-300 rounded-md bg-nt-100 md:max-w-max'
                    >
                        <CounterDecrease
                            className='p-0 h-max text-nt-600 transition-colors rounded-md outline-none hover:text-nt-100 hover:bg-nt-600 focus-visible:text-nt-100 focus-visible:bg-nt-600'
                        >
                            <Minus className='size-4 pointer-events-none' aria-hidden />
                            <span className='sr-only'>Decrease by 1</span>
                        </CounterDecrease>

                        <div className='-mt-px'>
                            <CounterBoard 
                                className='w-8 text-sm text-nt-600 text-center bg-transparent outline-none'
                            />
                            <span className='sr-only'>Count</span>
                        </div>

                        <CounterIncrease
                            className='p-0 h-max text-nt-600 transition-colors rounded-md outline-none hover:text-nt-100 hover:bg-nt-600 focus-visible:text-nt-100 focus-visible:bg-nt-600'
                        >
                            <Plus className='size-4 pointer-events-none' aria-hidden />
                            <span className='sr-only'>Increase by 1</span>
                        </CounterIncrease>
                    </CounterRoot>
                </div>
            </div>
            
            <div className='grow flex flex-col justify-between items-end gap-y-4'>
                <Button
                    onClick={() => onRemoveItem?.(item.id)}
                    variant='unstyled'
                        className='h-max p-0 bg-nt-100 text-xs font-normal tracking-widest underline underline-offset-2 text-nt-400 uppercase transition-all hover:text-nt-600 focus-visible:text-nt-600 focus-visible:ring-0' 
                >
                    Remove
                </Button>

                <span className='text-base font-medium text-nt-600 xs:-mb-px xs:text-lg'>{currencyFormatter.format(item.totalPrice)}</span>
            </div>
        </div>
    );
}

export function Cart() {
    const { cart, dispatch, onCartItemAmountChange } = useContext(CartContext);

    function onRemoveItem(itemId: string){
        dispatch({ type: 'DELETE', id: itemId, });
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className='relative h-max p-0 text-nt-400 transition-colors hover:text-nt-600 focus-visible:text-nt-600 focus-visible:ring-0' type='button' variant='unstyled'>
                    <ShoppingBag className='pointer-events-none' aria-hidden />
                    <span className={
                        'absolute -right-5 -top-2 min-w-7 pb-px pt-0.5 px-2 text-xs text-nt-100 rounded-xl bg-primary-200 transition-opacity opacity-0'
                            .concat(cart.totalAmount > 0 ? ' opacity-100' : '')
                    }>
                        {cart.totalAmount}
                    </span>
                    <span className='sr-only'>Open your cart</span>
                </Button>
            </SheetTrigger>

            <SheetContent className='w-full p-0 bg-nt-100 max-w-96 xs:min-w-[480px] xs:max-w-[480px]'>
                <div className='flex flex-col w-full h-full'>
                    <div className='flex justify-between items-center p-6'>
                        <span className='text-base text-nt-600 font-bold uppercase tracking-wider'>Cart</span>

                        <SheetClose asChild>
                            <Button variant='unstyled' className='p-0 text-nt-400 bg-transparent transition-colors hover:text-nt-600 focus-visible:text-nt-600 focus-visible:ring-0'>
                                <X className='size-6' />
                                <span className='sr-only'>Close cart</span>
                            </Button>
                        </SheetClose>
                    </div>

                    <Separator className='bg-nt-600/10' />

                    {cart.size === 0 ?
                        <div className='flex flex-col items-center justify-center gap-y-8 h-full px-6'>
                            <span className='text-lg text-center text-nt-600 tracking-wider font-medium xs:text-xl'>
                                Your cart is still empty. <br />
                                Would you like some suggestions?
                            </span>
                            <div className='flex flex-col gap-y-3 w-full px-6'>
                                <a href='/'
                                    className='text-center py-3 border border-nt-300 rounded-xl font-medium tracking-widert text-nt-600 text-lg bg-nt-100 transition-colors hover:bg-nt-600 hover:text-nt-100 focus-visible:bg-nt-600 focus-visible:text-nt-100' 
                                >Men</a>
                                <a href='/'
                                    className='text-center py-3 border border-nt-300 rounded-xl font-medium tracking-widert text-nt-600 text-lg bg-nt-100 transition-colors hover:bg-nt-600 hover:text-nt-100 focus-visible:bg-nt-600 focus-visible:text-nt-100' 
                                >Women</a>
                                <a href='/'
                                    className='text-center py-3 border border-nt-300 rounded-xl font-medium tracking-widert text-nt-600 text-lg bg-nt-100 transition-colors hover:bg-nt-600 hover:text-nt-100 focus-visible:bg-nt-600 focus-visible:text-nt-100' 
                                >Collections</a>
                            </div>
                        </div> :
                        <div className='grow grid grid-flow-row items-stretch gap-y-8 bg-nt-400/5'>
                            <div>
                                {Array.from(cart.values()).map((item, idx) => {
                                    return (
                                        <CartItem 
                                            key={idx} 
                                            item={item}
                                            onRemoveItem={onRemoveItem}
                                            onCartItemAmountChange={onCartItemAmountChange}
                                        />
                                    );
                                })}
                            </div>

                            <div className='self-end p-6 bg-nt-100 drop-shadow-2xl'>
                                <Button 
                                    variant='unstyled' 
                                    className='flex gap-x-3 w-full py-7 tracking-wider font-medium text-lg text-nt-100 rounded-xl shadow-sm bg-nt-500 transition-all hover:bg-nt-500/95 focus-visible:bg-nt-500/95 focus-visible:ring-0'
                                >
                                    Checkout
                                </Button>
                            </div>
                        </div>
                    }      
                </div>
            </SheetContent>
        </Sheet>
    );
}
