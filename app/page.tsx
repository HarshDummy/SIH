"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { mockBuses, mockBusStops, getOccupancyColor, getOccupancyBg } from "@/lib/mock-data"
import { Clock, Users, Star, Leaf, Bus, User } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [startStop, setStartStop] = useState("")
  const [endStop, setEndStop] = useState("")

  const nearbyBuses = mockBuses.slice(0, 3)

  const handleSearch = () => {
    if (startStop && endStop) {
      window.location.href = `/user?start=${startStop}&end=${endStop}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bus className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">SmartBus</h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/driver">
                <Button variant="outline">Driver Login</Button>
              </Link>
              <Link href="/user">
                <Button>User Portal</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-balance">SmartBus - Real-Time Bus Tracking</h2>
          <p className="text-xl text-gray-600 mb-8 text-pretty">
            Track buses in real-time, avoid crowds, and travel smarter
          </p>

          {/* Quick Search */}
          <Card className="max-w-2xl mx-auto mb-12">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={startStop} onValueChange={setStartStop}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select Start Stop" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockBusStops.map((stop) => (
                      <SelectItem key={stop.id} value={stop.id}>
                        {stop.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={endStop} onValueChange={setEndStop}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select Destination Stop" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockBusStops.map((stop) => (
                      <SelectItem key={stop.id} value={stop.id}>
                        {stop.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleSearch} className="sm:w-auto w-full">
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Buses Near You */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Next Buses Near You</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nearbyBuses.map((bus) => (
              <Card key={bus.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{bus.busNumber}</span>
                    <Badge className={getOccupancyBg(bus.occupancy)}>
                      <span className={getOccupancyColor(bus.occupancy)}>{bus.occupancy}</span>
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{bus.eta} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">{bus.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{bus.route}</p>
                    <p className="text-lg font-semibold">${bus.fare}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Use SmartBus */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Use SmartBus</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Save Time</h4>
              <p className="text-gray-600">Real-time tracking helps you plan your journey and avoid waiting</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Avoid Crowding</h4>
              <p className="text-gray-600">Check occupancy levels and choose less crowded buses</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Go Green</h4>
              <p className="text-gray-600">Reduce your carbon footprint by using public transportation</p>
            </div>
          </div>
        </section>

        {/* Eco Impact Counter */}
        <section className="mb-16">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Leaf className="h-6 w-6 text-green-600" />
                <span className="text-2xl font-bold text-green-800">120kg</span>
              </div>
              <p className="text-green-700">CO₂ saved this month by SmartBus users</p>
            </CardContent>
          </Card>
        </section>

        {/* Call-to-Action Cards */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-blue-50 border-blue-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <Bus className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">For Drivers</h4>
                <p className="text-gray-600 mb-4">Share your bus location and help passengers plan better</p>
                <Link href="/driver">
                  <Button className="w-full">Start Sharing Location</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <User className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">For Users</h4>
                <p className="text-gray-600 mb-4">Track buses in real-time and never miss your ride</p>
                <Link href="/user">
                  <Button className="w-full" variant="secondary">
                    Track Buses Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </section>
    </div>
  )
}
