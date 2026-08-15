"use client";
import HeroBanner from '@/components/home/HeroBanner';
import Categories from '@/components/home/Categories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Statistics from '@/components/home/Statistics';
import SuccessStories from '@/components/home/SuccessStories';
import Sustainability from '@/components/home/Sustainability';
import TrustedSellers from '@/components/home/TrustedSellers';
import CallToAction from '@/components/home/CallToAction';

const Home = () => {
  return (
    <div className="min-h-screen bg-base-100 w-full">
      <HeroBanner />
      <Categories />
      <FeaturedProducts />
      <Statistics />
      <SuccessStories />
      <Sustainability />
      <TrustedSellers />
      <CallToAction />
    </div>
  );
};

export default Home;
