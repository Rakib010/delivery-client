/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "react-feather";
import { toast } from "sonner";

const faqItems = [
  {
    question: "How long does delivery usually take?",
    answer:
      "Standard delivery takes 2-3 business days. Express options are available for next-day delivery in most areas.",
  },
  {
    question: "What are your customer service hours?",
    answer:
      "Our customer service team is available 24/7 to assist you with any inquiries or issues.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we offer international shipping to over 50 countries worldwide with various delivery options.",
  },
  {
    question: "How can I track my package?",
    answer:
      "You can track your package using the tracking number provided in your confirmation email through our website or mobile app.",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll contact you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 transition-colors duration-300">
      <div className="relative w-full h-64">
        <img
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80"
          alt="Contact us banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-lg text-gray-200">
            We’d love to hear from you. Let’s talk!
          </p>
        </div>
      </div>

      {/* Contact Information & Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-4">
              Get In Touch
            </h2>
            <p className="text-stone-600 dark:text-stone-400">
              Have questions about our delivery services? We're here to help!
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: "Address",
                    content: "Dhaka Bangladesh, 1212",
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    content: "01811111111 \n 01822222222",
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    content:
                      "support@parceldelivery.com\ninfo@parceldelivery.com",
                  },
                  {
                    icon: Clock,
                    title: "Business Hours",
                    content:
                      "Monday-Friday: 8am - 8pm\nSaturday: 9am - 5pm\nSunday: 10am - 4pm",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full mr-4">
                      <item.icon
                        className="text-amber-600 dark:text-amber-500"
                        size={24}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-800 dark:text-stone-200">
                        {item.title}
                      </h3>
                      <p className="text-stone-600 dark:text-stone-400 whitespace-pre-line">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-stone-800 rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-stone-700 dark:text-white"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-stone-700 dark:text-white"
                    required
                  />
                </div>

                <div className="mb-4">
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-stone-700 dark:text-white"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="delivery-inquiry">Delivery Inquiry</option>
                    <option value="pricing">Pricing Question</option>
                    <option value="support">Customer Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-stone-700 dark:text-white"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center"
                >
                  <Send className="mr-2" size={18} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-stone-100 dark:bg-stone-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-stone-600 dark:text-stone-400">
              Find quick answers to common questions about our delivery
              services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-stone-700 rounded-lg shadow-sm p-6"
              >
                <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-2 flex items-center">
                  <MessageCircle
                    className="text-amber-600 dark:text-amber-500 mr-2"
                    size={20}
                  />
                  {item.question}
                </h3>
                <p className="text-stone-600 dark:text-stone-400">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
