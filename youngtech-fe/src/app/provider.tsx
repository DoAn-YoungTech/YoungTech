'use client';
import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux';
import { store } from '@/redux/Store';


export function ReduxProvider({ children}) {
  return (
    <SessionProvider>

      <Provider store={store}>
        {children}
      </Provider>
      </SessionProvider>
  );
}
