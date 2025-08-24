import { Truck, Shield, Clock, MapPin } from "react-feather";

export default function Feature() {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Same-day and next-day options available",
    },
    {
      icon: Shield,
      title: "Secure Handling",
      description: "All packages are tracked and insured",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Always available customer service",
    },
    {
      icon: MapPin,
      title: "Nationwide Coverage",
      description: "Delivery across the country",
    },
  ];

  return (
    <section className="py-16 bg-stone-50 dark:bg-stone-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-12">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-full inline-flex mb-4">
                <feature.icon
                  className="text-amber-600 dark:text-amber-500"
                  size={32}
                />
              </div>
              <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
