"use client"

import { motion } from "framer-motion"
import { Zap, TrendingUp, CreditCard, BarChart3, Bell, Brain } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Smart Splits",
      description:
          "Intelligent bill splitting algorithms that make expense sharing fair and easy. Split bills evenly or customize based on individual contributions.",
      featured: false,
    },
    {
      icon: TrendingUp,
      title: "Track Group Spending",
      description:
          "Real-time expense tracking with instant notifications. Stay updated on group finances and monitor shared expenses effortlessly.",
      featured: false,
    },
    {
      icon: CreditCard,
      title: "Quick Settlements",
      description:
          "Multiple payment options for instant bill settlements. Streamlined process to clear dues and maintain financial clarity within groups.",
      featured: true,
    },
    {
      icon: BarChart3,
      title: "Visual Insights",
      description:
          "Detailed analytics and spending patterns visualization. Track expenses by category, time period, and monitor individual contributions.",
      featured: false,
    },
    {
      icon: Bell,
      title: "Smart Reminders",
      description:
          "Automated payment reminders and due date alerts. Never miss a payment with intelligent notification system for all group members.",
      featured: false,
    },
    {
      icon: Brain,
      title: "Auto-Categorization",
      description:
          "AI-powered expense categorization for better organization. Automatically sort and label expenses for simplified expense management.",
      featured: true,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
      <section
          id="features"
          className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-transparent via-[#8c7dff]/3 to-[#b87eed]/3 relative px-4 sm:px-6"
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div
              className="text-center mb-12 sm:mb-16 lg:mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-[#cfff5e] to-[#8c7dff] bg-clip-text text-transparent">
              Powerful Features Coming Soon
            </h2>
            <p className="text-base sm:text-lg lg:text-xl opacity-80 max-w-2xl mx-auto">
              Everything you need to manage group expenses effortlessly
            </p>
          </motion.div>

          <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
          >
            {features.map((feature, index) => (
                <motion.div
                    key={feature.title}
                    className={`relative p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300 group hover:scale-105 hover:-translate-y-2 cursor-grab ${
                        feature.featured
                            ? "bg-[#2d2c2a]/60 backdrop-blur-lg border-white/10 hover:border-[#cfff5e]"
                            : "bg-[#2d2c2a]/60 backdrop-blur-lg border-white/10 hover:border-[#cfff5e]"
                    }`}
                    variants={itemVariants}
                    whileHover={{
                      boxShadow: feature.featured ? "0 25px 50px rgba(0, 0, 0, 0.2)" : "0 25px 50px rgba(0, 0, 0, 0.2)",
                    }}
                >
                  {/* Sparkle Effects */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-[#cfff5e] rounded-full"
                            style={{
                              top: `${20 + i * 30}%`,
                              left: `${80 - i * 30}%`,
                            }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 1,
                            }}
                        />
                    ))}
                  </div>

                  <div className="relative z-10">
                    <div className="mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r bg-[#cfff5e] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#232221]" />
                      </div>
                    </div>

                    <h3
                        className={`text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 ${feature.featured ? "text-[#f7f7f7]" : "text-[#f7f7f7]"}`}
                    >
                      {feature.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#f7f7f7]/90 leading-relaxed">{feature.description}</p>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#cfff5e]/10 to-[#8c7dff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
  )
}
