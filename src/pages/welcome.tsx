import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, Home, Info, Phone, Briefcase, ChevronRight, 
  Menu, X, Users, Target, Clock, Award, CheckCircle,
  FileText, TrendingUp, Mail, MapPin, Building2
} from 'lucide-react';

type Screen = 'home' | 'about' | 'services' | 'contact';

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Info },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Phone }
  ] as const;

  const services = [
    {
      title: 'Life Insurance',
      description: 'Protect your loved ones with comprehensive life coverage plans tailored to your needs.',
      icon: Shield,
      features: ['Term Life', 'Whole Life', 'Universal Life', 'Group Life'],
      color: 'from-blue-600 to-cyan-600',
      bgLight: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'Vehicle Insurance',
      description: 'Complete protection for your vehicles with comprehensive and collision coverage.',
      icon: TrendingUp,
      features: ['Auto Insurance', 'Motorcycle', 'Commercial Fleet', 'Roadside Assist'],
      color: 'from-emerald-600 to-teal-600',
      bgLight: 'from-emerald-50 to-teal-50'
    },
    {
      title: 'Health Insurance',
      description: 'Quality healthcare coverage with extensive network of hospitals and wellness benefits.',
      icon: Users,
      features: ['Individual Plans', 'Family Floater', 'Critical Illness', 'Maternity'],
      color: 'from-purple-600 to-pink-600',
      bgLight: 'from-purple-50 to-pink-50'
    },
    {
      title: 'Funeral Insurance',
      description: 'Dignified farewell planning with immediate payout and flexible payment options.',
      icon: Clock,
      features: ['Immediate Cover', 'Pre-need Plans', 'Final Expense', 'Family Cover'],
      color: 'from-amber-600 to-orange-600',
      bgLight: 'from-amber-50 to-orange-50'
    },
    {
      title: 'Property Insurance',
      description: 'Safeguard your home and business properties against damages and losses.',
      icon: Building2,
      features: ['Home Insurance', 'Renters Cover', 'Commercial Property', 'Natural Disasters'],
      color: 'from-indigo-600 to-blue-600',
      bgLight: 'from-indigo-50 to-blue-50'
    },
    {
      title: 'Business Insurance',
      description: 'Comprehensive protection for your business operations and professional liabilities.',
      icon: Briefcase,
      features: ['General Liability', 'Professional Indemnity', 'Workers Comp', 'Business Interruption'],
      color: 'from-rose-600 to-red-600',
      bgLight: 'from-rose-50 to-red-50'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Chief Executive Officer',
      bio: '25+ years in insurance industry, leading innovation in customer-centric solutions.',
      image: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Operations Officer',
      bio: 'Expert in operational excellence and digital transformation in insurance.',
      image: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Chief Underwriting Officer',
      bio: 'Specialist in risk assessment and innovative policy development.',
      image: 'ER'
    },
    {
      name: 'David Kim',
      role: 'Chief Technology Officer',
      bio: 'Driving technological innovation and digital customer experience.',
      image: 'DK'
    }
  ];

  const stats = [
    { label: 'Active Policies', value: '50K+', icon: FileText, change: '+25% this year' },
    { label: 'Happy Customers', value: '75K+', icon: Users, change: '95% retention rate' },
    { label: 'Claims Settled', value: '30K+', icon: CheckCircle, change: '98% satisfaction' },
    { label: 'Years of Trust', value: '25+', icon: Award, change: 'Since 1999' }
  ];

  const renderHome = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
        
        <div className="relative px-6 py-16 lg:py-20 lg:px-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Protect What Matters Most
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Comprehensive insurance solutions tailored to your life's journey. 
              Because your peace of mind is our priority.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all hover:shadow-2xl transform hover:-translate-y-1"
              >
                Get a Quote
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-8 py-4 bg-white/20 backdrop-blur border-2 border-white rounded-xl font-semibold hover:bg-white/30 transition-all hover:shadow-2xl transform hover:-translate-y-1"
              >
                Executive
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
            <p className="text-xs text-green-600 font-medium">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Why Choose Us */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 lg:p-12 text-white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Why Choose InsureCore?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              We combine decades of insurance expertise with innovative technology 
              to provide you with the best protection at the most competitive rates.
            </p>
            <div className="space-y-4">
              {[
                '24/7 Claims Support',
                'Instant Policy Issuance',
                'Paperless Processing',
                'Flexible Payment Plans'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-gray-200">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <Target className="w-8 h-8 text-blue-400 mb-3" />
              <p className="text-2xl font-bold mb-1">99.9%</p>
              <p className="text-sm text-gray-300">Claims Success Rate</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <Clock className="w-8 h-8 text-purple-400 mb-3" />
              <p className="text-2xl font-bold mb-1">2 Hours</p>
              <p className="text-sm text-gray-300">Avg. Claim Processing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="space-y-12">
      {/* Mission & Vision */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 lg:p-10 text-white">
          <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-6">
            <Target className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-white/90 text-lg leading-relaxed">
            To provide accessible, reliable, and innovative insurance solutions 
            that protect families and businesses, giving them peace of mind for 
            the future.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 lg:p-10 text-white">
          <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-6">
            <Award className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-white/90 text-lg leading-relaxed">
            To become the most trusted insurance partner by continuously 
            innovating and putting our customers at the heart of everything we do.
          </p>
        </div>
      </div>

      {/* Company Story */}
      <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-12">
        <div className="max-w-3xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Our Story
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Founded in 1999, InsureCore began with a simple belief: insurance should 
            be straightforward, fair, and accessible to everyone. What started as a 
            small office with three employees has grown into one of the nation's 
            most trusted insurance providers.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Today, we serve over 75,000 satisfied customers across the country, 
            offering a comprehensive range of insurance products. Our commitment 
            to innovation and customer service has earned us numerous industry 
            awards and, more importantly, the trust of our policyholders.
          </p>
        </div>
      </div>

      {/* Leadership Team */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Leadership Team
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-white">{member.image}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-1">
                {member.name}
              </h3>
              <p className="text-blue-600 font-medium text-center mb-3">
                {member.role}
              </p>
              <p className="text-gray-600 text-sm text-center">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Core Values
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              title: 'Integrity',
              desc: 'We always do what\'s right for our customers',
              icon: Shield
            },
            {
              title: 'Innovation',
              desc: 'Constantly improving through technology',
              icon: TrendingUp
            },
            {
              title: 'Customer First',
              desc: 'Your needs guide our decisions',
              icon: Users
            }
          ].map((value, idx) => (
            <div key={idx} className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Our Insurance Solutions
        </h1>
        <p className="text-xl text-gray-600">
          Comprehensive coverage options designed to protect what matters most to you.
          Choose from our range of insurance products tailored to your needs.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div 
            key={index}
            className="group bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start gap-6">
              <div className={`bg-gradient-to-br ${service.color} p-4 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
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
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 lg:p-12 text-white text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Need a Custom Solution?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Our insurance experts are ready to help you find the perfect coverage
          for your unique needs.
        </p>
        <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all hover:shadow-2xl transform hover:-translate-y-1">
          Talk to an Expert
        </button>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600">
          Have questions about our insurance products? Our team is here to help you
          find the right coverage for your needs.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Contact Information
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <p className="font-semibold text-gray-900">1-800-123-4567</p>
                  <p className="text-sm text-gray-600">Mon-Fri, 8am-8pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-semibold text-gray-900">support@insurecore.com</p>
                  <p className="text-sm text-gray-600">24/7 email support</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Headquarters</p>
                  <p className="font-semibold text-gray-900">123 Insurance Plaza</p>
                  <p className="text-gray-600">New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4">Emergency Claims</h3>
            <p className="text-gray-300 mb-4">
              For urgent claims, our 24/7 emergency line is always available.
            </p>
            <p className="text-2xl font-bold text-white">1-888-999-0123</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send Us a Message
            </h2>
            
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>General Inquiry</option>
                  <option>Quote Request</option>
                  <option>Claims Support</option>
                  <option>Policy Changes</option>
                  <option>Technical Support</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all hover:shadow-lg transform hover:-translate-y-1"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case 'about':
        return renderAbout();
      case 'services':
        return renderServices();
      case 'contact':
        return renderContact();
      default:
        return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">InsureCore</span>
                <span className="hidden lg:inline ml-2 text-sm text-gray-500">Insurance That Cares</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentScreen(item.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      currentScreen === item.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <button 
                onClick={() => navigate('/login')}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                Login
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentScreen(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        currentScreen === item.id
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
                <div className="pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => navigate('/login')}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
        {renderScreen()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-gray-900">InsureCore</span>
              </div>
              <p className="text-sm text-gray-600">
                Protecting what matters most since 1999.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Life Insurance</li>
                <li>Health Insurance</li>
                <li>Vehicle Insurance</li>
                <li>Property Insurance</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Blog</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Contact Us</li>
                <li>FAQs</li>
                <li>Claims</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>&copy; 2024 InsureCore Insurance Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomeScreen;