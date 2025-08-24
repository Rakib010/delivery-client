import { ArrowRight } from "react-feather";

import hero from "../../assets/heroparcel.avif";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-stone-100 to-stone-200 dark:from-stone-900 dark:to-stone-800 text-stone-800 dark:text-white py-20 transition-colors duration-300 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Content */}
          <div className="md:w-1/2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Fast & Reliable <br />
              <span className="text-amber-600 dark:text-amber-500">
                {" "}
                Parcel Delivery
              </span>
            </h1>
            <p className="text-xl text-stone-600 dark:text-stone-300 mb-8">
              Delivering your packages with speed, security, and precision.
              Trusted by thousands of customers nationwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition flex items-center justify-center">
                Track Your Package
                <ArrowRight className="ml-2" size={20} />
              </button>
              <button className="border-2 border-stone-400 dark:border-stone-300 text-stone-700 dark:text-white font-semibold py-3 px-8 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition">
                Schedule Pickup
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-500">
                  500K+
                </div>
                <div className="text-stone-600 dark:text-stone-400">
                  Deliveries
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-500">
                  95%
                </div>
                <div className="text-stone-600 dark:text-stone-400">
                  On Time Rate
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-500">
                  200+
                </div>
                <div className="text-stone-600 dark:text-stone-400">
                  Cities Served
                </div>
              </div>
            </div>
          </div>

          {/* Right Content*/}
          <div className="md:w-1/2 flex justify-center">
            <div className="w-full h-full rounded-xl overflow-hidden">
              <img
                src={hero}
                alt="Parcel Delivery"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
