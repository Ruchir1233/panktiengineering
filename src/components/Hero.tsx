
const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/lovable-uploads/homeimage.png')`
        }}
      ></div>
      <div className="container mx-auto px-4 relative z-20 text-white">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            QUALITY IRON & STEEL FABRICATION WORKS
          </h1>
          <p className="text-2xl mb-8 text-gray-200">
            Since 1984
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
