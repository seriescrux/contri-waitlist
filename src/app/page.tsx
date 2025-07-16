"use client"
import Image from "next/image"
import disposableEmailDomains from "disposable-email-domains"
import type React from "react"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Navbar from "@/components/Navbar"
import FeaturesSection from "@/components/FeaturesSection"
import Footer from "@/components/Footer"
import { Users, CreditCard, CheckCircle, BarChart3, ArrowRight, Split} from "lucide-react"
import { toast } from "sonner"

// Animated Background Component
const AnimatedBackground = () => {
  const [dollars, setDollars] = useState<
      Array<{ id: number; x: number; delay: number; duration: number; size: string }>
  >([])

  useEffect(() => {
    const generateDollars = () => {
      // Reduce number of dollars on mobile
      const isMobile = window.innerWidth < 768
      const dollarCount = isMobile ? 8 : 15

      const newDollars = Array.from({ length: dollarCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 15 + Math.random() * 10,
        size: isMobile
            ? ["text-sm", "text-base", "text-lg"][Math.floor(Math.random() * 3)]
            : ["text-lg", "text-xl", "text-2xl", "text-3xl"][Math.floor(Math.random() * 4)],
      }))
      setDollars(newDollars)
    }

    generateDollars()
    const interval = setInterval(generateDollars, 20000)

    // Regenerate on resize
    const handleResize = () => generateDollars()
    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {dollars.map((dollar) => (
            <motion.div
                key={dollar.id}
                className={`absolute ${dollar.size} font-bold text-[#cfff5e] opacity-[0.03]`}
                style={{ left: `${dollar.x}%` }}
                initial={{ y: "100vh", rotate: 0, opacity: 0 }}
                animate={{
                  y: "-10vh",
                  rotate: 360,
                  opacity: [0, 0.03, 0.06, 0.03, 0],
                }}
                transition={{
                  duration: dollar.duration,
                  delay: dollar.delay,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
            >
              $
            </motion.div>
        ))}
      </div>
  )
}

export default function HomePage() {
  const [email, setEmail] = useState("")
  const [userCount, setUserCount] = useState(0)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/register")
        const data = await res.json()

        if (!res.ok || typeof data.count !== "number") {
          console.error("Failed to fetch user count")
          return
        }

        // Animate count-up
        let current = 0
        const target = data.count
        const increment = Math.ceil(target / 100)

        const interval = setInterval(() => {
          current += increment
          if (current >= target) {
            setUserCount(target)
            clearInterval(interval)
          } else {
            setUserCount(current)
          }
        }, 20)
      } catch (err) {
        console.error("Error fetching user count:", err)
      }
    }

    fetchCount()
  }, [])


  const isDisposableEmail = (email: string): boolean => {
    const domain = email.split("@")[1]?.toLowerCase()
    return disposableEmailDomains.includes(domain)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.warning("Please enter your email.")
      return
    }

    if (isDisposableEmail(email)) {
      toast.error("Disposable email addresses are not allowed.")
      return
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const result = await res.json()

      if (!res.ok) {
        toast.error(`${result.error || "Something went wrong. Try again."}`)
        return
      }

      toast.success("You're on the list! Welcome to the club")
      setEmail("")
    } catch (err) {
      console.error("[REGISTER SUBMIT ERROR]", err)
      toast.error("Unexpected server error. Try again later.")
    }
  }



  return (
      <div className="min-h-screen bg-[#232221] text-[#f7f7f7] overflow-x-hidden">
        <AnimatedBackground />
        <Navbar />

        {/* Hero Section */}
        <section
            id="home"
            className="min-h-screen flex items-center justify-center relative pt-20 pb-10 px-4 sm:px-6 lg:px-16"
        >
          <div className="absolute inset-0 bg-gradient-radial from-[#cfff5e]/12 via-[#cfff5e]/4 to-transparent opacity-60" />

          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
              {/* Hero Content */}
              <motion.div
                  className="text-center lg:text-left space-y-6 sm:space-y-8 lg:space-y-10 order-2 lg:order-1"
                  initial={{opacity: 0, y: 60}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 1, ease: "easeOut"}}
              >


                <motion.h1
                    className="text-7xl sm:text-7xl md:text-7xl lg:text-8xl xl:text-8xl font-black leading-[0.9] tracking-tight"
                    initial={{opacity: 0, y: 40}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.5, duration: 1, ease: "easeOut"}}
                >
                  <motion.span
                      className="text-[#f7f7f7] block mb-1 sm:mb-2"
                      whileHover={{scale: 1.02}}
                      transition={{duration: 0.3}}
                  >
                    Contri?
                  </motion.span>
                  <motion.span
                      className="bg-gradient-to-r from-[#cfff5e] via-[#8c7dff] to-[#b87eed] bg-clip-text text-transparent block"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      style={{backgroundSize: "200% 200%"}}
                  >
                    Sorted!
                  </motion.span>
                </motion.h1>

                <motion.div
                    className="space-y-3 sm:space-y-4"
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.7, duration: 0.8}}
                >
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium text-[#f7f7f7]/95 leading-relaxed">
                    Split bills instantly. Track seamlessly. Pay with ease.
                  </p>
                  <p className="text-base sm:text-lg text-[#cfff5e] font-semibold tracking-wide">
                    The future of group expenses is here.
                  </p>
                </motion.div>

                {/* Enhanced Input/Button Combo */}
                <div className="flex p-2 items-center justify-center">
                  <motion.form
                      onSubmit={handleSubmit}
                      className="w-full max-w-2xl mx-auto lg:mx-0"
                      initial={{opacity: 0, y: 30}}
                      animate={{opacity: 1, y: 0}}
                      transition={{delay: 0.9, duration: 0.8}}
                  >
                    {/* Desktop Layout - Original side-by-side */}
                    <motion.div
                        className="hidden sm:block relative group"
                        whileHover={{scale: 1.02}}
                        transition={{duration: 0.3, ease: "easeOut"}}
                    >
                      <div
                          className="absolute -inset-1 bg-gradient-to-r from-[#cfff5e] via-[#8c7dff] to-[#b87eed] rounded-full blur-sm opacity-20 group-hover:opacity-40 transition-all duration-500"/>

                      <div
                          className="relative bg-[#2d2c2a]/70 backdrop-blur-3xl rounded-full p-2 border border-[#cfff5e]/20 shadow-2xl group-hover:border-[#cfff5e]/40 transition-all duration-300">
                        <div className="flex items-center">
                          <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email address"
                              className="flex-1 bg-transparent px-6 lg:px-8 py-4 text-[#f7f7f7] placeholder-[#f7f7f7]/50 focus:outline-none text-base font-medium rounded-full focus:placeholder-[#f7f7f7]/70 transition-all duration-300"
                              required
                          />
                          <motion.button
                              type="submit"
                              className="bg-gradient-to-r cursor-pointer from-[#cfff5e] to-[#a4de02] text-[#232221] px-8 lg:px-10 py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:shadow-[#cfff5e]/40 transition-all duration-300 whitespace-nowrap relative overflow-hidden group"
                              whileHover={{scale: 1.05}}
                              whileTap={{scale: 0.98}}
                          >
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-[#a4de02] to-[#cfff5e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                            <span className="relative z-10">Join Waitlist</span>
                            <motion.div
                                className="relative z-10"
                                animate={{x: [0, 3, 0]}}
                                transition={{duration: 2, repeat: Number.POSITIVE_INFINITY}}
                            >
                              <ArrowRight className="w-4 h-4"/>
                            </motion.div>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>

                    {/* Mobile Layout - Separated input and button */}
                    <div className="sm:hidden space-y-4">
                      {/* Email Input - Separate container */}
                      <motion.div
                          className="relative group"
                          whileHover={{scale: 1.02}}
                          transition={{duration: 0.3, ease: "easeOut"}}
                      >
                        <div
                            className="absolute -inset-1 bg-gradient-to-r from-[#cfff5e] via-[#8c7dff] to-[#b87eed] rounded-full blur-sm opacity-20 group-hover:opacity-40 transition-all duration-500"/>

                        <div
                            className="relative bg-[#2d2c2a]/70 backdrop-blur-3xl rounded-full border border-[#cfff5e]/20 shadow-2xl group-hover:border-[#cfff5e]/40 transition-all duration-300">
                          <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email address"
                              className="w-full bg-transparent px-6 py-4 text-[#f7f7f7] placeholder-[#f7f7f7]/50 focus:outline-none text-base font-medium rounded-full focus:placeholder-[#f7f7f7]/70 transition-all duration-300"
                              required
                          />
                        </div>
                      </motion.div>

                      {/* Submit Button - Completely separate */}
                      <motion.div
                          className="relative group"
                          whileHover={{scale: 1.02}}
                          transition={{duration: 0.3, ease: "easeOut"}}
                      >
                        <div
                            className="absolute -inset-1 bg-gradient-to-r from-[#cfff5e] to-[#a4de02] rounded-full blur-sm opacity-30 group-hover:opacity-50 transition-all duration-500"/>

                        <motion.button
                            type="submit"
                            className="relative w-full bg-gradient-to-r cursor-pointer from-[#cfff5e] to-[#a4de02] text-[#232221] px-8 py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:shadow-[#cfff5e]/40 transition-all duration-300 overflow-hidden group"
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.98}}
                        >
                          <div
                              className="absolute inset-0 bg-gradient-to-r from-[#a4de02] to-[#cfff5e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                          <span className="relative z-10">Join Waitlist</span>
                          <motion.div
                              className="relative z-10"
                              animate={{x: [0, 3, 0]}}
                              transition={{duration: 2, repeat: Number.POSITIVE_INFINITY}}
                          >
                            <ArrowRight className="w-4 h-4"/>
                          </motion.div>
                        </motion.button>
                      </motion.div>
                    </div>
                  </motion.form>
                </div>


                <motion.div
                    className="flex items-center justify-center lg:justify-start gap-8 sm:gap-12 lg:gap-16 pt-4"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 1.1, duration: 0.8}}
                >
                  <motion.div
                      className="text-center group cursor-pointer"
                      whileHover={{scale: 1.05}}
                      transition={{duration: 0.3}}
                  >
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#cfff5e] relative mb-1 sm:mb-2">
                      {userCount.toLocaleString()}
                      <motion.div
                          className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-[#cfff5e] rounded-full"
                          animate={{scale: [1, 1.3, 1], opacity: [1, 0.7, 1]}}
                          transition={{duration: 2, repeat: Number.POSITIVE_INFINITY}}
                      />
                    </div>
                    <div
                        className="text-xs sm:text-sm opacity-70 font-medium tracking-wide group-hover:opacity-100 transition-opacity">
                      Users Joined
                    </div>
                  </motion.div>

                  <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-transparent via-[#cfff5e]/40 to-transparent"/>

                  <motion.div
                      className="text-center group cursor-pointer"
                      whileHover={{scale: 1.05}}
                      transition={{duration: 0.3}}
                  >
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#cfff5e] mb-1 sm:mb-2">24/7</div>
                    <div
                        className="text-xs sm:text-sm opacity-70 font-medium tracking-wide group-hover:opacity-100 transition-opacity">
                      Support
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Enhanced Hero Visual */}
              <motion.div
                  className="relative h-[400px] sm:h-[500px] lg:h-[700px] flex items-center justify-center order-1 lg:order-2"
                  style={{y: y1}}
                  initial={{opacity: 0, scale: 0.9}}
                  animate={{opacity: 1, scale: 1}}
                  transition={{delay: 0.8, duration: 1}}
              >
                {/* Animated Circles - Responsive sizes */}
                <motion.div
                    className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 border-2 border-[#cfff5e]/20 rounded-full"
                    animate={{rotate: 360}}
                    transition={{duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear"}}
                />
                <motion.div
                    className="absolute w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 border-2 border-[#8c7dff]/15 rounded-full"
                    animate={{rotate: -360}}
                    transition={{duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear"}}
                />
                <motion.div
                    className="absolute w-80 h-80 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] border-2 border-[#b87eed]/10 rounded-full"
                    animate={{rotate: 360}}
                    transition={{duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "linear"}}
                />

                <Image
                    src="/phonemockup.png"
                    width={250}
                    height={300}
                    alt="phone mockup"
                    className="sm:w-[200px] z-5 w-[160px] lg:w-[300px] "
                />

                {/* Interactive Cards - Hide some on mobile */}
                <motion.div
                    className="absolute top-3 sm:top-8 left-2 sm:left-8 bg-[#2d2c2a]/95 backdrop-blur-xl border border-[#cfff5e]/20 rounded-2xl p-3 sm:p-5 w-40 sm:w-52 shadow-lg"
                    initial={{opacity: 0, x: -50}}
                    animate={{opacity: 1, x: 0}}
                    transition={{delay: 1.2}}
                    whileHover={{scale: 1.05, y: -8, borderColor: "#cfff5e"}}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center">
                      <Split className="w-6 h-6 sm:w-8 sm:h-8 text-[#cfff5e]"/>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm">Dinner Split</h4>
                      <div className="text-[#cfff5e] font-black text-sm sm:text-lg">$240.00</div>
                    </div>
                  </div>
                  <div className="w-full bg-[#cfff5e]/10 rounded-full h-1.5 sm:h-2">
                    <motion.div
                        className="bg-gradient-to-r from-[#cfff5e] to-[#8c7dff] h-1.5 sm:h-2 rounded-full"
                        initial={{width: 0}}
                        animate={{width: "65%"}}
                        transition={{delay: 2, duration: 1}}
                    />
                  </div>
                </motion.div>

                <motion.div
                    className="absolute top-6 z-10 sm:top-12 right-2 sm:right-8 bg-[#2d2c2a]/95 backdrop-blur-xl border border-[#cfff5e]/20 rounded-2xl p-3 sm:p-5 w-36 sm:w-48 shadow-lg"
                    initial={{opacity: 0, x: 50}}
                    animate={{opacity: 1, x: 0}}
                    transition={{delay: 1.4}}
                    whileHover={{scale: 1.05, y: -8, borderColor: "#cfff5e"}}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <BarChart3 className="w-6 h-6 sm:w-10 sm:h-10 text-[#cfff5e]"/>
                    <h4 className="font-bold text-xs sm:text-sm">Monthly Spending</h4>
                  </div>
                  <div className="flex items-end gap-1 h-8 sm:h-12">
                    {[60, 80, 45, 90].map((height, i) => (
                        <motion.div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-[#cfff5e] to-[#8c7dff] rounded-sm"
                            initial={{height: 0}}
                            animate={{height: `${height}%`}}
                            transition={{delay: 2.2 + i * 0.2, duration: 0.5}}
                        />
                    ))}
                  </div>
                </motion.div>

                {/* Hide these cards on very small screens */}
                <motion.div
                    className="absolute bottom-14 sm:bottom-24 left-2 sm:left-8 bg-[#2d2c2a]/95 backdrop-blur-xl border border-[#cfff5e]/20 rounded-2xl p-3 sm:p-5 w-32 sm:w-44 shadow-lg"
                    initial={{opacity: 0, x: -50}}
                    animate={{opacity: 1, x: 0}}
                    transition={{delay: 1.6}}
                    whileHover={{scale: 1.05, y: -8, borderColor: "#cfff5e"}}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-[#cfff5e]" />
                    <h4 className="font-bold text-xs sm:text-sm">Quick Pay</h4>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <motion.div
                        className="w-2 h-2 sm:w-3 sm:h-3 bg-[#cfff5e] rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <span className="text-[#cfff5e] text-xs sm:text-sm font-semibold">Completed</span>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#cfff5e] ml-auto" />
                  </div>
                </motion.div>

                <motion.div
                    className="absolute bottom-10 sm:bottom-20 z-10 -right-2 sm:right-5 bg-[#2d2c2a]/95 backdrop-blur-xl border border-[#cfff5e]/20 rounded-2xl p-3 sm:p-5 w-36 sm:w-48 shadow-lg"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.8 }}
                    whileHover={{ scale: 1.05, y: -8, borderColor: "#cfff5e" }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Users className="w-6 h-6 sm:w-8 sm:h-8 text-[#cfff5e]" />
                    <h4 className="font-bold text-xs sm:text-sm">Live Users</h4>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-black text-[#cfff5e] relative">
                      {userCount}
                      <motion.div
                          className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-[#cfff5e] rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </div>
                    <div className="text-xs opacity-70 mb-2 sm:mb-3">waiting</div>
                    <div className="flex justify-center gap-1">
                      {[...Array(3)].map((_, i) => (
                          <motion.div
                              key={i}
                              className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-[#cfff5e]"
                              style={{
                                background: [
                                  "linear-gradient(135deg, #ff6b6b, #feca57)",
                                  "linear-gradient(135deg, #48dbfb, #0abde3)",
                                  "linear-gradient(135deg, #ff9ff3, #f368e0)",
                                ][i],
                              }}
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ delay: i, duration: 3, repeat: Number.POSITIVE_INFINITY }}
                          />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Floating Elements - Reduce on mobile */}
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-[#cfff5e] text-lg sm:text-2xl lg:text-3xl font-bold opacity-20 hidden sm:block"
                        style={{
                          top: `${15 + i * 20}%`,
                          left: `${10 + (i % 2) * 80}%`,
                        }}
                        animate={{
                          y: [-15, 15, -15],
                          rotate: [0, 90, 180, 270, 360],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i,
                          ease: "easeInOut",
                        }}
                    >
                      $
                    </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <FeaturesSection />

        {/* Secondary CTA */}
        <section id="contact" className="pt-20 sm:pt-34 lg:pt-44 text-center relative px-4 sm:px-6">
          <motion.div className="container mx-auto max-w-5xl" style={{ y: y2 }}>
            <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-black mb-6 sm:mb-8 tracking-tight"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
              Ready to get started?
            </motion.h2>
            <motion.p
                className="text-lg sm:text-xl lg:text-2xl mb-12 sm:mb-16 opacity-90 font-medium"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
              Join <span className="text-[#cfff5e] font-bold">{userCount.toLocaleString()}+</span> early users.
            </motion.p>
            <div className="flex items-center justify-center">
              <motion.form
                  onSubmit={handleSubmit}
                  className="w-full max-w-2xl mx-auto lg:mx-0"
                  initial={{opacity: 0, y: 30}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: 0.9, duration: 0.8}}
              >
                {/* Desktop Layout - Original side-by-side */}
                <motion.div
                    className="hidden sm:block relative group"
                    whileHover={{scale: 1.02}}
                    transition={{duration: 0.3, ease: "easeOut"}}
                >
                  <div
                      className="absolute -inset-1 bg-gradient-to-r from-[#cfff5e] via-[#8c7dff] to-[#b87eed] rounded-full blur-sm opacity-20 group-hover:opacity-40 transition-all duration-500"/>

                  <div
                      className="relative bg-[#2d2c2a]/70 backdrop-blur-3xl rounded-full p-2 border border-[#cfff5e]/20 shadow-2xl group-hover:border-[#cfff5e]/40 transition-all duration-300">
                    <div className="flex items-center">
                      <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="flex-1 bg-transparent px-6 lg:px-8 py-4 text-[#f7f7f7] placeholder-[#f7f7f7]/50 focus:outline-none text-base font-medium rounded-full focus:placeholder-[#f7f7f7]/70 transition-all duration-300"
                          required
                      />
                      <motion.button
                          type="submit"
                          className="bg-gradient-to-r cursor-pointer from-[#cfff5e] to-[#a4de02] text-[#232221] px-8 lg:px-10 py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:shadow-[#cfff5e]/40 transition-all duration-300 whitespace-nowrap relative overflow-hidden group"
                          whileHover={{scale: 1.05}}
                          whileTap={{scale: 0.98}}
                      >
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-[#a4de02] to-[#cfff5e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                        <span className="relative z-10">Join Waitlist</span>
                        <motion.div
                            className="relative z-10"
                            animate={{x: [0, 3, 0]}}
                            transition={{duration: 2, repeat: Number.POSITIVE_INFINITY}}
                        >
                          <ArrowRight className="w-4 h-4"/>
                        </motion.div>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Mobile Layout - Separated input and button */}
                <div className="sm:hidden space-y-4">
                  {/* Email Input - Separate container */}
                  <motion.div
                      className="relative group"
                      whileHover={{scale: 1.02}}
                      transition={{duration: 0.3, ease: "easeOut"}}
                  >
                    <div
                        className="absolute -inset-1 bg-gradient-to-r from-[#cfff5e] via-[#8c7dff] to-[#b87eed] rounded-full blur-sm opacity-20 group-hover:opacity-40 transition-all duration-500"/>

                    <div
                        className="relative bg-[#2d2c2a]/70 backdrop-blur-3xl rounded-full border border-[#cfff5e]/20 shadow-2xl group-hover:border-[#cfff5e]/40 transition-all duration-300">
                      <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full bg-transparent px-6 py-4 text-[#f7f7f7] placeholder-[#f7f7f7]/50 focus:outline-none text-base font-medium rounded-full focus:placeholder-[#f7f7f7]/70 transition-all duration-300"
                          required
                      />
                    </div>
                  </motion.div>

                  {/* Submit Button - Completely separate */}
                  <motion.div
                      className="relative group"
                      whileHover={{scale: 1.02}}
                      transition={{duration: 0.3, ease: "easeOut"}}
                  >
                    <div
                        className="absolute -inset-1 bg-gradient-to-r from-[#cfff5e] to-[#a4de02] rounded-full blur-sm opacity-30 group-hover:opacity-50 transition-all duration-500"/>

                    <motion.button
                        type="submit"
                        className="relative w-full bg-gradient-to-r cursor-pointer from-[#cfff5e] to-[#a4de02] text-[#232221] px-8 py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:shadow-[#cfff5e]/40 transition-all duration-300 overflow-hidden group"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.98}}
                    >
                      <div
                          className="absolute inset-0 bg-gradient-to-r from-[#a4de02] to-[#cfff5e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                      <span className="relative z-10">Join Waitlist</span>
                      <motion.div
                          className="relative z-10"
                          animate={{x: [0, 3, 0]}}
                          transition={{duration: 2, repeat: Number.POSITIVE_INFINITY}}
                      >
                        <ArrowRight className="w-4 h-4"/>
                      </motion.div>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.form>
            </div>
          </motion.div>
        </section>

        <Footer/>
      </div>
  )
}
