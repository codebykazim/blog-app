import Logo from "../Logo"
import { Link } from "react-router-dom"
import { Github, Twitter, Heart } from "lucide-react"

function Footer() {
  return (
    <footer className="bg-white border-t border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 text-gray-600 max-w-md text-pretty leading-relaxed">
              A modern platform for writers and readers to connect, share stories, and build a community around great
              content.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-green-600 transition-colors rounded-lg hover:bg-green-50"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-green-600 transition-colors rounded-lg hover:bg-green-50"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-green-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-green-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-600 hover:text-green-600 transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-green-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-green-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 hover:text-green-600 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-green-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} BlogHub. All rights reserved.</p>
          <p className="text-gray-600 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> for writers everywhere
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
