import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Rajesh Patel",
    location: "Valsad",
    date: "March 2024",
    text: "Excellent work by Pankti Engineering! Got my main gate fabricated and the finish is outstanding. Very professional team, delivered on time. Highly recommended for anyone in Valsad.",
    rating: 5,
    avatar: "RP",
  },
  {
    name: "Suresh Mehta",
    location: "Vapi",
    date: "January 2024",
    text: "We hired Pankti Engineering for staircase railing and boundary wall work in our new house. Quality is top notch and the price was very reasonable. The owner is very cooperative.",
    rating: 5,
    avatar: "SM",
  },
  {
    name: "Dipika Vasava",
    location: "Valsad",
    date: "November 2023",
    text: "Best fabrication shop in Valsad! Got rolling shutters installed for my shop. Work was clean and fast. My neighbours also got their work done after seeing mine.",
    rating: 5,
    avatar: "DV",
  },
  {
    name: "Kiran Shah",
    location: "Navsari",
    date: "October 2023",
    text: "Very happy with the iron grill work for our bungalow. Pankti Engineering delivered exactly what was shown in the design. Will definitely come back for more work.",
    rating: 5,
    avatar: "KS",
  },
  {
    name: "Mahesh Trivedi",
    location: "Valsad",
    date: "August 2023",
    text: "Got a roofing shed fabricated for our factory. Strong structure, good quality steel, and completed within the promised timeline. Genuinely trustworthy business.",
    rating: 4,
    avatar: "MT",
  },
  {
    name: "Pratik Desai",
    location: "Bilimora",
    date: "June 2023",
    text: "I have been a customer of Pankti Engineering for 10+ years. Every time the quality has been consistent and excellent. They are the best in this area without any doubt.",
    rating: 5,
    avatar: "PD",
  },
];

const OVERALL_RATING = 4.8;
const TOTAL_REVIEWS = 24;

const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) => {
  const starClass = size === "lg" ? "w-6 h-6" : "w-4 h-4";
  return (
    <div className="flex gap-0.5">
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
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">What Our Clients Say</h2>

          {/* Google Rating Summary */}
          <div className="inline-flex items-center gap-6 bg-white border border-gray-200 rounded-2xl px-8 py-5 shadow-sm mt-4">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div>
                <div className="text-xs text-gray-500 font-medium">Google Reviews</div>
                <div className="text-xs text-gray-400">Pankti Engineering, Valsad</div>
              </div>
            </div>
            <div className="h-10 w-px bg-gray-200"></div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-gray-900">{OVERALL_RATING}</div>
              <StarRating rating={5} size="sm" />
              <div className="text-xs text-gray-500 mt-1">{TOTAL_REVIEWS} reviews</div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Top: Google logo + stars */}
              <div className="flex items-center justify-between mb-4">
                <StarRating rating={review.rating} />
                <svg viewBox="0 0 24 24" className="w-5 h-5 opacity-70" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>

              {/* Review text */}
              <Quote className="w-6 h-6 text-orange-200 mb-2" />
              <p className="text-gray-700 leading-relaxed flex-grow text-sm">{review.text}</p>

              {/* Reviewer info */}
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {review.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{review.name}</div>
                  <div className="text-xs text-gray-400">{review.location} · {review.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Google */}
        <div className="text-center mt-10">
          <a
            href="https://share.google/vJzqng6O1HGMQAg5R"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            View all {TOTAL_REVIEWS} reviews on Google Maps →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
