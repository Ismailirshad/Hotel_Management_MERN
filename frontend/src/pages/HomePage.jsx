import { lazy, Suspense } from "react";
const Hero = lazy(() => import("../components/Hero.jsx"));
const HotelCards = lazy(() => import("../components/HotelCards.jsx"));
const ExclusiveOffer = lazy(() => import("../components/ExclusiveOffer.jsx"));
const Testimonials = lazy(() => import("../components/Testimonials.jsx"));

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<appSkeleton />}>
        <Hero />
        <HotelCards />
        <ExclusiveOffer />
        <Testimonials />
      </Suspense>
    </div>
  );
};

export default HomePage;
