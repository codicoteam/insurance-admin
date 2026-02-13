import { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, MessageCircle, 
  ChevronRight, Send, CheckCircle, Building2, Headphones,
  Facebook, Twitter, Linkedin, Instagram, Youtube
} from 'lucide-react';

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-20 lg:py-28">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern"></div>
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-white font-medium text-sm mb-6">
            <MessageCircle className="w-4 h-4" />
            Get in Touch
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            We're Here to Help
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
            Have questions about our insurance products? Our team is ready to assist you.
          </p>
        </div>
      </div>

      {/* Contact Information & Form */}
      <div className="w-full bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Phone</p>
                      <p className="font-semibold text-gray-900 text-lg">1-800-123-4567</p>
                      <p className="text-sm text-gray-600">Mon-Fri, 8am-8pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <p className="font-semibold text-gray-900 text-lg">support@insurecore.com</p>
                      <p className="text-sm text-gray-600">24/7 email support</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Headquarters</p>
                      <p className="font-semibold text-gray-900 text-lg">123 Insurance Plaza</p>
                      <p className="text-gray-600">New York, NY 10001</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Business Hours</p>
                      <p className="font-semibold text-gray-900 text-lg">Mon-Fri: 8am - 8pm</p>
                      <p className="text-gray-600">Sat: 9am - 5pm, Sun: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white">
                <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-4">
                  <Headphones className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Emergency Claims</h3>
                <p className="text-gray-300 mb-4">
                  For urgent claims and emergencies, our 24/7 dedicated line is always available.
                </p>
                <p className="text-3xl font-bold text-white mb-2">1-888-999-0123</p>
                <p className="text-sm text-gray-400">Available 24/7 for emergencies</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Connect With Us</h3>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, color: 'from-blue-600 to-blue-700' },
                    { icon: Twitter, color: 'from-sky-400 to-sky-500' },
                    { icon: Linkedin, color: 'from-blue-700 to-blue-800' },
                    { icon: Instagram, color: 'from-pink-500 to-purple-600' },
                    { icon: Youtube, color: 'from-red-600 to-red-700' }
                  ].map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <div 
                        key={idx}
                        className={`w-12 h-12 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-10 hover:shadow-xl transition-all">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
                
                {formSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">
                      Thank you for contacting us. We'll respond within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="john.doe@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select 
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select a subject</option>
                        <option>General Inquiry</option>
                        <option>Quote Request</option>
                        <option>Claims Support</option>
                        <option>Policy Changes</option>
                        <option>Technical Support</option>
                        <option>Partnership Opportunities</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder="How can we help you? Please provide as much detail as possible..."
                      ></textarea>
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="consent"
                        required
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="consent" className="text-sm text-gray-600">
                        I agree to the processing of my personal data and confirm that I have read and understood the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                      Send Message
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Visit Our Headquarters
            </h2>
            <p className="text-xl text-gray-600">
              We'd love to meet you in person. Our doors are always open.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all">
            <div className="aspect-video bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive Map</p>
                  <p className="text-sm text-gray-500">123 Insurance Plaza, New York, NY 10001</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Get Directions</span>
                </div>
                <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1">
                  View on Google Maps
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Teaser */}
      <div className="w-full bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 lg:p-12 text-white text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Check out our comprehensive FAQ section or chat with our virtual assistant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all hover:shadow-2xl transform hover:-translate-y-1">
                View FAQs
              </button>
              <button className="px-8 py-4 bg-white/20 backdrop-blur border-2 border-white rounded-xl font-semibold hover:bg-white/30 transition-all hover:shadow-2xl transform hover:-translate-y-1">
                Chat with Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;