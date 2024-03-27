import { IProduct, ProductContext } from '@/App';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselThumb } from '../ui/carousel';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '../ui/dialog';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { useContext, useRef, useState } from 'react';

type ProductSliderProps = {
    product: IProduct,
}

function SmallDeviceProductSlider({ product }: ProductSliderProps) {
    return (
        <Carousel opts={{ loop: true, }} className='w-full'>
            <CarouselContent>
                {product.images.map((url, idx) => {
                    return (
                        <CarouselItem key={idx} className='basis-full md:basis-[640px] lg:basis-full'>
                            <img 
                                src={url}
                                alt={`Product image ${idx + 1}`}
                                loading='lazy'
                                decoding='async'
                                className='lg:rounded-3xl'
                            />
                        </CarouselItem>
                    );
                })}
            </CarouselContent>

            <CarouselPrevious className='size-9 left-4 top-1/2 border-none' />

            <CarouselNext className='size-9 right-4 top-1/2 border-none' />
        </Carousel>
    );
}

function LargeDeviceProductSlider({ product }: ProductSliderProps) {
    const [dialogCarouselStartIndex, setDialogCarouselStartIndex] = useState(0);
    const carouselNextRef = useRef<HTMLButtonElement>(null); 
    const carouselPrevRef = useRef<HTMLButtonElement>(null); 

    return (
        <Dialog>
            <Carousel opts={{ loop: true, }} className='w-full space-y-6'>
                <DialogTrigger className='rounded-3xl overflow-hidden outline-none'>
                    <CarouselContent>
                        {product.images.map((url, idx) => {
                            return (
                                <CarouselItem 
                                    key={idx} 
                                    onClick={() => setDialogCarouselStartIndex(idx)} 
                                    className='basis-full'
                                >
                                    <div className='rounded-3xl overflow-hidden'>
                                        <img 
                                            src={url}
                                            alt={`Product image ${idx + 1}`}
                                            loading='lazy'
                                            decoding='async'
                                        />
                                    </div>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    <span className='sr-only'>Open modal</span>
                </DialogTrigger>

                <div className='flex gap-x-7 justify-between'>
                    {product.thumbnails.map((src, idx) => {
                        return (
                            <CarouselThumb 
                                key={idx} 
                                index={idx} 
                                className='group basis-24 h-24 rounded-xl overflow-hidden transition-shadow data-[active=true]:ring-2 data-[active=true]:ring-primary-200'
                            >
                                <div className='pointer-events-none relative'>
                                    <img 
                                        src={src}
                                        alt={`Product thumbnail ${idx + 1}`}
                                        loading='lazy'
                                        decoding='async'
                                        className=''
                                    />
                                    <div className='absolute inset-0 bg-transparent transition-colors group-data-[active=true]:bg-white/50' />
                                </div>
                            </CarouselThumb>
                        );
                    })}
                </div>
            </Carousel>

            <DialogContent 
                onKeyDown={(e) => { 
                    if(e.key === 'ArrowRight') {
                        carouselNextRef.current?.click(); 
                    } else if (e.key === 'ArrowLeft') {
                        carouselPrevRef.current?.click(); 
                    }
                }} 
                className='bg-transparent border-none max-w-[50vw]'
            >
                <DialogClose asChild>
                    <Button variant='unstyled' className='absolute -right-2/4 top-[3.1%] -translate-x-1/2 transition-colors text-nt-300 hover:text-nt-200 focus-visible:text-nt-200 focus-visible:ring-0'> 
                        <X className='size-9 pointer-events-none' aria-hidden />
                        <span className='sr-only'>Close modal</span>
                    </Button>
                </DialogClose>

                <Carousel opts={{ loop: true, startIndex: dialogCarouselStartIndex }} className='w-full'>
                    <CarouselContent>
                        {product.images.map((url, idx) => {
                            return (
                                <CarouselItem key={idx} className='basis-full'>
                                    <img 
                                        src={url}
                                        alt={`Product image ${idx + 1}`}
                                        loading='lazy'
                                        decoding='async'
                                    />
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>

                    <CarouselPrevious 
                        ref={carouselPrevRef} 
                        className='size-9 -left-2/4 top-1/2 border-none lg:size-11' 
                    />

                    <CarouselNext 
                        ref={carouselNextRef} 
                        className='size-9 -right-2/4 top-1/2 border-none lg:size-11' 
                    />
                </Carousel>
                
            </DialogContent>
        </Dialog>
    );
}

export function ProductSlider() {
    const product = useContext(ProductContext);
    const isLargeDevice = useMediaQuery('only screen and (min-width: 1024px)');

    return (
        <>
            { isLargeDevice ?
                <LargeDeviceProductSlider product={product} /> : 
                <SmallDeviceProductSlider product={product} />
            }
        </>
    );
}
