import React from "react";
import MainLayout from "./layouts/MainLayout.jsx";
import ExperiencesScreen from "./pages/ExperiencesScreen.jsx";
import HomeScreen from "./pages/HomeScreen.jsx";
import MenusScreen from "./pages/MenusScreen.jsx";
import OnlineOrdersScreen from "./pages/OnlineOrdersScreen.jsx";
import ReservationsScreen from "./pages/ReservationsScreen.jsx";
import SubscriptionsScreen from "./pages/SubscriptionsScreen.jsx";

const pages = {
  "/": HomeScreen,
  "/home": HomeScreen,
  "/online-orders": OnlineOrdersScreen,
  "/menus": MenusScreen,
  "/reservations": ReservationsScreen,
  "/experiences": ExperiencesScreen,
  "/subscriptions": SubscriptionsScreen,
};

function NotFoundScreen() {
  return <section className="simple-page">
    <p className="eyebrow">Page not found</p>
    <h1>We couldn't find that page.</h1>
    <a className="button button-primary" href="/">Return home</a>
  </section>;
}

function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const Page = pages[path] || NotFoundScreen;
  return <MainLayout><Page /></MainLayout>;
}

export default App;
