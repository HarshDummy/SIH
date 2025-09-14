"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  mockBuses,
  mockBusStops,
  mockPastRides,
  mockFavorites,
  getOccupancyColor,
  getOccupancyBg,
  type Bus,
} from "@/lib/mock-data"
import { Clock, Users, Star, BusIcon, Heart, Search, MapPin, DollarSign, Leaf, Trophy, Bell } from "lucide-react"
import Link from "next/link"

function UserInterfaceContent() {
  const searchParams = useSearchParams()
  const [startStop, setStartStop] = useState(searchParams?.get("start") || "")
  const [endStop, setEndStop] = useState(searchParams?.get("end") || "")
  const [searchResults, setSearchResults] = useState<Bus[]>([])
  const [favorites, setFavorites] = useState<string[]>(mockFavorites)
  const [activeTab, setActiveTab] = useState("home")

  // Mock ETA updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSearchResults((prev) =>
        prev.map((bus) => ({
          ...bus,
          eta: Math.max(1, bus.eta + (Math.random() > 0.5 ? -1 : 1)),
        })),
      )
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = () => {
    if (startStop && endStop) {
      // Mock search logic - filter buses that have both stops
      const results = mockBuses.filter(
        (bus) => bus.stops.some((stop) => stop.id === startStop) && bus.stops.some((stop) => stop.id === endStop),
      )
      setSearchResults(results.length > 0 ? results : mockBuses.slice(0, 2))
    }
  }

  const toggleFavorite = (busId: string) => {
    setFavorites((prev) => (prev.includes(busId) ? prev.filter((id) => id !== busId) : [...prev, busId]))
  }

  const favoriteBuses = mockBuses.filter((bus) => favorites.includes(bus.id))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <BusIcon className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">SmartBus</h1>
            </Link>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="past-rides">Past Rides</TabsTrigger>
            <TabsTrigger value="eco-impact">Eco Impact</TabsTrigger>
          </TabsList>

          {/* Home Tab - Search & Results */}
          <TabsContent value="home" className="space-y-6">
            {/* Search Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Find Your Bus</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select value={startStop} onValueChange={setStartStop}>
                    <SelectTrigger>
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
                    <SelectTrigger>
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
                  <Button onClick={handleSearch} className="w-full">
                    Search Buses
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Available Buses</h3>
                {searchResults.map((bus) => (
                  <Card key={bus.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold">{bus.busNumber}</h4>
                            <Badge className={getOccupancyBg(bus.occupancy)}>
                              <span className={getOccupancyColor(bus.occupancy)}>{bus.occupancy}</span>
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm">{bus.rating}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-2">{bus.route}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{bus.eta} min</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4" />
                              <span>${bus.fare}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{bus.driverName}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleFavorite(bus.id)}
                            className={favorites.includes(bus.id) ? "text-red-600" : ""}
                          >
                            <Heart className={`h-4 w-4 ${favorites.includes(bus.id) ? "fill-current" : ""}`} />
                          </Button>
                          <Link href={`/user/bus/${bus.id}`}>
                            <Button size="sm">View Details</Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Notifications */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Bus B101 is arriving in 5 minutes</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Your Favorite Buses</h3>
              <Badge variant="secondary">{favoriteBuses.length} buses</Badge>
            </div>

            {favoriteBuses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {favoriteBuses.map((bus) => (
                  <Card key={bus.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{bus.busNumber}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(bus.id)}
                          className="text-red-600"
                        >
                          <Heart className="h-4 w-4 fill-current" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-gray-600">{bus.route}</p>
                        <div className="flex items-center justify-between">
                          <Badge className={getOccupancyBg(bus.occupancy)}>
                            <span className={getOccupancyColor(bus.occupancy)}>{bus.occupancy}</span>
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">{bus.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>${bus.fare}</span>
                          <span>{bus.eta} min ETA</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No favorite buses yet</p>
                  <p className="text-sm text-gray-500 mt-2">Add buses to your favorites from the search results</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Past Rides Tab */}
          <TabsContent value="past-rides" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Your Past Rides</h3>
              <Badge variant="secondary">{mockPastRides.length} rides</Badge>
            </div>

            <div className="space-y-4">
              {mockPastRides.map((ride) => (
                <Card key={ride.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold">{ride.busNumber}</h4>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">{ride.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {ride.startStop} → {ride.endStop}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${ride.fare}</p>
                        <p className="text-sm text-gray-500">{ride.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Eco Impact Tab */}
          <TabsContent value="eco-impact" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-green-800 mb-2">Your Environmental Impact</h3>
              <p className="text-gray-600">See how you're helping the planet</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-800 mb-2">3kg</div>
                  <p className="text-green-700">CO₂ saved this week</p>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <BusIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-800 mb-2">12</div>
                  <p className="text-blue-700">Bus rides this month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span>Top Rated Buses</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockBuses
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 3)
                    .map((bus, index) => (
                      <div key={bus.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              index === 0
                                ? "bg-yellow-100 text-yellow-800"
                                : index === 1
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <span className="font-medium">{bus.busNumber}</span>
                          <span className="text-gray-600">{bus.route}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-semibold">{bus.rating}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function UserInterface() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserInterfaceContent />
    </Suspense>
  )
}
