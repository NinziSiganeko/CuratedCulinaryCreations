import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import OnlineOrders from "./pages/OnlineOrders";
import Menus from "./pages/Menus";
import Reservations from "./pages/Reservations";
import Experiences from "./pages/Experiences";
import Subscriptions from "./pages/Subscriptions";

export default function App() {
  return (
    <MainLayout>
      <Home />
      <OnlineOrders />
      <Menus />
      <Reservations />
      <Experiences />
      <Subscriptions />
    </MainLayout>
  );
}
