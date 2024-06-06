'use client';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Collector 1",
      text: "Mystic Garden is a game-changer for digital art. The platform is beautifully designed and the collection is mesmerizing.",
    },
    {
      name: "Artist 2",
      text: "I've never felt more inspired. Mystic Garden provides a unique space for artists to showcase their work.",
    },
    {
      name: "User 3",
      text: "The quality of the art and the overall experience is unparalleled. Mystic Garden is a must-visit for art enthusiasts.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8 text-center">What People Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <p className="text-lg text-gray-700 mb-4">&quot;{testimonial.text}&quot;</p>
              <h3 className="text-xl font-medium text-gray-900">{testimonial.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
