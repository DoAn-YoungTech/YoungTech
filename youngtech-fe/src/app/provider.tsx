'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/Store';


export function ReduxProvider({ children}) {
  return (
   
      <Provider store={store}>
        {children}
      </Provider>
   
  );
}