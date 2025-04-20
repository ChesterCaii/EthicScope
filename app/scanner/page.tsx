"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Camera, Search, Barcode, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType } from '@zxing/library'

export default function ScannerPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const codeReader = new BrowserMultiFormatReader()

  const hints = new Map()
  hints.set(DecodeHintType.POSSIBLE_FORMATS, [
    BarcodeFormat.EAN_13,
    BarcodeFormat.CODE_128,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.EAN_8
  ])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isScanning) {
      codeReader.decodeFromVideoDevice(
        null,
        videoRef.current,
        (result, err) => {
          if (result) {
            console.log('Barcode detected:', result.getText())
            window.location.href = "/results"
          }
          if (err && err.name !== 'NotFoundException') {
            console.error('Error during scanning:', err)
          }
        }
      ).catch((err) => console.error('Error initializing scanner:', err))
    }

    return () => {
      codeReader.reset()
    }
  }, [isScanning])

  const handleStartScan = () => {
    setIsScanning(true)
  }

  const handleStopScan = () => {
    codeReader.reset()
    setIsScanning(false)
  }

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch(err => console.error('Error accessing camera:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-blue-300 flex flex-col font-nunito">
      {/* Header */}
      <header className="bg-green-600 py-4 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-green-700 p-2">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span>Back</span>
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-white">Product Scanner</h1>
            <div className="w-24"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8 relative">
        {/* Animated clouds */}
        <div className="absolute top-0 left-0 w-full h-32 bg-clouds bg-repeat-x animate-clouds"></div>

        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className="p-6">
              <h2 className="text-3xl font-bold text-green-600 mb-4">Scan a Product</h2>
              <p className="text-gray-600 mb-6">Use your camera to scan a barcode or search for a product by name.</p>

              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search for a product..."
                    className="pl-10 py-6 rounded-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  {searchQuery && (
                    <button
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="text-center text-gray-500 text-sm">- OR -</div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-6 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                    onClick={handleStartScan}
                  >
                    <Camera className="w-5 h-5" />
                    Camera Scan
                  </Button>

                  <Button
                    className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-6 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                    onClick={handleStartScan}
                  >
                    <Upload className="w-5 h-5" />
                    Upload Image
                  </Button>
                </div>
              </div>
            </div>

            {isScanning && (
              <div className="p-6 bg-gray-50 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Scanning...</span>
                  <Button onClick={handleStopScan} className="text-red-500">Cancel</Button>
                </div>
                <video
                  ref={videoRef}
                  className="w-full max-w-md h-auto border-2 border-gray-300"
                  style={{ display: isScanning ? 'block' : 'none' }}
                />
                <div className="mt-4 flex justify-center">
                  <Barcode className="w-8 h-8 text-gray-400 animate-pulse" />
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-700 mb-4">Recently Scanned</h3>

              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-sm"></div>
                  </div>
                  <div>
                    <p className="font-medium">Organic Cotton T-Shirt</p>
                    <p className="text-sm text-gray-500">Scanned 2 days ago</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-green-100 rounded-md flex items-center justify-center mr-3">
                    <div className="w-6 h-6 bg-green-500 rounded-sm"></div>
                  </div>
                  <div>
                    <p className="font-medium">Eco-Friendly Detergent</p>
                    <p className="text-sm text-gray-500">Scanned 5 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 px-4">
        <div className="container mx-auto text-center text-sm text-gray-500">
          <p>© 2025 EthicScope. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
