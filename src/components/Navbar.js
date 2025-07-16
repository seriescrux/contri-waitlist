"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Contact", href: "#contact" },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
      <motion.nav
          className={`fixed top-0 w-full z-50 transition-all duration-500 px-4 sm:px-6 lg:px-11 ${
              isScrolled
                  ? "bg-[#232221]/95 backdrop-blur-2xl shadow-2xl border-b border-[#cfff5e]/10"
                  : "bg-[#232221]/80 backdrop-blur-xl"
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto max-w-7xl px-2 sm:px-4">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center justify-between gap-1 sm:gap-2">
              <motion.a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("#home")
                  }}
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-[#cfff5e] to-[#8c7dff] rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                <div className="relative text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-[#cfff5e] to-[#8c7dff] bg-clip-text text-transparent">
                  <Image src="/star.png" alt="star" width={30} height={30} className="sm:w-[40px] sm:h-[40px]" />
                </div>
              </motion.a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                  <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="relative cursor-pointer px-4 lg:px-6 py-2 lg:py-3 text-[#f7f7f7] hover:text-[#cfff5e] font-semibold transition-all duration-300 group text-sm lg:text-base"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#cfff5e]/10 to-[#8c7dff]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <span className="relative z-10">{item.name}</span>
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#cfff5e] to-[#8c7dff] group-hover:w-6 lg:group-hover:w-8 transition-all duration-300"></div>
                  </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
                className="md:hidden relative p-2 sm:p-3 text-[#f7f7f7] hover:text-[#cfff5e] transition-colors group"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#cfff5e]/10 to-[#8c7dff]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative z-10">
                {isMobileMenuOpen ? (
                    <X size={20} className="sm:w-6 sm:h-6" />
                ) : (
                    <Menu size={20} className="sm:w-6 sm:h-6" />
                )}
              </div>
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <motion.div
              className="md:hidden overflow-hidden"
              initial={false}
              animate={{
                height: isMobileMenuOpen ? "auto" : 0,
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
          >
            <div className="py-4 sm:py-6 space-y-2 border-t border-[#cfff5e]/10">
              {navItems.map((item, index) => (
                  <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="block w-full text-left px-4 sm:px-6 py-3 sm:py-4 text-[#f7f7f7] hover:text-[#cfff5e] font-semibold transition-all duration-300 rounded-xl hover:bg-[#cfff5e]/5 text-sm sm:text-base"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: isMobileMenuOpen ? 1 : 0,
                        x: isMobileMenuOpen ? 0 : -20,
                      }}
                      transition={{ delay: index * 0.1 }}
                  >
                    {item.name}
                  </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.nav>
  )
}
