import { useState, useEffect } from 'react';
import { 
  Shield, TrendingUp, Users, Clock, Building2, Briefcase, 
  ChevronRight, Star, CheckCircle, Target, Award, Heart,
  Phone, Mail, MapPin, Play, Quote, ArrowRight, ShieldCheck,
  FileText, Wallet, ThumbsUp, Zap
} from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      title: "Secure Your Family's Future",
      subtitle: "Comprehensive life insurance plans starting at just $9/month",
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      color: "from-blue-600 to-purple-600"
    },
    {
      id: 2,
      title: "Drive With Confidence",
      subtitle: "Complete auto protection with 24/7 roadside assistance",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      color: "from-emerald-600 to-teal-600"
    },
    {
      id: 3,
      title: "Healthcare That Cares",
      subtitle: "Access 5000+ network hospitals with cashless treatment",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      color: "from-purple-600 to-pink-600"
    },
    {
      id: 4,
      title: "Protect Your Home",
      subtitle: "Comprehensive property coverage against all risks",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
      color: "from-amber-600 to-orange-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const services = [
    {
      title: 'Life Insurance',
      description: 'Protect your loved ones with comprehensive life coverage plans tailored to your needs.',
      icon: Shield,
      features: ['Term Life', 'Whole Life', 'Universal Life', 'Group Life'],
      color: 'from-blue-600 to-cyan-600',
      bgLight: 'from-blue-50 to-cyan-50',
      image: 'https://images.unsplash.com/photo-1556740714-a8395b3bf30f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Vehicle Insurance',
      description: 'Complete protection for your vehicles with comprehensive and collision coverage.',
      icon: TrendingUp,
      features: ['Auto Insurance', 'Motorcycle', 'Commercial Fleet', 'Roadside Assist'],
      color: 'from-emerald-600 to-teal-600',
      bgLight: 'from-emerald-50 to-teal-50',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Health Insurance',
      description: 'Quality healthcare coverage with extensive network of hospitals and wellness benefits.',
      icon: Users,
      features: ['Individual Plans', 'Family Floater', 'Critical Illness', 'Maternity'],
      color: 'from-purple-600 to-pink-600',
      bgLight: 'from-purple-50 to-pink-50',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Property Insurance',
      description: 'Safeguard your home and business properties against damages and losses.',
      icon: Building2,
      features: ['Home Insurance', 'Renters Cover', 'Commercial Property', 'Natural Disasters'],
      color: 'from-indigo-600 to-blue-600',
      bgLight: 'from-indigo-50 to-blue-50',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Business Insurance',
      description: 'Comprehensive protection for your business operations and professional liabilities.',
      icon: Briefcase,
      features: ['General Liability', 'Professional Indemnity', 'Workers Comp', 'Business Interruption'],
      color: 'from-rose-600 to-red-600',
      bgLight: 'from-rose-50 to-red-50',
      image: 'https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Travel Insurance',
      description: 'Stay protected wherever you go with comprehensive travel coverage.',
      icon: Target,
      features: ['Trip Cancellation', 'Medical Evacuation', 'Lost Baggage', 'Flight Delay'],
      color: 'from-orange-600 to-red-600',
      bgLight: 'from-orange-50 to-red-50',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Choose Your Coverage',
      description: 'Select from our range of insurance products tailored to your specific needs.',
      icon: FileText,
      color: 'from-blue-600 to-cyan-600'
    },
    {
      step: 2,
      title: 'Get Instant Quote',
      description: 'Receive an accurate premium calculation instantly with our smart algorithm.',
      icon: Zap,
      color: 'from-purple-600 to-pink-600'
    },
    {
      step: 3,
      title: 'Customize Your Plan',
      description: 'Adjust coverage amounts, deductibles, and add-ons to fit your budget.',
      icon: Wallet,
      color: 'from-emerald-600 to-teal-600'
    },
    {
      step: 4,
      title: 'Get Protected',
      description: 'Sign digitally and get immediate coverage with instant policy issuance.',
      icon: ShieldCheck,
      color: 'from-amber-600 to-orange-600'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Robert Chen',
      role: 'Small Business Owner',
      content: 'InsureCore saved my business after a major fire. Their claims process was smooth and they paid out within 48 hours. I couldn\'t ask for a better insurance partner.',
      rating: 5,
      image: 'RC',
      company: 'Chen\'s Restaurant'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      role: 'Mother of Two',
      content: 'When my husband passed away unexpectedly, InsureCore made sure our family was taken care of. The life insurance payout helped us keep our home and maintain our lifestyle.',
      rating: 5,
      image: 'MG',
      company: 'San Diego, CA'
    },
    {
      id: 3,
      name: 'James Wilson',
      role: 'Retired Teacher',
      content: 'I\'ve been with InsureCore for over 15 years. Their health insurance plan is comprehensive and affordable. The customer service is always helpful and responsive.',
      rating: 5,
      image: 'JW',
      company: 'Austin, TX'
    },
    {
      id: 4,
      name: 'Priya Patel',
      role: 'Software Engineer',
      content: 'Getting auto insurance through InsureCore was so easy. Their app is user-friendly and I love the telematics discount for safe driving. Saved 20% on my premium!',
      rating: 4,
      image: 'PP',
      company: 'Seattle, WA'
    },
    {
      id: 5,
      name: 'Michael Thompson',
      role: 'Real Estate Agent',
      content: 'I recommend InsureCore to all my home buyers. Their homeowners insurance offers great coverage at competitive rates, and their claims service is top-notch.',
      rating: 5,
      image: 'MT',
      company: 'Chicago, IL'
    },
    {
      id: 6,
      name: 'Sarah Ahmed',
      role: 'Healthcare Professional',
      content: 'As a nurse, I appreciate how InsureCore values preventative care. Their wellness programs and health screenings have helped me stay healthy and save on premiums.',
      rating: 5,
      image: 'SA',
      company: 'Boston, MA'
    }
  ];

  const stats = [
    { label: 'Active Policies', value: '50K+', icon: FileText, change: '+25% this year' },
    { label: 'Happy Customers', value: '75K+', icon: Users, change: '95% retention rate' },
    { label: 'Claims Settled', value: '30K+', icon: CheckCircle, change: '98% satisfaction' },
    { label: 'Years of Trust', value: '25+', icon: Award, change: 'Since 1999' },
    { label: 'Network Hospitals', value: '5000+', icon: Heart, change: 'Pan India' },
    { label: 'Awards Won', value: '45+', icon: Target, change: 'Industry recognition' }
  ];

  return (
    <div className="w-full">
      {/* Hero Slider - Full Width */}
      <div className="relative w-full h-[600px] lg:h-[700px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} mix-blend-multiply opacity-90`}></div>
            </div>
            
            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="w-full px-4 lg:px-8 max-w-7xl mx-auto">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-white mb-6">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm font-medium">Trusted by 75,000+ Families</span>
                  </div>
                  <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                      Get Your Free Quote
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-8 py-4 bg-white/20 backdrop-blur border-2 border-white rounded-xl font-semibold hover:bg-white/30 transition-all hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
                      <Play className="w-5 h-5" />
                      Watch Video
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white w-10' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Arrow Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
        >
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Trust Badges */}
      <div className="w-full bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">98%</p>
                <p className="text-sm text-gray-600">Claims Satisfaction</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">2 Hours</p>
                <p className="text-sm text-gray-600">Avg. Claim Processing</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">75K+</p>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">25+ Years</p>
                <p className="text-sm text-gray-600">Industry Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-gray-600">
              Thousands of families and businesses trust us for their insurance needs. 
              Here's what we've achieved together.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                <p className="text-xs text-green-600 font-medium">{stat.change}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="w-full bg-gradient-to-b from-gray-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full text-blue-600 font-medium text-sm mb-6">
              <Shield className="w-4 h-4" />
              Our Insurance Solutions
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Coverage for Every Aspect of Your Life
            </h2>
            <p className="text-xl text-gray-600">
              From protecting your health and vehicle to securing your family's future, 
              we offer tailored insurance solutions that give you peace of mind.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-60 group-hover:opacity-40 transition-opacity`}></div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-3 rounded-xl">
                    <service.icon className={`w-6 h-6 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`} />
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className={`px-3 py-1.5 bg-gradient-to-br ${service.bgLight} text-gray-700 rounded-lg text-xs font-medium`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1 group/btn">
                    Learn More 
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center gap-2">
              View All Products
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="w-full bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full text-purple-600 font-medium text-sm mb-6">
                <Zap className="w-4 h-4" />
                Simple & Transparent
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                How It Works: Get Covered in 4 Easy Steps
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We've simplified the insurance process so you can get the protection you need 
                without any hassle. No paperwork, no waiting, no confusion.
              </p>
              
              <div className="space-y-6">
                {howItWorks.map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
                        {step.step}
                      </div>
                    </div>
                    <div>
                      <div className={`inline-flex items-center gap-2 bg-gradient-to-br ${step.color} bg-clip-text text-transparent font-bold mb-2`}>
                        <step.icon className="w-5 h-5" />
                        <span>{step.title}</span>
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <ThumbsUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">95% of customers complete their purchase in under 10 minutes</p>
                    <p className="text-sm text-gray-600">Join thousands of satisfied customers who got covered quickly and easily</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl opacity-10 blur-3xl"></div>
              <div className="relative bg-white border border-gray-200 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Get an instant quote</p>
                    <p className="font-bold text-gray-900">Calculate your premium</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Coverage Type</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Life Insurance</option>
                      <option>Health Insurance</option>
                      <option>Vehicle Insurance</option>
                      <option>Property Insurance</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Coverage Amount</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="$500,000"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Term (Years)</label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="20"
                      />
                    </div>
                  </div>
                  
                  <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all mt-4">
                    Get Your Free Quote
                  </button>
                  
                  <p className="text-xs text-center text-gray-500 mt-4">
                    No spam, no hidden fees. Just a free, no-obligation quote.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="w-full bg-gradient-to-br from-gray-900 to-gray-800 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-white font-medium text-sm mb-6">
              <Quote className="w-4 h-4" />
              Customer Stories
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Trusted by Thousands of Families and Businesses
            </h2>
            <p className="text-xl text-gray-300">
              Don't just take our word for it. Here's what our customers have to say about their experience with InsureCore.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all hover:transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                      }`} 
                    />
                  ))}
                </div>
                
                <p className="text-white text-lg mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-white">{testimonial.image}</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-300">{testimonial.role}</p>
                    <p className="text-xs text-gray-400 mt-1">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-2 text-white">
              <span className="text-2xl font-bold">4.9</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-gray-300">(2,500+ reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Get Protected?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join over 75,000 satisfied customers who trust us with their insurance needs. 
            Get your free quote today and experience the InsureCore difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all hover:shadow-2xl transform hover:-translate-y-1 inline-flex items-center gap-2">
              Get Your Free Quote
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white/20 backdrop-blur border-2 border-white text-white rounded-xl font-semibold hover:bg-white/30 transition-all hover:shadow-2xl transform hover:-translate-y-1">
              Talk to an Expert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;