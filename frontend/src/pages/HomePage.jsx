import { lazy } from "react";
const Hero = lazy(() => import("../components/Hero.jsx"));
const HotelCards = lazy(() => import("../components/HotelCards.jsx"));
const ExclusiveOffer = lazy(() => import("../components/ExclusiveOffer.jsx"));
const Testimonials = lazy(() => import("../components/Testimonials.jsx"));

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <HotelCards />
      <ExclusiveOffer />
      <Testimonials />
    </div>
  );
};

export default HomePage;
