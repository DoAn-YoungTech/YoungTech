import AppCategories from "@/components/users/page/app.categories";
import AppMainHome from "@/components/users/home/app.mainHome";
import Header from "@/components/users/page/app.header";


export default function Home() {
  return (
  <>
  <Header/>
    <AppCategories/>
    <AppMainHome/>
  </>
  );
}
