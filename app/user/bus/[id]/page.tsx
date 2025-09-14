"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { mockBuses, getOccupancyColor, getOccupancyBg, type Bus } from "@/lib/mock-data"
import { ArrowLeft, Clock, Users, Star, MapPin, DollarSign, Navigation, Heart, Map, List } from "lucide-react"
import Link from "next/link"

export default function BusDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const busId = params?.id as string

  const [bus, setBus] = useState<Bus | null>(null)
  const [viewMode, setViewMode] = useState<"map" | "text">("text")
  const [userRating, setUserRating] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const foundBus = mockBuses.find((b) => b.id === busId)
    if (foundBus) {
      setBus(foundBus)
    }
  }, [busId])

  // Mock ETA updates
  useEffect(() => {
    if (bus) {
      const interval = setInterval(() => {
        setBus((prev) =>
          prev
            ? {
                ...prev,
                eta: Math.max(1, prev.eta + (Math.random() > 0.5 ? -1 : 1)),
              }
            : null,
        )
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [bus])

  const handleRating = (rating: number) => {
    setUserRating(rating)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  if (!bus) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Bus not found</h2>
          <Link href="/user">
            <Button>Back to Search</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Bus {bus.busNumber}</h1>
                <p className="text-gray-600">{bus.route}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={toggleFavorite} className={isFavorite ? "text-red-600" : ""}>
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "text" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("text")}
                >
                  <List className="h-4 w-4 mr-1" />
                  Text
                </Button>
                <Button variant={viewMode === "map" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("map")}>
                  <Map className="h-4 w-4 mr-1" />
                  Map
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bus Status */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{bus.eta}</div>
                    <div className="text-sm text-gray-600">minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Users className="h-5 w-5 text-gray-600" />
                    </div>
                    <Badge className={getOccupancyBg(bus.occupancy)}>
                      <span className={getOccupancyColor(bus.occupancy)}>{bus.occupancy}</span>
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Star className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="text-2xl font-bold">{bus.rating}</div>
                    <div className="text-sm text-gray-600">rating</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-600">{bus.fare}</div>
                    <div className="text-sm text-gray-600">fare</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Route Details */}
            <Card>
              <CardHeader>
                <CardTitle>Route Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={viewMode} onValueChange={(value: "map" | "text") => setViewMode(value)}>
                  <TabsContent value="text" className="mt-0">
                    <div className="space-y-4">
                      {bus.stops.map((stop, index) => (
                        <div key={stop.id} className="flex items-center space-x-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-4 h-4 rounded-full ${
                                index < bus.currentStopIndex
                                  ? "bg-green-500"
                                  : index === bus.currentStopIndex
                                    ? "bg-blue-500"
                                    : "bg-gray-300"
                              }`}
                            ></div>
                            {index < bus.stops.length - 1 && <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4
                                className={`font-medium ${
                                  index === bus.currentStopIndex
                                    ? "text-blue-600"
                                    : index < bus.currentStopIndex
                                      ? "text-green-600"
                                      : "text-gray-600"
                                }`}
                              >
                                {stop.name}
                              </h4>
                              {index === bus.currentStopIndex && <Badge variant="secondary">Current Location</Badge>}
                              {index < bus.currentStopIndex && (
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  Passed
                                </Badge>
                              )}
                              {index > bus.currentStopIndex && (
                                <span className="text-sm text-gray-500">
                                  ETA: {bus.eta + (index - bus.currentStopIndex) * 3} min
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {stop.coordinates[0].toFixed(4)}, {stop.coordinates[1].toFixed(4)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="map" className="mt-0">
                    <div className="bg-gray-100 rounded-lg p-8 text-center">
                      <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">Interactive Map View</h3>
                      <p className="text-gray-500 mb-4">
                        Real-time bus location and route visualization would be displayed here
                      </p>
                      <div className="bg-white rounded-lg p-4 text-left">
                        <h4 className="font-semibold mb-2">Current Location:</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Navigation className="h-4 w-4" />
                          <span>
                            Lat: {bus.currentLocation[0].toFixed(4)}, Lng: {bus.currentLocation[1].toFixed(4)}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          Distance covered: {(((bus.currentStopIndex + 1) / bus.stops.length) * 100).toFixed(0)}% of
                          route
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Driver Info */}
            <Card>
              <CardHeader>
                <CardTitle>Driver Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">{bus.driverName}</h4>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{bus.driverRating} driver rating</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-sm text-gray-600">
                      Experienced driver with {Math.floor(bus.driverRating * 100)} completed trips
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rate This Bus */}
            <Card>
              <CardHeader>
                <CardTitle>Rate This Bus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(star)}
                        className={`p-1 ${
                          star <= userRating ? "text-yellow-500" : "text-gray-300"
                        } hover:text-yellow-400 transition-colors`}
                      >
                        <Star className="h-6 w-6 fill-current" />
                      </button>
                    ))}
                  </div>
                  {userRating > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-green-800 text-sm">
                        Thank you for rating this bus {userRating} star{userRating !== 1 ? "s" : ""}!
                      </p>
                    </div>
                  )}
                  <Button className="w-full" disabled={userRating === 0}>
                    Submit Rating
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full bg-transparent" onClick={toggleFavorite}>
                  <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current text-red-600" : ""}`} />
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <MapPin className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
                <Link href="/user" className="block">
                  <Button variant="secondary" className="w-full">
                    Back to Search
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
