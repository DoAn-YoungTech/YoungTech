// import Method from "./method";
// import { GiTakeMyMoney } from "react-icons/gi";
// import { SiZalo } from "react-icons/si";
// export default function DynamicCardsVariant2() {
//   return (
//     <div className="grid relative p-2 grid-cols-1 w-5/6 gap-2 md:grid-cols-2">
//       <Method
//         title="Trực tiếp"
//         icon={<GiTakeMyMoney className="h-10 w-10" />}
//         description="Thanh toán khi nhận hàng"
//       />
//       <Method
//         title="ZaloPay"
//         icon={<SiZalo className="h-10 w-10 text-blue-500" />}
//         description="Chuyển khoản"
//       />
//       <Method
//         title="MoMo"
//         icon={<GiTakeMyMoney className="h-10 w-10" />}
//         description="Chuyển khoản nhận hàng"
//       />
//     </div>
//   );
// }
import { MainMenusGradientCard } from "./payment";

export default function DynamicCardsVariant2() {
  return (
    <div className="grid relative p-2 justify-between gap-2  grid-cols-2">
      <MainMenusGradientCard
        className="p-4"
        description="Thanh toán khi nhận hàng"
        title="Trả tiền mặt"
      >
       
      </MainMenusGradientCard>
      <MainMenusGradientCard
        className="p-4"
        description="Ví MoMo"
        title="MoMo"
      >
    
      </MainMenusGradientCard>
      <MainMenusGradientCard
        description="Thanh toán qua ZaloPay"
        title="Hỗ trợ hình thức thanh toán"
      />
      <MainMenusGradientCard
        description="Ví điện tử"
        title="Quét mã QR để thanh toán"
      >
        
      </MainMenusGradientCard>
    </div>
  );
}
