"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Leaf, Sun, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [barcode, setBarcode] = useState("")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-nunito overflow-hidden">
      {/* Header with stylized sunrise and hills background */}
      <header className="relative w-full py-32 md:py-40 px-4 overflow-hidden">
        {/* Sunrise gradient background with subtle texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-300 via-orange-300 to-sky-400 opacity-90">
          <div className="absolute inset-0 bg-[url('/assets/subtle-texture.png')] opacity-10"></div>
        </div>

        {/* Animated floating elements */}
        <motion.div
          className="absolute top-20 right-1/4 w-16 h-16"
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Sun className="w-full h-full text-yellow-200 opacity-70" />
        </motion.div>

        <motion.div
          className="absolute bottom-40 left-1/4 w-12 h-12"
          animate={{ y: [0, -10, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Leaf className="w-full h-full text-green-200 opacity-70" />
        </motion.div>

        {/* Animated floating clouds */}
        <motion.div
          className="absolute top-12 left-1/4 w-24 h-12 bg-white rounded-full opacity-80 shadow-sm"
          animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        ></motion.div>
        <motion.div
          className="absolute top-8 left-1/2 w-32 h-16 bg-white rounded-full opacity-80 shadow-sm"
          animate={{ y: [0, -15, 0], x: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        ></motion.div>
        <motion.div
          className="absolute top-20 left-2/3 w-28 h-14 bg-white rounded-full opacity-80 shadow-sm"
          animate={{ y: [0, -8, 0], x: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        ></motion.div>

        {/* Cloud details */}
        <motion.div
          className="absolute top-8 left-1/4 ml-6 w-12 h-8 bg-white rounded-full opacity-80"
          animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        ></motion.div>
        <motion.div
          className="absolute top-4 left-1/2 ml-10 w-16 h-10 bg-white rounded-full opacity-80"
          animate={{ y: [0, -15, 0], x: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        ></motion.div>
        <motion.div
          className="absolute top-16 left-2/3 ml-8 w-14 h-9 bg-white rounded-full opacity-80"
          animate={{ y: [0, -8, 0], x: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        ></motion.div>

        {/* Stylized hills */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-green-500 rounded-t-[100%] transform translate-y-12 z-10"></div>
        <div className="absolute bottom-0 left-1/4 right-0 h-24 bg-green-600 rounded-t-[100%] transform translate-y-8 z-20"></div>
        <div className="absolute bottom-0 left-0 right-1/4 h-16 bg-green-400 rounded-t-[100%] transform translate-y-4 z-30"></div>

        <div className="container mx-auto relative z-40">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <div className="inline-block bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-full mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg">
                  <div className="relative">
                    <Sun className="w-10 h-10 text-yellow-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    <Leaf className="w-6 h-6 text-green-500 absolute bottom-0 right-0" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-md tracking-tight mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              EthicScope
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white font-medium drop-shadow-md mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Scan products, discover their impact
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col items-center gap-4"
            >
              <Link href="/scanner" className="w-full max-w-xs">
                <Button
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 rounded-full text-lg shadow-lg transition-all hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 group"
                >
                  <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Start Scanning
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link
                href="/results"
                className="text-white hover:text-green-100 font-medium underline underline-offset-4 transition-colors"
              >
                View Demo Results
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Frog mascot sitting on hill */}
        <motion.div
          className="absolute bottom-0 right-16 z-40"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="relative w-16 h-16">
            <div className="absolute bottom-0 w-16 h-10 bg-green-600 rounded-full"></div>
            <div className="absolute bottom-4 w-14 h-14 bg-green-400 rounded-full"></div>
            <div className="absolute bottom-8 left-2 w-4 h-4 bg-white rounded-full"></div>
            <div className="absolute bottom-8 right-2 w-4 h-4 bg-white rounded-full"></div>
            <div className="absolute bottom-8 left-3 w-2 h-2 bg-black rounded-full"></div>
            <div className="absolute bottom-8 right-3 w-2 h-2 bg-black rounded-full"></div>
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-green-700 rounded-full"></div>
          </div>
        </motion.div>

        {/* Bunny peeking over hill */}
        <motion.div
          className="absolute bottom-8 left-20 z-40"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="relative w-20 h-12">
            <div className="absolute bottom-0 w-16 h-8 bg-gray-100 rounded-t-full"></div>
            <div className="absolute bottom-4 left-0 w-4 h-12 bg-gray-100 rounded-full transform -rotate-12"></div>
            <div className="absolute bottom-4 right-0 w-4 h-12 bg-gray-100 rounded-full transform rotate-12"></div>
            <div className="absolute bottom-2 left-4 w-3 h-3 bg-pink-200 rounded-full"></div>
            <div className="absolute bottom-2 right-4 w-3 h-3 bg-pink-200 rounded-full"></div>
            <div className="absolute bottom-2 left-5 w-1.5 h-1.5 bg-black rounded-full"></div>
            <div className="absolute bottom-2 right-5 w-1.5 h-1.5 bg-black rounded-full"></div>
          </div>
        </motion.div>
      </header>

      {/* Features section */}
      <section className="py-16 px-4 bg-white relative z-10">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-600">How EthicScope Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-neutral-50 rounded-2xl p-6 shadow-md flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-600">Scan</h3>
              <p className="text-gray-600">Scan product barcodes or search by name to begin the analysis process.</p>
            </motion.div>

            <motion.div
              className="bg-neutral-50 rounded-2xl p-6 shadow-md flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Sun className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-600">Analyze</h3>
              <p className="text-gray-600">
                Our algorithm evaluates ethical and environmental impact from multiple data sources.
              </p>
            </motion.div>

            <motion.div
              className="bg-neutral-50 rounded-2xl p-6 shadow-md flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Leaf className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-orange-600">Discover</h3>
              <p className="text-gray-600">
                View comprehensive results and make more informed, ethical purchasing decisions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-8 px-4 relative">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            {/* Cow mascot */}
            <motion.div
              className="relative w-14 h-12 mr-4"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <div className="absolute bottom-0 w-12 h-7 bg-white rounded-t-full"></div>
              <div className="absolute bottom-5 w-14 h-7 bg-white rounded-full"></div>
              <div className="absolute bottom-7 left-3 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute bottom-7 right-3 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute top-0 left-2 w-3 h-3 bg-white rounded-full"></div>
              <div className="absolute top-0 right-2 w-3 h-3 bg-white rounded-full"></div>
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-5 h-1.5 bg-pink-300 rounded-full"></div>
            </motion.div>
            <div>
              <p className="font-medium">© 2025 EthicScope</p>
              <p className="text-sm text-green-100">All rights reserved</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button className="bg-white text-green-600 hover:bg-green-100 font-bold py-2 px-6 rounded-full transition-all shadow-sm hover:shadow-md hover:scale-105">
              Contact Us
            </Button>
            <Button className="bg-yellow-400 text-green-800 hover:bg-yellow-300 font-bold py-2 px-6 rounded-full transition-all shadow-sm hover:shadow-md hover:scale-105">
              Learn More
            </Button>
          </div>
        </div>
      </footer>

      <div className="container mx-auto">
        {barcode && <p>Scanned Barcode: {barcode}</p>}
      </div>
    </div>
  )
}
