'use client'
import SupplierPage from "@/components/admin/suppliers/suppliers";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function Home() {
  return (
    <Provider store={store}>
      <div>
        <SupplierPage />
      </div>
    </Provider>
  );
}
