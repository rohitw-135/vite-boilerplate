import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ReactDOM from 'react-dom/client';
import './../global.css';
import Pages from './pages';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 1800000
        },
        mutations: {
            retry: false
        }
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Pages />
        </QueryClientProvider>
    </React.StrictMode>
);
