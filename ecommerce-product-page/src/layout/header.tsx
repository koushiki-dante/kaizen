import { X, Menu } from 'lucide-react';
import logo from '../assets/logo.svg';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Cart } from '@/components/domain/cart';
import { useMediaQuery } from '@uidotdev/usehooks';

export function Header() {
    const isLargeDevice = useMediaQuery('only screen and (min-width: 1024px)');

    return(
        <header className='flex items-center justify-between px-6 py-7 lg:max-h-24'>
            <div className='flex items-center gap-x-4 lg:gap-x-14'>
                {(!isLargeDevice) ? 
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className='h-max p-0 text-nt-400 hidden' type='button' variant='ghost'>
                                <Menu aria-hidden />
                                <span className='sr-only'>Open navigation menu</span>
                            </Button>
                        </SheetTrigger>

                        <SheetContent className='p-0 space-y-4 bg-nt-100' side='left'>
                            <div className='flex items-center min-h-24 px-6 py-7'>
                                <SheetClose asChild>
                                    <Button className='h-max p-0 text-nt-400' type='button' variant='ghost'>
                                        <X aria-hidden />
                                        <span className='sr-only'>Close navigation menu</span>
                                    </Button>
                                </SheetClose>
                            </div>

                            <NavigationMenu className='px-6'>
                                <NavigationMenuList className='flex flex-col items-start gap-y-8'>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink href='/' className='text-nt-600 text-lg font-bold'>Collection</NavigationMenuLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink href='/' className='text-nt-600 text-lg font-bold'>Men</NavigationMenuLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink href='/' className='text-nt-600 text-lg font-bold'>Women</NavigationMenuLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink href='/' className='text-nt-600 text-lg font-bold'>About</NavigationMenuLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink href='/' className='text-nt-600 text-lg font-bold'>Contact</NavigationMenuLink>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </SheetContent>
                    </Sheet> :
                    <></>
                }

                <a className='mb-1' href='/'>
                    <span className="sr-only">Go to Sneakers home page</span>
                    <img src={logo} alt='' />
                </a>

                {isLargeDevice ?
                    <NavigationMenu className='block'>
                        <NavigationMenuList className='gap-x-8'>
                            <NavigationMenuItem className='relative flex items-center h-24'>
                                <NavigationMenuLink href='/' className='peer text-nt-400 transition-colors hover:text-nt-600 focus-visible:text-nt-600'>
                                    Collection
                                </NavigationMenuLink>
                                <span role='none' className="absolute right-0 left-0 bottom-0 h-1 bg-nt-100 transition-colors peer-[:hover]:bg-primary-200 peer-[:focus-visible]:bg-primary-200" />
                            </NavigationMenuItem>

                            <NavigationMenuItem className='relative flex items-center h-24'>
                                <NavigationMenuLink href='/' className='peer text-nt-400 transition-colors hover:text-nt-600 focus-visible:text-nt-600'>
                                    Men
                                </NavigationMenuLink>
                                <span role='none' className="absolute right-0 left-0 bottom-0 h-1 bg-nt-100 transition-colors peer-[:hover]:bg-primary-200 peer-[:focus-visible]:bg-primary-200" />
                            </NavigationMenuItem>

                            <NavigationMenuItem className='relative flex items-center h-24'>
                                <NavigationMenuLink href='/' className='peer text-nt-400 transition-colors hover:text-nt-600 focus-visible:text-nt-600'>
                                    Women
                                </NavigationMenuLink>
                                <span role='none' className="absolute right-0 left-0 bottom-0 h-1 bg-nt-100 transition-colors peer-[:hover]:bg-primary-200 peer-[:focus-visible]:bg-primary-200" />
                            </NavigationMenuItem>

                            <NavigationMenuItem className='relative flex items-center h-24'>
                                <NavigationMenuLink href='/' className='peer text-nt-400 transition-colors hover:text-nt-600 focus-visible:text-nt-600'>
                                    About
                                </NavigationMenuLink>
                                <span role='none' className="absolute right-0 left-0 bottom-0 h-1 bg-nt-100 transition-colors peer-[:hover]:bg-primary-200 peer-[:focus-visible]:bg-primary-200" />
                            </NavigationMenuItem>
                            
                            <NavigationMenuItem className='relative flex items-center h-24'>
                                <NavigationMenuLink href='/' className='peer text-nt-400 transition-colors hover:text-nt-600 focus-visible:text-nt-600'>
                                    Contact
                                </NavigationMenuLink>
                                <span role='none' className="absolute right-0 left-0 bottom-0 h-1 bg-nt-100 transition-colors peer-[:hover]:bg-primary-200 peer-[:focus-visible]:bg-primary-200" />
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu> :
                    <></>
                }
            </div>

            <div className='flex items-center gap-x-6 xs:gap-x-11'>
                <Cart />

                <a href='/' className='group'>
                    <span className='sr-only'>Visit profile</span>

                    <Avatar className='ring-primary-200 transition-shadow group-[:hover]:ring-2 group-[:focus-visible]:ring-2 lg:w-11 lg:h-11'>
                        <AvatarImage src='../images/image-avatar.png' alt='G. K. Chesterton' />
                        <AvatarFallback>CH</AvatarFallback>
                    </Avatar>
                </a>
            </div>
        </header>
    );
}
