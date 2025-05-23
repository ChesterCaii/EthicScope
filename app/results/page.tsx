"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Heart,
  Factory,
  Droplet,
  Leaf,
  ChevronRight,
  Globe,
  FileText,
  Database,
  Building,
  ArrowLeft,
} from "lucide-react"
import EthicalScoreGauge from "@/components/ethical-score-gauge"
import EnvironmentalScoreGauge from "@/components/environmental-score-gauge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import axios from 'axios'

interface ApiResponse {
  ethicalScore: number;
  keyFactors: string[];
  environmentalScore: number;
  environmentalFactors: string[];
  geographicImpact: {
    northAmerica: string;
    europe: string;
    asia: string;
    southAmerica: string;
    africa: string;
  };
}

export default function ResultsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [data, setData] = useState<ApiResponse | null>(null)

  useEffect(() => {
    setIsLoaded(true)

    // Fetch data from Cerebras API
    axios.get<ApiResponse>('https://api.cerebras.com/endpoint', {
      headers: {
        'Authorization': `Bearer YOUR_API_KEY` // Replace with actual key in a secure way
      }
    })
    .then(response => {
      setData(response.data)
    })
    .catch(error => {
      console.error('Error fetching data:', error)
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-blue-300 flex flex-col font-nunito overflow-hidden">
      {/* Header with navigation */}
      <header className="bg-green-600 py-4 px-4 sticky top-0 z-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Link href="/scanner">
              <Button variant="ghost" className="text-white hover:bg-green-700 p-2">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span>Back to Scanner</span>
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-white">Scan Results</h1>
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-green-700 p-2">
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8 relative">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-yellow-100 rounded-full opacity-20 blur-3xl"></div>

        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl font-extrabold text-green-600 tracking-tight mr-3">Buldak Ramen Evaluation</h2>
            <p className="text-gray-500">Analysis completed on April 19, 2025</p>
          </div>
          <Button className="mt-4 md:mt-0 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2">
            New Scan <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Results cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Ethical Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-xl rounded-2xl overflow-hidden h-full bg-gradient-to-br from-white to-orange-50">
              <CardHeader className="pb-2 pt-6 px-6 relative">
                <div className="absolute top-4 right-4 w-8 h-8">
                  <div className="w-8 h-8 bg-yellow-200 rounded-full opacity-30"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-300 rounded-full"></div>
                </div>
                <div className="flex items-center">
                  <CardTitle className="text-2xl font-bold text-orange-600">Ethical Impact Score</CardTitle>
                  <div className="ml-2 w-6 h-6 bg-yellow-300 rounded-full relative">
                    <div className="absolute top-1.5 left-1 w-1.5 h-1.5 bg-black rounded-full"></div>
                    <div className="absolute top-3 left-2.5 w-3 h-1.5 bg-orange-500 rounded-sm transform rotate-12"></div>
                  </div>
                </div>
                <CardDescription className="text-orange-700 mt-1">Buldak Ramen has a moderate ethical impact, with concerns about labor practices and fair wages.</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6 flex flex-col items-center">
                <div className="w-full flex justify-center py-4">
                  <EthicalScoreGauge score={45} maxScore={100} />
                </div>
                <div className="w-full mt-4">
                  <p className="text-gray-700 font-bold mb-3 flex items-center">
                    <span className="w-2 h-6 bg-orange-500 rounded-full mr-2"></span>
                    Key Factors:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                      <Factory className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Child labor concerns</span>
                    </li>
                    <li className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                      <Heart className="h-5 w-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Lack of fair wages</span>
                    </li>
                    <li className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                      <Leaf className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Unsafe working conditions</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Environmental Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-xl rounded-2xl overflow-hidden h-full bg-gradient-to-br from-white to-green-50">
              <CardHeader className="pb-2 pt-6 px-6 relative">
                <div className="absolute top-4 right-4 w-8 h-8">
                  <div className="w-8 h-8 bg-green-200 rounded-full opacity-30"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-green-300 rounded-full"></div>
                </div>
                <CardTitle className="text-2xl font-bold text-green-600">Environmental Impact</CardTitle>
                <CardDescription className="text-green-700 mt-1">Buldak Ramen has a significant environmental impact, with high carbon emissions and deforestation concerns.</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6 flex flex-col items-center">
                <div className="w-full flex justify-center py-4">
                  <EnvironmentalScoreGauge score={60} maxScore={100} />
                </div>
                <div className="w-full mt-4">
                  <p className="text-gray-700 font-bold mb-3 flex items-center">
                    <span className="w-2 h-6 bg-green-500 rounded-full mr-2"></span>
                    Key Factors:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                      <Leaf className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">High carbon emissions</span>
                    </li>
                    <li className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                      <Factory className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Deforestation</span>
                    </li>
                    <li className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                      <Droplet className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Water pollution</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Geographic Impact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 lg:col-span-1"
          >
            <Card className="border-0 shadow-xl rounded-2xl overflow-hidden h-full bg-gradient-to-br from-white to-blue-50">
              <CardHeader className="pb-2 pt-6 px-6 relative">
                <div className="absolute top-4 right-4 w-8 h-8">
                  <div className="w-8 h-8 bg-blue-200 rounded-full opacity-30"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-300 rounded-full"></div>
                </div>
                <CardTitle className="text-2xl font-bold text-blue-600">Geographic Impact</CardTitle>
                <CardDescription className="text-blue-700 mt-1">Buldak Ramen's impact varies by region, with notable effects in North America and Europe.</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="bg-white rounded-xl h-48 flex items-center justify-center mb-6 relative overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-blue-50"></div>

                  <div className="absolute top-1/4 left-1/4 w-24 h-16">
                    <div className="absolute inset-0 bg-green-300 rounded-lg opacity-70"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-green-800">85%</span>
                    </div>
                  </div>

                  <div className="absolute top-1/4 left-1/2 w-16 h-12">
                    <div className="absolute inset-0 bg-yellow-300 rounded-lg opacity-70"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-yellow-800">75%</span>
                    </div>
                  </div>

                  <div className="absolute top-1/3 right-1/4 w-20 h-14">
                    <div className="absolute inset-0 bg-orange-300 rounded-lg opacity-70"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-orange-800">70%</span>
                    </div>
                  </div>

                  <div className="absolute bottom-1/4 left-1/3 w-16 h-12">
                    <div className="absolute inset-0 bg-blue-300 rounded-lg opacity-70"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-800">80%</span>
                    </div>
                  </div>

                  <div className="absolute bottom-1/3 right-1/3 w-14 h-14">
                    <div className="absolute inset-0 bg-purple-300 rounded-lg opacity-70"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-purple-800">65%</span>
                    </div>
                  </div>

                  <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 p-1 rounded-md">
                    <div className="text-[10px] font-bold text-gray-600">Impact Score</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="font-bold text-gray-700 mb-2 flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-blue-500" />
                      Primary Regions:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white p-2 rounded-lg shadow-sm flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-sm">North America</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg shadow-sm flex items-center">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                        <span className="text-sm">Europe</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105">
                    View Detailed Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Sources Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="md:col-span-2 lg:col-span-3"
          >
            <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-gradient-to-br from-white to-purple-50">
              <CardHeader className="pb-2 pt-6 px-6 relative">
                <div className="absolute top-4 right-4 w-8 h-8">
                  <div className="w-8 h-8 bg-purple-200 rounded-full opacity-30"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-300 rounded-full"></div>
                </div>
                <CardTitle className="text-2xl font-bold text-purple-600">Data Sources</CardTitle>
                <CardDescription className="text-purple-700 mt-1">
                  Information collection and verification
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Building className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-bold text-gray-800">International Labour Organization</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Provides conventions and statistics on child labor, minimum age, and hazardous work.
                    </div>
                    <div className="mt-2 flex items-center">
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                      <span className="ml-2 text-xs font-bold text-blue-600">85%</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Globe className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="font-bold text-gray-800">World Wildlife Fund</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Offers data on biodiversity loss and GHG emissions related to food production.
                    </div>
                    <div className="mt-2 flex items-center">
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "80%" }}></div>
                      </div>
                      <span className="ml-2 text-xs font-bold text-green-600">80%</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <FileText className="h-4 w-4 text-yellow-600" />
                      </div>
                      <span className="font-bold text-gray-800">Fair Trade International</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Provides standards on fair wages and ethical sourcing.
                    </div>
                    <div className="mt-2 flex items-center">
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                      <span className="ml-2 text-xs font-bold text-yellow-600">75%</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center mb-3">
                      <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Database className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="font-bold text-gray-800">Greenpeace</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Researches food system impacts, including emissions and land use.
                    </div>
                    <div className="mt-2 flex items-center">
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                      <span className="ml-2 text-xs font-bold text-orange-600">70%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-6 px-4 relative mt-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="font-medium">© 2025 EthicScope</p>
            <p className="text-sm text-green-100">All rights reserved</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Button className="bg-white text-green-600 hover:bg-green-100 font-bold py-2 px-6 rounded-full transition-all shadow-sm hover:shadow-md hover:scale-105">
              Share Results
            </Button>
            <Button className="bg-yellow-400 text-green-800 hover:bg-yellow-300 font-bold py-2 px-6 rounded-full transition-all shadow-sm hover:shadow-md hover:scale-105">
              Download Report
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
