import aliceImg from '../assets/zain.jpg';
import rajImg from '../assets/fawad.jpg';
import saraImg from '../assets/danial.jpg';

export default function About() {
  const team = [
    {
      name: "Zain Ammad Khan 🎨",
      role: "Founder & Designer",
      image: aliceImg,
    },
    {
      name: "Fawad Amir 🚀",
      role: "Marketing Lead",
      image: rajImg,
    },
    {
      name: "Danial Eshtiaq✨",
      role: "Creative Director",
      image: saraImg,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#f5f5dc] via-[#e3dcc3] to-[#d1c8b3] min-h-screen text-gray-900 font-serif">

      <section className="py-24 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-[#1c1c1c] tracking-wide drop-shadow-sm">
          About <span className="text-[#d4af37]">Shirtopia</span>
        </h1>
        <p className="text-xl md:text-2xl max-w-xl mx-auto text-gray-700 font-medium">
          Where comfort meets style — crafted for creators, dreamers, and go-getters.
        </p>
      </section>

      <section className="bg-white bg-opacity-80 rounded-3xl shadow-lg py-16 px-8 mx-4 md:mx-20 mb-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1602810318383-2c3b9c3ec320?auto=format&fit=crop&w=600&q=80"
          alt="Shirtopia team"
          className="rounded-2xl shadow-md transition duration-500 grayscale hover:grayscale-0 hover:shadow-xl"
        />
        <div>
          <h2 className="text-4xl font-bold mb-5 text-[#1c1c1c]">Our Story</h2>
          <p className="text-gray-800 text-lg leading-relaxed mb-4 font-semibold">
            Shirtopia was born out of a simple idea — everyone deserves t-shirts that feel good, look great, and last long.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed font-medium">
            What started in a college dorm quickly turned into a thriving movement of style-forward streetwear with heart.
            Every Shirtopia tee is made with purpose — premium materials, ethical sourcing, and sustainable practices.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-20 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-[#d4af37]">
          Our Mission 🚀
        </h2>
        <p className="text-lg text-gray-800 font-medium">
          To inspire confidence and creativity through comfortable, high-quality apparel.
          We're committed to sustainability, innovation, and making fashion accessible to all.
        </p>
      </section>

      <section className="py-16 px-6 md:px-20 max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-14 text-[#1c1c1c] text-center">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {team.map(({ name, role, image }, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition duration-300 border border-gray-200 hover:border-[#d4af37]"
            >
              <img
                src={image}
                alt={name}
                className="w-28 h-28 mx-auto rounded-full object-cover mb-5 border-4 border-[#d4af37] shadow-md grayscale contrast-125"
              />
              <h3 className="text-2xl font-bold text-[#1c1c1c] mb-2">{name}</h3>
              <p className="text-gray-700 font-medium">{role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#d4af37] py-16 text-center rounded-t-3xl shadow-lg">
        <h3 className="text-3xl font-extrabold mb-4 text-[#1c1c1c]">
          Join the Shirtopia Movement ✨
        </h3>
        <p className="text-[#1c1c1c] text-lg font-semibold mb-8 max-w-xl mx-auto">
          Sign up for our newsletter and get early access to new drops & exclusive deals.
        </p>
        <a
          href="/shop"
          className="inline-block bg-[#1c1c1c] text-[#d4af37] px-8 py-3 rounded-full font-bold text-xl hover:bg-[#333] transition"
        >
          Explore the Shop
        </a>
      </section>
    </div>
  );
}
