'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/Store';
import { SessionProvider } from "next-auth/react";
import useAuthSync from "@/hooks/useAuthSync";

export function ReduxProvider({ pageProps, children }: { pageProps: any; children: React.ReactNode }) {
  const session = pageProps?.session || null; // Kiểm tra session có tồn tại không

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <AuthSyncWrapper>
          {children}
        </AuthSyncWrapper>
      </Provider>
    </SessionProvider>
  );
}

// AuthSyncWrapper: Gọi useAuthSync sau khi ReduxProvider được bọc bởi SessionProvider
function AuthSyncWrapper({ children }: { children: React.ReactNode }) {
  useAuthSync(); // Bây giờ useSession sẽ hoạt động vì đã có SessionProvider
  return <>{children}</>;
}
