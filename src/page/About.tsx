import {
  Truck,
  Shield,
  Clock,
  Users,
  Target,
  Award,
  Heart,
  MapPin,
} from "react-feather";
import map from "../assets/parcel.avif";
import parcel from "../assets/parcel2.avif";

const About = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section with Banner Image */}
      <section className="relative py-24 bg-stone-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={parcel}
            alt="Delivery Service"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Our Parcel Delivery Service
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Delivering your packages with speed, security, and reliability since
            2015
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-stone-600">
              To provide the fastest, most reliable, and secure parcel delivery
              service, connecting people and businesses across the country with
              seamless logistics solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-amber-50 p-6 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <Truck className="text-amber-600" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-stone-600">
                Same-day and next-day delivery options available in most areas
              </p>
            </div>

            <div className="bg-emerald-50 p-6 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <Shield className="text-emerald-600" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Handling</h3>
              <p className="text-stone-600">
                All packages are tracked and insured for your peace of mind
              </p>
            </div>

            <div className="bg-cyan-50 p-6 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <Clock className="text-cyan-600" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-stone-600">
                Our customer service team is available around the clock
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-stone-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-stone-800 mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
              <Target className="text-amber-600 mr-4 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold mb-2">Reliability</h3>
                <p className="text-stone-600 text-sm">
                  We deliver on our promises, every time
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
              <Heart className="text-rose-600 mr-4 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold mb-2">Customer First</h3>
                <p className="text-stone-600 text-sm">
                  Your satisfaction is our top priority
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
              <Users
                className="text-emerald-600 mr-4 flex-shrink-0"
                size={24}
              />
              <div>
                <h3 className="font-semibold mb-2">Teamwork</h3>
                <p className="text-stone-600 text-sm">
                  We collaborate to achieve excellence
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
              <Award className="text-cyan-600 mr-4 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold mb-2">Excellence</h3>
                <p className="text-stone-600 text-sm">
                  We strive for the highest standards
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">
              Nationwide Coverage
            </h2>
            <p className="text-lg text-stone-600">
              We deliver to all major cities and towns across the country with
              our extensive network of delivery partners.
            </p>
          </div>

          <div className="bg-stone-100 rounded-lg p-8 flex flex-col md:flex-row items-center">
            <div className="flex-1 mb-6 md:mb-0">
              <div className="flex items-center mb-4">
                <MapPin className="text-amber-600 mr-2" size={24} />
                <h3 className="text-xl font-semibold">Our Coverage Areas</h3>
              </div>
              <ul className="grid grid-cols-2 gap-2 text-stone-700">
                <li>• Metropolitan Cities</li>
                <li>• Regional Towns</li>
                <li>• Rural Areas</li>
                <li>• Industrial Zones</li>
                <li>• Business Districts</li>
                <li>• Residential Areas</li>
              </ul>
            </div>
            <div className="flex-1 bg-stone-200 h-64 rounded-lg flex items-center justify-center">
              <img className="h-64 w-full object-cover rounded-xl" src={map} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
