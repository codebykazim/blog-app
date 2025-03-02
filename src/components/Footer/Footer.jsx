import Logo from "../Logo"
import { Link } from "react-router-dom"
import { Github, Twitter } from "lucide-react"

function Footer() {
  return (
    <footer className="py-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-gray-600">
            <Logo width="80px" />
            <span className="text-sm">© {new Date().getFullYear()} All rights reserved</span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-sm text-gray-600 hover:text-purple-500 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-600 hover:text-purple-500 transition-colors">
              Terms
            </Link>
            <div className="flex items-center gap-3 text-gray-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer