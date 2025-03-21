"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Testimonials data
const testimonials = [
  {
    quote:
      "DeSoc Agent revolutionized how I participate in DAOs. My agent now handles all governance votes aligned with my interests while I focus on building.",
    name: "Alex Morgan",
    title: "Founder, MetaVerse Ventures",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    quote:
      "The reputation management feature saved me countless hours. My Web3 presence has grown dramatically without me having to manually engage everywhere.",
    name: "Sarah Chen",
    title: "Lead Developer, Ethereum Foundation",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    quote:
      "My agent writes technical content that's indistinguishable from my own style. It's boosted my influence in DeFi circles immensely.",
    name: "Micah Johnson",
    title: "DeFi Researcher",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];

export function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
            What Our Users Say
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Hear from people who have transformed their Web3 presence with DeSoc
            Agent.
          </p>
        </div>

        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-blue-500/5 to-transparent"></div>
          <div className="absolute -z-10 -top-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -z-10 -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

          <div className="flex flex-col items-center">
            {/* Main testimonial display */}
            <div className="max-w-4xl">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: idx === activeIndex ? 1 : 0,
                    x: idx === activeIndex ? 0 : 20,
                    display: idx === activeIndex ? "block" : "none",
                  }}
                  transition={{ duration: 0.5 }}
                  className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 shadow-xl"
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-6">
                      <svg
                        className="h-12 w-12 text-blue-500 opacity-50"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                      >
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                    </div>
                    <p className="text-xl md:text-2xl font-medium text-white text-center mb-8">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-blue-500">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-blue-400">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Testimonial navigation */}
            <div className="mt-10 flex space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? "bg-blue-500 w-8"
                      : "bg-gray-600 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
