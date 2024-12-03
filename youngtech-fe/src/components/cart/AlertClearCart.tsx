import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { removeCartItem, fetchCartItems } from "@/redux/Cart/cartThunks";
import { useDispatch } from "react-redux";

export function AlertClearCart({ setIsAlertClear, idItemCart }) {
  const dispatch = useDispatch();

  const handleClickClearItemCart = async (id: number) => {
    try {
      setIsAlertClear(false);
      // Xóa mục khỏi giỏ hàng
      await dispatch(removeCartItem(id));

      // Sau khi xóa thành công, gọi lại dữ liệu giỏ hàng
      await dispatch(fetchCartItems());
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa không?</AlertDialogTitle>
          <AlertDialogDescription>
            Sản phẩm sẽ được xóa khỏi giỏ hàng của bạn.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsAlertClear(false)}>
            Không
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleClickClearItemCart(idItemCart)}>
            Có
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
