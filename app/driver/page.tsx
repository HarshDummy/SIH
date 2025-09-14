"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { mockBuses } from "@/lib/mock-data"
import { MapPin, Users, Star, Bus, Navigation } from "lucide-react"
import Link from "next/link"

export default function DriverInterface() {
  const [isSharing, setIsSharing] = useState(false)
  const [occupancy, setOccupancy] = useState<"Low" | "Medium" | "High">("Low")
  const [currentLocation, setCurrentLocation] = useState<[number, number]>([40.7128, -74.006])
  const [selectedBus, setSelectedBus] = useState(mockBuses[0])

  // Mock GPS updates
  useEffect(() => {
    if (isSharing) {
      const interval = setInterval(() => {
        setCurrentLocation((prev) => [prev[0] + (Math.random() - 0.5) * 0.001, prev[1] + (Math.random() - 0.5) * 0.001])
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isSharing])

  const handleStartSharing = () => {
    setIsSharing(!isSharing)
  }

  const getOccupancyColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Bus className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">SmartBus Driver</h1>
            </Link>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Driver Profile */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="bg-blue-100 rounded-full p-2">
                <Bus className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{selectedBus.driverName}</h2>
                <p className="text-sm text-gray-600">
                  Bus {selectedBus.busNumber} • {selectedBus.route}
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold">{selectedBus.driverRating}</span>
                <span className="text-gray-600">Driver Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <Badge className={getOccupancyColor(occupancy)}>{occupancy} Occupancy</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-green-500" />
                <span className={`font-semibold ${isSharing ? "text-green-600" : "text-gray-600"}`}>
                  {isSharing ? "Location Sharing" : "Location Off"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Sharing Control */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Location Sharing</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{isSharing ? "Active" : "Inactive"}</span>
                <Switch checked={isSharing} onCheckedChange={handleStartSharing} />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Navigation className="h-4 w-4" />
                <span>
                  Current Location: {currentLocation[0].toFixed(4)}, {currentLocation[1].toFixed(4)}
                </span>
              </div>

              {isSharing && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-800 font-medium">Broadcasting location to passengers</span>
                  </div>
                  <p className="text-green-700 text-sm mt-1">Passengers can now see your real-time location and ETA</p>
                </div>
              )}

              {!isSharing && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-700">
                    Start sharing your location to help passengers track your bus in real-time
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bus Occupancy Control */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Bus Occupancy Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select value={occupancy} onValueChange={(value: "Low" | "Medium" | "High") => setOccupancy(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low - Plenty of seats available</SelectItem>
                  <SelectItem value="Medium">Medium - Some seats available</SelectItem>
                  <SelectItem value="High">High - Standing room only</SelectItem>
                </SelectContent>
              </Select>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div
                  className={`p-4 rounded-lg border-2 ${occupancy === "Low" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-800">Low</span>
                  </div>
                  <p className="text-sm text-gray-600">Plenty of seats available</p>
                </div>

                <div
                  className={`p-4 rounded-lg border-2 ${occupancy === "Medium" ? "border-yellow-500 bg-yellow-50" : "border-gray-200"}`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-5 w-5 text-yellow-600" />
                    <span className="font-semibold text-yellow-800">Medium</span>
                  </div>
                  <p className="text-sm text-gray-600">Some seats available</p>
                </div>

                <div
                  className={`p-4 rounded-lg border-2 ${occupancy === "High" ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-5 w-5 text-red-600" />
                    <span className="font-semibold text-red-800">High</span>
                  </div>
                  <p className="text-sm text-gray-600">Standing room only</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Route Information */}
        <Card>
          <CardHeader>
            <CardTitle>Current Route</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{selectedBus.route}</span>
                <Badge variant="outline">{selectedBus.stops.length} stops</Badge>
              </div>

              <div className="space-y-2">
                {selectedBus.stops.map((stop, index) => (
                  <div key={stop.id} className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        index === selectedBus.currentStopIndex
                          ? "bg-blue-500"
                          : index < selectedBus.currentStopIndex
                            ? "bg-green-500"
                            : "bg-gray-300"
                      }`}
                    ></div>
                    <span
                      className={`${
                        index === selectedBus.currentStopIndex
                          ? "font-semibold text-blue-600"
                          : index < selectedBus.currentStopIndex
                            ? "text-green-600"
                            : "text-gray-600"
                      }`}
                    >
                      {stop.name}
                    </span>
                    {index === selectedBus.currentStopIndex && (
                      <Badge variant="secondary" className="ml-auto">
                        Current
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
