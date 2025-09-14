// Mock data for the SmartBus application

export interface BusStop {
  id: string
  name: string
  coordinates: [number, number] // [lat, lng]
}

export interface Bus {
  id: string
  busNumber: string
  route: string
  currentLocation: [number, number]
  occupancy: "Low" | "Medium" | "High"
  rating: number
  driverName: string
  driverRating: number
  fare: number
  eta: number // minutes
  stops: BusStop[]
  currentStopIndex: number
}

export interface PastRide {
  id: string
  busId: string
  busNumber: string
  date: string
  fare: number
  rating: number
  startStop: string
  endStop: string
}

// Mock bus stops
export const mockBusStops: BusStop[] = [
  { id: "1", name: "Central Station", coordinates: [40.7128, -74.006] },
  { id: "2", name: "University Campus", coordinates: [40.7589, -73.9851] },
  { id: "3", name: "Shopping Mall", coordinates: [40.7505, -73.9934] },
  { id: "4", name: "Airport Terminal", coordinates: [40.6892, -74.1745] },
  { id: "5", name: "Business District", coordinates: [40.7614, -73.9776] },
  { id: "6", name: "Hospital", coordinates: [40.7282, -73.9942] },
  { id: "7", name: "Sports Complex", coordinates: [40.7831, -73.9712] },
  { id: "8", name: "Beach Front", coordinates: [40.5795, -73.9707] },
]

// Mock buses
export const mockBuses: Bus[] = [
  {
    id: "bus-1",
    busNumber: "B101",
    route: "Central-University",
    currentLocation: [40.73, -74.0],
    occupancy: "Low",
    rating: 4.5,
    driverName: "John Smith",
    driverRating: 4.8,
    fare: 2.5,
    eta: 5,
    stops: [mockBusStops[0], mockBusStops[1], mockBusStops[2]],
    currentStopIndex: 0,
  },
  {
    id: "bus-2",
    busNumber: "B202",
    route: "Airport-Downtown",
    currentLocation: [40.7, -74.15],
    occupancy: "Medium",
    rating: 4.2,
    driverName: "Sarah Johnson",
    driverRating: 4.6,
    fare: 3.75,
    eta: 12,
    stops: [mockBusStops[3], mockBusStops[4], mockBusStops[0]],
    currentStopIndex: 1,
  },
  {
    id: "bus-3",
    busNumber: "B303",
    route: "Hospital-Sports",
    currentLocation: [40.74, -73.99],
    occupancy: "High",
    rating: 4.0,
    driverName: "Mike Davis",
    driverRating: 4.3,
    fare: 2.25,
    eta: 8,
    stops: [mockBusStops[5], mockBusStops[6], mockBusStops[7]],
    currentStopIndex: 0,
  },
  {
    id: "bus-4",
    busNumber: "B404",
    route: "Beach-Mall",
    currentLocation: [40.6, -73.96],
    occupancy: "Low",
    rating: 4.7,
    driverName: "Lisa Wilson",
    driverRating: 4.9,
    fare: 3.0,
    eta: 15,
    stops: [mockBusStops[7], mockBusStops[2], mockBusStops[1]],
    currentStopIndex: 2,
  },
]

// Mock past rides
export const mockPastRides: PastRide[] = [
  {
    id: "ride-1",
    busId: "bus-1",
    busNumber: "B101",
    date: "2024-01-15",
    fare: 2.5,
    rating: 5,
    startStop: "Central Station",
    endStop: "University Campus",
  },
  {
    id: "ride-2",
    busId: "bus-2",
    busNumber: "B202",
    date: "2024-01-14",
    fare: 3.75,
    rating: 4,
    startStop: "Airport Terminal",
    endStop: "Business District",
  },
  {
    id: "ride-3",
    busId: "bus-3",
    busNumber: "B303",
    date: "2024-01-13",
    fare: 2.25,
    rating: 4,
    startStop: "Hospital",
    endStop: "Sports Complex",
  },
]

// Mock favorites
export const mockFavorites: string[] = ["bus-1", "bus-4"]

// Utility functions
export const getOccupancyColor = (occupancy: string) => {
  switch (occupancy) {
    case "Low":
      return "text-green-600"
    case "Medium":
      return "text-yellow-600"
    case "High":
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}

export const getOccupancyBg = (occupancy: string) => {
  switch (occupancy) {
    case "Low":
      return "bg-green-100"
    case "Medium":
      return "bg-yellow-100"
    case "High":
      return "bg-red-100"
    default:
      return "bg-gray-100"
  }
}
