import {
  Shield,
  Target,
  Award,
  Users,
  TrendingUp,
  Clock,
  Heart,
  Briefcase,
  Globe,
  Zap,
} from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Chief Executive Officer",
      bio: "25+ years in insurance industry, leading innovation in customer-centric solutions.",
      image: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Chief Operations Officer",
      bio: "Expert in operational excellence and digital transformation in insurance.",
      image: "MC",
    },
    {
      name: "Emily Rodriguez",
      role: "Chief Underwriting Officer",
      bio: "Specialist in risk assessment and innovative policy development.",
      image: "ER",
    },
    {
      name: "David Kim",
      role: "Chief Technology Officer",
      bio: "Driving technological innovation and digital customer experience.",
      image: "DK",
    },
    {
      name: "Lisa Thompson",
      role: "Chief Marketing Officer",
      bio: "Building brand trust and customer engagement through innovative campaigns.",
      image: "LT",
    },
    {
      name: "James Wilson",
      role: "Chief Financial Officer",
      bio: "Ensuring financial stability and sustainable growth for the company.",
      image: "JW",
    },
  ];

  const milestones = [
    {
      year: "1999",
      title: "Company Founded",
      description: "Started with a small team of 3 in New York",
    },
    {
      year: "2005",
      title: "10,000 Customers",
      description: "Reached our first major milestone",
    },
    {
      year: "2010",
      title: "National Expansion",
      description: "Opened offices in 15 states",
    },
    {
      year: "2015",
      title: "Digital Transformation",
      description: "Launched mobile app and online claims",
    },
    {
      year: "2020",
      title: "1M Policies",
      description: "Served over 1 million customers nationwide",
    },
    {
      year: "2024",
      title: "Industry Leader",
      description: "Recognized as top insurance provider",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-20 lg:py-28">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern"></div>
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-white font-medium text-sm mb-6">
            <Shield className="w-4 h-4" />
            Our Story
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Protecting What Matters Most Since 1999
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
            From a small office in New York to a national insurance provider
            trusted by over 75,000 families.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="w-full bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 lg:p-10 text-white">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-white/90 text-lg leading-relaxed">
                To provide accessible, reliable, and innovative insurance
                solutions that protect families and businesses, giving them
                peace of mind for the future. We strive to make insurance
                simple, transparent, and fair for everyone.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 lg:p-10 text-white">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-white/90 text-lg leading-relaxed">
                To become the most trusted insurance partner by continuously
                innovating and putting our customers at the heart of everything
                we do. We envision a world where everyone has access to quality
                protection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Story */}
      <div className="w-full bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Journey
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Founded in 1999, InsureCore began with a simple belief:
                insurance should be straightforward, fair, and accessible to
                everyone. What started as a small office with three employees in
                downtown New York has grown into one of the nation's most
                trusted insurance providers.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Today, we serve over 75,000 satisfied customers across the
                country, offering a comprehensive range of insurance products.
                Our commitment to innovation and customer service has earned us
                numerous industry awards and, more importantly, the trust of our
                policyholders.
              </p>
              <div className="flex items-center gap-4 mt-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    >
                      {["SJ", "MC", "ER", "DK"][i - 1]}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-gray-900">25+ years</span> of
                  combined experience
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl opacity-10 blur-3xl"></div>
              <div className="relative bg-white border border-gray-200 rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Our Milestones
                </h3>
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-16 text-lg font-bold text-blue-600">
                        {milestone.year}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">
                          {milestone.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="w-full bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full text-blue-600 font-medium text-sm mb-6">
              <Heart className="w-4 h-4" />
              What Drives Us
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600">
              These principles guide every decision we make and every policy we
              create.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Integrity",
                desc: "We always do what's right for our customers, even when no one is watching.",
                icon: Shield,
              },
              {
                title: "Innovation",
                desc: "Constantly improving through technology to make insurance simpler and better.",
                icon: Zap,
              },
              {
                title: "Customer First",
                desc: "Your needs guide our decisions and shape our products.",
                icon: Users,
              },
              {
                title: "Excellence",
                desc: "We strive for the highest quality in everything we do.",
                icon: Award,
              },
              {
                title: "Transparency",
                desc: "Clear terms, no hidden fees, honest communication.",
                icon: Globe,
              },
              {
                title: "Compassion",
                desc: "We treat our customers like family, especially in their time of need.",
                icon: Heart,
              },
              {
                title: "Reliability",
                desc: "We keep our promises and deliver on our commitments.",
                icon: Clock,
              },
              {
                title: "Growth",
                desc: "Continuous learning and improvement for ourselves and our customers.",
                icon: TrendingUp,
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="text-center p-6 bg-gray-50 rounded-3xl hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="w-full bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full text-purple-600 font-medium text-sm mb-6">
              <Briefcase className="w-4 h-4" />
              Leadership
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600">
              Experienced professionals dedicated to protecting what matters
              most to you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all hover:-translate-y-1 text-center"
              >
                <div className="w-28 h-28 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                  <span className="text-3xl font-bold text-white">
                    {member.image}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats CTA */}
      <div className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Join Our Growing Family
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Become part of our story. Get the protection you need from a company
            that cares.
          </p>
          <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all hover:shadow-2xl transform hover:-translate-y-1">
            Get Your Free Quote Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
