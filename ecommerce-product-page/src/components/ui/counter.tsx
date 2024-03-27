import { ChangeEvent, ReactNode, createContext, forwardRef, useContext, useEffect, useState } from "react";

interface CounterConfig {
    initialValue: number;
    minValue: number;
    maxValue: number;
}

interface CounterProps {
    onCountChange?: (count: number) => void;
    config?: CounterConfig
}

type CounterRootProps = { className?: string, children?: ReactNode | undefined } & {
    counter: CounterProps
}; 

type CounterBoardProps = { className?: string, };

type CounterDecreaseProps = { className?: string, children?: ReactNode | undefined };

type CounterIncreaseProps = { className?: string, children?: ReactNode | undefined };

type CounterContextProps = CounterProps & {
    count: number,
    setCount(count: number): void,
};

export const CounterContext = createContext<CounterContextProps | undefined>(undefined);

export function CounterRoot({ children, counter, className }: CounterRootProps) {
    const [count, setCount] = useState(counter.config?.initialValue ? counter.config.initialValue : 1);
    
    useEffect(() => {
        counter.onCountChange?.(count);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    return (
        <form onSubmit={(e: ChangeEvent<HTMLFormElement>) => e.preventDefault()}>
            <CounterContext.Provider value={{...counter, count, setCount}}>
                <div className={className}>
                    {children}
                </div>
            </CounterContext.Provider>
        </form>
    );
}
export const CounterBoard = forwardRef<HTMLInputElement, CounterBoardProps>(function CounterBoard({ className }: CounterBoardProps, ref) {
    const ctx = useContext(CounterContext);

    if (!ctx) {
        throw new Error("<CounterBoard /> must be used within a <CounterRoot />.")
    }

    const { config, count, setCount } = ctx;

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        const count = Number(e.target.value);

        if(config) {
            if(count > config.maxValue) {
                setCount(config.maxValue);
                return;
            } else if (count < config.minValue) {
                setCount(config.minValue);
                return;
            }
        }

        setCount(count);
    }

    return (
        <input
            ref={ref}
            value={count}
            onChange={onChange}
            type='number' 
            className={className}
        />
    );
})

export function CounterIncrease({ children, className }: CounterIncreaseProps) {
    const ctx = useContext(CounterContext);

    if (!ctx) {
        throw new Error("<CounterIncrease /> must be used within a <CounterRoot />.")
    }

    const { config, count, setCount } = ctx;

    function increase() {
        if(config) {
            if(count >= config.maxValue) {
                return;
            }
        }

        setCount(count + 1);
    }

    return (
        <button 
            onClick={increase}
            type='button'
            className={className} 
        >
            {children}
        </button>
    );
}

export function CounterDecrease({ children, className }: CounterDecreaseProps) {
    const ctx = useContext(CounterContext);

    if (!ctx) {
        throw new Error("<CounterDecrease /> must be used within a <CounterRoot />.")
    }

    const { config, count, setCount } = ctx;

    function decrease() {
        if(config) {
            if(count <= config.minValue) {
                return;
            }
        }

        setCount(count - 1);
    }

    return (
        <button 
            onClick={decrease}
            type='button'
            className={className} 
        >
            {children}
        </button>
    );
}
