"use client"

import { motion } from "framer-motion"
import {Instagram, Linkedin, Facebook, Twitter} from "lucide-react"

export default function Footer() {
  return (
      <footer className="bg-[#232221] border-t border-[#cfff5e]/10 py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-screen">
          {/* Top Divider */}
          <motion.div
              className="h-px bg-gradient-to-r from-transparent via-[#cfff5e]/20 to-transparent mb-8 sm:mb-12"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
          />

          {/* Center Content */}
          <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
          >
            {/* Logo Text */}
            <motion.div
                className="relative group inline-block mb-6"
                whileHover={{ scale: 1.05 }}
            >
              <div className="absolute -inset-4 bg-[#cfff5e] cursor-grab rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300" />
              <div className="cursor-grab flex items-center justify-center">
                <div className="cursor-grab relative text-4xl sm:text-6xl lg:text-8xl font-black bg-gradient-to-r text-[#cfff5e]">
                  Contri.
                </div>
              </div>
            </motion.div>

            {/* Social Icons with Tooltips */}
            <motion.div
                className="flex justify-center items-center gap-6 sm:gap-8 mb-6"
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{delay: 0.6, duration: 0.6}}
            >
              <div className="relative group">
                <a
                    href="https://www.linkedin.com/company/contrimoney/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#cfff5e] hover:text-white transition-colors duration-300"
                    aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6 sm:w-7 sm:h-7"/>
                </a>
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-[#2d2c2a] text-xs text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50"
                    initial={{y: 10}}
                    animate={{y: 0}}
                >
                  LinkedIn
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#2d2c2a]"/>
                </motion.div>
              </div>
              <div className="relative group">
                <a
                    href="https://www.instagram.com/contrimoney?igsh=MW43OXlwZmZxYnBpZQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#cfff5e] hover:text-white transition-colors duration-300"
                    aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6 sm:w-7 sm:h-7"/>
                </a>
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-[#2d2c2a] text-xs text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50"
                    initial={{y: 10}}
                    animate={{y: 0}}
                >
                  Instagram
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#2d2c2a]"/>
                </motion.div>
              </div>
              <div className="relative group">
                <a
                    href="https://x.com/contrimoney"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#cfff5e] hover:text-white transition-colors duration-300"
                    aria-label="Twitter"
                >
                  <Twitter className="w-6 h-6 sm:w-7 sm:h-7"/>
                </a>
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-[#2d2c2a] text-xs text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50"
                    initial={{y: 10}}
                    animate={{y: 0}}
                >
                  Twitter
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#2d2c2a]"/>
                </motion.div>
              </div>
              
              <div className="relative group">
                <a
                  href=https:"//www.facebook.com/contrimoney"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#cfff5e] hover:text-white transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6 sm:w-7 sm:h-7" />
                </a>
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-[#2d2c2a] text-xs text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50"
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                >
                  Facebook
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#2d2c2a]" />
                </motion.div>
              </div>
              

            </motion.div>

            {/* Bottom Text */}
            <p className="text-xs sm:text-sm opacity-60 font-medium px-4">
              © 2025 Contri by Cruxitis Technologies. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
  )
}
