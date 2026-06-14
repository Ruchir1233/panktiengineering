import { Star } from "lucide-react";

const platforms = [
  {
    name: "Google",
    rating: "5.0",
    reviews: "72",
    link: "https://share.google/vJzqng6O1HGMQAg5R",
    logo: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    color: "border-blue-100 hover:border-blue-300",
    starsColor: "text-yellow-400 fill-yellow-400",
  },
  {
    name: "JustDial",
    rating: "5.0",
    reviews: "71",
    link: "https://www.justdial.com/Valsad/Pankti-Engineering-Near-Dhamdachi-Near-Gundlav-Dhamdachi/nct-10856234",
    logo: (
      <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center">
        <span className="text-white font-black text-xs">JD</span>
      </div>
    ),
    color: "border-orange-100 hover:border-orange-300",
    starsColor: "text-yellow-400 fill-yellow-400",
  },
  {
    name: "IndiaMART",
    rating: "4.8",
    reviews: "Listed",
    link: "https://www.indiamart.com/pankti-engineering-valsad/",
    logo: (
      <div className="w-7 h-7 rounded-full flex items-center justify-center bg-green-600">
        <span className="text-white font-black text-xs">iM</span>
      </div>
    ),
    color: "border-green-100 hover:border-green-300",
    starsColor: "text-yellow-400 fill-yellow-400",
  },
];

const PlatformRatings = () => (
  <section className="py-12 bg-white border-b border-gray-100">
    <div className="container mx-auto px-4">
      <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">
        Rated Highly Across Platforms
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {platforms.map((p) => (
          <a
            key={p.name}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-4 bg-white border-2 ${p.color} rounded-2xl px-6 py-4 transition-all shadow-sm hover:shadow-md`}
          >
            {p.logo}
            <div>
              <div className="text-xs text-gray-400 font-medium">{p.name}</div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-gray-900 text-lg">{p.rating}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${p.starsColor}`} />
                  ))}
                </div>
              </div>
              <div className="text-xs text-gray-400">{p.reviews} reviews</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default PlatformRatings;
