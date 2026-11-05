import { Star, Quote, ExternalLink } from "lucide-react";
import { GOOGLE } from "@/lib/business";

// Real reviews copied word-for-word from the Pankti Engineering Google Business
// Profile (checked 5 Nov 2026). Do not edit the text. To refresh, copy new
// reviews exactly as the customer wrote them and keep their real star rating.
// Google only shows relative dates ("3 months ago"), so none are shown here.
const reviews = [
  {
    name: "Dr.Rohini Kashyap",
    meta: "Google review",
    text: "We recently had a tin shade installed at our home and are very happy with the work. The installer was punctual, professional, and completed the job neatly with excellent finishing. The work was completed on time, and the quality exceeded our expectations. Highly recommended for reliable and skilled tin shade installation services.",
    rating: 5,
  },
  {
    name: "Dhara Barot",
    meta: "Google review",
    text: "Excellent work of safety door by Pankti engineering team and Rohit uncle. The door is well-finished and fits perfectly. Installation was done on time with clean workmanship, attention to detail and fixed other minor issues in existing doors which is really appreciated. Very professional, polite staff, and great value for money. Highly recommended.",
    rating: 5,
  },
  {
    name: "Divyang Rathod",
    meta: "Local Guide · Google review",
    text: "Very happy with the safety door quality and finishing. Installation was neat and on time. their dedication and honesty truly show in the work.\n\nHighly recommended for home and office needs. Value for money!",
    rating: 5,
  },
  {
    name: "Yash Patel",
    meta: "Google review",
    text: "Highly recommend Pankti Engineering for their excellent metal services . Their craftsmanship and reliability make them stand out for any metal project. A top choice for iron work, roofing, and fabrication.",
    rating: 5,
  },
  {
    name: "R P",
    meta: "Google review",
    text: "Precise work and Professional company handling end to end work with accountability and on time completion",
    rating: 4,
  },
  {
    name: "kamal chaudhari",
    meta: "Google review",
    text: "Good quality work done by pankti engineering at my home ,timely did it and very cooperative staff,thx to rohit bhai",
    rating: 5,
  },
  {
    name: "Parth Shah",
    meta: "Google review",
    text: "Good and very precise work as per our requirements.\nVery good response time and as per the commitment.",
    rating: 5,
  },
  {
    name: "Jayesh Kothawala",
    meta: "Google review",
    text: "Good, qualitative and timely job doing by m/s pankti engineering",
    rating: 5,
  },
  {
    name: "Sunil K",
    meta: "Local Guide · Google review",
    text: "Prompt service. Good finishing.",
    rating: 5,
  },
];

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("") || "G";

const GoogleG = ({ className }: { className: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) => {
  const starClass = size === "lg" ? "w-6 h-6" : "w-4 h-4";
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${starClass} ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-orange-500 font-semibold uppercase tracking-widest text-sm mb-3 block">Customer Reviews</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            <a
              href={GOOGLE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
            >
              What Our Clients Say ↗
            </a>
          </h2>

          {/* Google Rating Summary */}
          <div className="inline-flex items-center gap-6 bg-white border border-gray-200 rounded-2xl px-8 py-5 shadow-sm mt-4">
            <div className="flex items-center gap-3">
              <GoogleG className="w-8 h-8" />
              <div>
                <div className="text-xs text-gray-500 font-medium">Google Reviews</div>
                <div className="text-xs text-gray-400">Pankti Engineering, Valsad</div>
              </div>
            </div>
            <div className="h-10 w-px bg-gray-200"></div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-gray-900">{GOOGLE.rating.toFixed(1)}</div>
              <StarRating rating={Math.round(GOOGLE.rating)} size="sm" />
              <div className="text-xs text-gray-500 mt-1">{GOOGLE.reviewCount} reviews</div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <StarRating rating={review.rating} />
                <GoogleG className="w-5 h-5 opacity-70" />
              </div>

              <Quote className="w-6 h-6 text-orange-200 mb-2" />
              <p className="text-gray-700 leading-relaxed flex-grow text-sm whitespace-pre-line">{review.text}</p>

              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {initials(review.name)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{review.name}</div>
                  <div className="text-xs text-gray-400">{review.meta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href={GOOGLE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-orange-500 hover:text-orange-500 text-gray-700 font-semibold px-6 py-3 rounded-xl shadow-sm transition-colors"
          >
            Read all {GOOGLE.reviewCount} reviews on Google
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
