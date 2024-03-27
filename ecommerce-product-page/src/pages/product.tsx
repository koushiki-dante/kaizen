import { CounterBoard, CounterDecrease, CounterIncrease, CounterRoot } from '../components/ui/counter';
import { Button } from '../components/ui/button';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { ProductSlider } from '../components/domain/product-slider';
import { useContext, useRef } from 'react';
import { CartContext, ProductContext } from '@/App';

export function Product() {
    const product = useContext(ProductContext);
    const { cart, onCartChange, onCartItemAmountChange } = useContext(CartContext);
    const amountInputRef = useRef<HTMLInputElement>(null);

    function handleOnChange() {
        if (cart.has(product.id)) {
            onCartItemAmountChange('SUM', product.id, Number(amountInputRef.current?.value));
        } else {
            onCartChange(product, Number(amountInputRef.current?.value));
        }
    }

    const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: product.currency });
    const productHasDiscount = product.discountInPercentage > 0;

    return (
        <main className='lg:relative lg:grid lg:grid-cols-[472px_472px] lg:gap-x-8 lg:justify-center lg:px-6 lg:pt-12 lg:pb-16 2lg:gap-x-20 2lg:pt-24 2lg:pb-32 xl:gap-x-32'>
            <div className='hidden lg:absolute lg:right-0 lg:left-0 lg:mx-6 lg:block lg:h-px lg:bg-nt-600/10' role='none' />

            <ProductSlider />
            
            <div className='px-6 pt-6 pb-24 xs:max-w-[496px] xs:mx-auto xs:pt-[clamp(1.5rem,_5.25vw,_4rem)] md:max-w-xl lg:self-center lg:p-0'>
                <div>
                    <span className='uppercase tracking-widest font-medium text-xs text-primary-200 sm:text-sm'>{product.company}</span>
                    <h3 className='mt-5 tracking-wide font-bold text-3xl text-nt-500 xs:leading-none xs:text-[clamp(1.875rem,_6.25vw,_3rem)]'>Fall Limited Edition Sneakers</h3>
                    <p className='mt-7 font-light text-nt-400 lg:max-w-[48ch]'> 
                        {product.description}
                    </p>
                </div>
                <div className='flex items-center justify-between mt-9 xs:flex-col xs:items-start xs:gap-y-3'>
                    <div className='flex items-center gap-x-4'>
                        <span className='font-bold text-2xl text-nt-500 md:text-3xl'>
                            {currencyFormatter.format(productHasDiscount ? (product.price * product.discountInPercentage / 100) : product.price)}
                            <span className='sr-only'>Price</span>
                        </span>
                        {productHasDiscount ?
                            <span className='px-1.5 py-px tracking-wider font-medium text-primary-200 bg-primary-100/70 rounded-lg'>
                                {product.discountInPercentage}{'%'}
                                <span className='sr-only'>Discount</span>
                            </span> : 
                            <></>
                        }
                    </div>
                    {productHasDiscount ?
                        <div className='relative'>
                            <span className='font-medium text-nt-300 md:text-lg'>
                                {currencyFormatter.format(product.price)}
                                <span className='sr-only'>Original price, without discount applied to it.</span>
                            </span>
                            <div className='absolute right-0 left-0 top-1/2 h-px bg-nt-300' />
                        </div> :
                        <></>
                    }
                </div>

                <div className='mt-7 space-y-4 md:flex md:items-end md:gap-x-4 md:space-y-0'>
                    <CounterRoot
                        counter={{ config: { initialValue: product.minAmount, minValue: product.minAmount, maxValue: product.maxAmount } }}
                        className='flex items-center justify-between px-6 py-4 rounded-xl bg-nt-200 md:min-w-48 md:h-max md:px-4 lg:min-w-[156px]'
                    >
                        <CounterDecrease
                            className='p-0 h-max text-primary-200 transition-colors rounded-md outline-none hover:text-nt-200 hover:bg-primary-200 focus-visible:text-nt-200 focus-visible:bg-primary-200'
                        >
                            <Minus className='size-4 md:size-5 pointer-events-none' aria-hidden />
                            <span className='sr-only'>Decrease by 1</span>
                        </CounterDecrease>

                        <div>
                            <CounterBoard 
                                ref={amountInputRef}
                                className='w-8 font-bold text-base text-nt-500 text-center bg-transparent outline-none'
                            />
                            <span className='sr-only'>Count</span>
                        </div>

                        <CounterIncrease
                            className='p-0 h-max text-primary-200 transition-colors rounded-md outline-none hover:text-nt-200 hover:bg-primary-200 focus-visible:text-nt-200 focus-visible:bg-primary-200'
                        >
                            <Plus className='size-4 md:size-5 pointer-events-none' aria-hidden />
                            <span className='sr-only'>Increase by 1</span>
                        </CounterIncrease>
                    </CounterRoot>

                    <Button 
                        onClick={handleOnChange}
                        variant='unstyled' 
                        className='flex gap-x-3 w-full py-7 tracking-wide font-medium text-lg text-nt-100 rounded-xl shadow-2xl shadow-primary-200/50 bg-primary-200 transition-colors hover:bg-primary-200/70 focus-visible:bg-primary-200/70 focus-visible:ring-0'
                    >
                        <ShoppingBag className='size-6 -mt-px' aria-hidden />
                        Add to cart
                    </Button>
                </div>
            </div>
        </main>
    );
}
