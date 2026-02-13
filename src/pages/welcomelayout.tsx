import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, Home as HomeIcon, Info, Briefcase, Phone, 
  Menu, X, ChevronRight 
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { id: '/', label: 'Home', icon: HomeIcon },
    { id: '/about', label: 'About', icon: Info },
    { id: '/services', label: 'Services', icon: Briefcase },
    { id: '/contact', label: 'Contact', icon: Phone }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="w-full px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">InsureCore</span>
                <span className="hidden lg:inline ml-2 text-sm text-gray-500">Protecting Your Future</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.id;
                return (
                  <Link
                    key={item.id}
                    to={item.id}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link 
                to="/login" 
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Login
              </Link>
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
            <div className="lg:hidden border-t border-gray-100 py-4">
              <div className="flex flex-col space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.id;
                  return (
                    <Link
                      key={item.id}
                      to={item.id}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
                <div className="pt-4 border-t border-gray-100">
                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium"
                  >
                    Get a Quote
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content - Full Width */}
      <main className="w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="w-full px-4 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              <div className="col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-white text-lg">InsureCore</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Providing peace of mind through comprehensive insurance solutions since 1999.
                  We're here to protect what matters most to you.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Products</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="hover:text-white transition-colors cursor-pointer">Life Insurance</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Health Insurance</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Vehicle Insurance</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Property Insurance</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Business Insurance</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Press</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Blog</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Investors</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="hover:text-white transition-colors cursor-pointer">Contact Us</li>
                  <li className="hover:text-white transition-colors cursor-pointer">FAQs</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Claims</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col lg:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                &copy; 2024 InsureCore Insurance Company. All rights reserved.
              </p>
              <div className="flex gap-6">
                <span className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                <span className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Terms of Use</span>
                <span className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Cookie Policy</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;