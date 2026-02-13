import { 
  Shield, TrendingUp, Users, Clock, Building2, Briefcase, 
  ChevronRight, CheckCircle, Target, Award, Heart, ArrowRight,
  Car, Home, Umbrella, Stethoscope, GraduationCap, Plane
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: 'Life Insurance',
      description: 'Protect your loved ones with comprehensive life coverage plans tailored to your needs.',
      icon: Shield,
      features: ['Term Life', 'Whole Life', 'Universal Life', 'Group Life', 'Child Plans', 'Retirement'],
      color: 'from-blue-600 to-cyan-600',
      bgLight: 'from-blue-50 to-cyan-50',
      image: 'https://images.unsplash.com/photo-1556740714-a8395b3bf30f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: ['Financial security for family', 'Tax benefits', 'Flexible premiums', 'Rider options']
    },
    {
      title: 'Vehicle Insurance',
      description: 'Complete protection for your vehicles with comprehensive and collision coverage.',
      icon: Car,
      features: ['Auto Insurance', 'Motorcycle', 'Commercial Fleet', 'Roadside Assist', 'Pay-per-mile', 'Classic Car'],
      color: 'from-emerald-600 to-teal-600',
      bgLight: 'from-emerald-50 to-teal-50',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: ['Cashless repairs', 'Zero depreciation', 'No-claim bonus', '24/7 assistance']
    },
    {
      title: 'Health Insurance',
      description: 'Quality healthcare coverage with extensive network of hospitals and wellness benefits.',
      icon: Stethoscope,
      features: ['Individual Plans', 'Family Floater', 'Critical Illness', 'Maternity', 'Senior Citizen', 'Top-up'],
      color: 'from-purple-600 to-pink-600',
      bgLight: 'from-purple-50 to-pink-50',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: ['Cashless hospitalization', 'Annual checkups', 'Wellness programs', 'Ayush coverage']
    },
    {
      title: 'Property Insurance',
      description: 'Safeguard your home and business properties against damages and losses.',
      icon: Home,
      features: ['Home Insurance', 'Renters Cover', 'Commercial Property', 'Natural Disasters', 'Contents', 'Liability'],
      color: 'from-indigo-600 to-blue-600',
      bgLight: 'from-indigo-50 to-blue-50',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: ['Structure protection', 'Contents coverage', 'Alternative accommodation', 'Theft protection']
    },
    {
      title: 'Business Insurance',
      description: 'Comprehensive protection for your business operations and professional liabilities.',
      icon: Briefcase,
      features: ['General Liability', 'Professional Indemnity', 'Workers Comp', 'Business Interruption', 'Cyber', 'Directors'],
      color: 'from-rose-600 to-red-600',
      bgLight: 'from-rose-50 to-red-50',
      image: 'https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: ['Income protection', 'Legal liability', 'Employee coverage', 'Risk management']
    },
    {
      title: 'Travel Insurance',
      description: 'Stay protected wherever you go with comprehensive travel coverage.',
      icon: Plane,
      features: ['Trip Cancellation', 'Medical Evacuation', 'Lost Baggage', 'Flight Delay', 'Adventure Sports', 'Annual Multi-trip'],
      color: 'from-orange-600 to-red-600',
      bgLight: 'from-orange-50 to-red-50',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: ['Medical coverage abroad', 'Trip protection', '24/7 assistance', 'Baggage delay']
    },
    {
      title: 'Funeral Insurance',
      description: 'Dignified farewell planning with immediate payout and flexible payment options.',
      icon: Clock,
      features: ['Immediate Cover', 'Pre-need Plans', 'Final Expense', 'Family Cover', 'Burial', 'Cremation'],
      color: 'from-amber-600 to-orange-600',
      bgLight: 'from-amber-50 to-orange-50',
      image: 'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: ['Quick payout', 'No medical exam', 'Fixed premiums', 'Lifetime coverage']
    },
    {
      title: 'Education Insurance',
      description: 'Secure your child\'s future with dedicated education savings plans.',
      icon: GraduationCap,
      features: ['Child Plan', 'Higher Education', 'Study Abroad', 'Scholarship', 'Tuition Cover'],
      color: 'from-green-600 to-emerald-600',
      bgLight: 'from-green-50 to-emerald-50',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      benefits: ['Guaranteed savings', 'Waiver of premium', 'Scholarship benefit', 'Tax savings']
    }
  ];

  const whyChooseUs = [
    {
      title: 'Best Price Guarantee',
      description: 'We ensure you get the most competitive rates in the market.',
      icon: Award
    },
    {
      title: '24/7 Claims Support',
      description: 'Round-the-clock assistance for all your claim needs.',
      icon: Clock
    },
    {
      title: '100% Paperless',
      description: 'Complete digital journey from quote to policy issuance.',
      icon: TrendingUp
    },
    {
      title: 'Expert Advisors',
      description: 'Certified insurance professionals to guide you.',
      icon: Users
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-20 lg:py-28">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern"></div>
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-white font-medium text-sm mb-6">
            <Umbrella className="w-4 h-4" />
            Our Products
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Comprehensive Insurance Solutions
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
            Choose from our wide range of insurance products designed to protect every aspect of your life.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="w-full bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-60 group-hover:opacity-40 transition-opacity`}></div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-4 rounded-xl">
                    <service.icon className={`w-8 h-8 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`} />
                  </div>
                </div>
                
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  
                  <div className="mb-6">
                    <p className="font-semibold text-gray-900 mb-2">Key Features:</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <span 
                          key={idx}
                          className={`px-3 py-1.5 bg-gradient-to-br ${service.bgLight} text-gray-700 rounded-lg text-xs font-medium`}
                        >
                          {feature}
                        </span>
                      ))}
                      {service.features.length > 4 && (
                        <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                          +{service.features.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="font-semibold text-gray-900 mb-2">Benefits:</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                    <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1 group/btn">
                      View Details
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-sm hover:from-blue-700 hover:to-purple-700 transition-all">
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="w-full bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full text-blue-600 font-medium text-sm mb-6">
              <Target className="w-4 h-4" />
              Why InsureCore
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Thousands Choose Us
            </h2>
            <p className="text-xl text-gray-600">
              We don't just sell insurance - we build relationships based on trust and reliability.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-3xl border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coverage Calculator */}
      <div className="w-full bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 lg:p-12 text-white">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Not Sure How Much Coverage You Need?
                </h2>
                <p className="text-gray-300 text-lg mb-8">
                  Use our free coverage calculator to get personalized recommendations based on your lifestyle, family size, and financial goals.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    'Personalized recommendations',
                    'Compare multiple plans',
                    'Instant premium estimates',
                    'No obligation quotes'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>
                <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all inline-flex items-center gap-2">
                  Calculate Your Coverage
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                  <Heart className="w-8 h-8 text-pink-400 mb-3" />
                  <p className="text-3xl font-bold mb-1">$500K</p>
                  <p className="text-sm text-gray-300">Avg. Life Coverage</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                  <Home className="w-8 h-8 text-blue-400 mb-3" />
                  <p className="text-3xl font-bold mb-1">$750K</p>
                  <p className="text-sm text-gray-300">Avg. Home Coverage</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                  <Car className="w-8 h-8 text-green-400 mb-3" />
                  <p className="text-3xl font-bold mb-1">$50K</p>
                  <p className="text-sm text-gray-300">Avg. Auto Coverage</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                  <Briefcase className="w-8 h-8 text-purple-400 mb-3" />
                  <p className="text-3xl font-bold mb-1">$1M+</p>
                  <p className="text-sm text-gray-300">Business Coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;