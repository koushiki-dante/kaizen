import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { Toaster } from 'sonner';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
        <Toaster 
            position='bottom-right'
            toastOptions={{
                unstyled: true,
                classNames: {
                    toast: 'flex items-center gap-x-2 p-4 w-[356px] rounded-md',
                    success: 'text-lime-950 bg-lime-300',
                    error: 'text-red-950 bg-red-300',
                },
            }}
        />
    </React.StrictMode>,
)
