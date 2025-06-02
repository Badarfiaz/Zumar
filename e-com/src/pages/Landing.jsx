
import Footer from '../components/Footer';
import Banner from '../components/Banner';


const Landing = () => {
  return (
    <>
         <Banner
        title="Welcome to Shirtopia"
        subtitle="Discover premium t-shirts that match your vibe."
        imageUrl="https://images.unsplash.com/photo-1541099649105-f69ad21f3246"
        buttonText="Shop Now"
        link="/shop"
      />
      <Footer />
    </>
  );
};

export default Landing;