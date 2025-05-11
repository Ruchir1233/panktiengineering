
import { Scroll } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Ravi Sharma",
    text: "Excellent job done by Pankti Engineering for Iron Gate Manufacturing",
    rating: 4,
  },
  {
    name: "Harpreet Singh",
    text: "Good job excellent Fabrication Services Provider in Indore",
    rating: 4,
  },
  {
    name: "Gaurav Yadav",
    text: "I recommended to Pankti Engineering for Quality Works",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Scroll className="w-12 h-12 text-orange-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-orange-500">TESTIMONIALS</h2>
        </div>
        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="bg-orange-500 text-white rounded-lg p-6 h-full">
                    <div className="flex flex-col h-full">
                      <p className="text-lg mb-4">{testimonial.text}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-semibold">{testimonial.name}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-xl ${
                                i < testimonial.rating
                                  ? "text-white"
                                  : "text-orange-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
