import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Clock } from 'lucide-react'
import { RecentLocationsProps } from '@/types'
import { formatDuration } from '@/utils/formatters'

export default function RecentLocations({ locations, selectedLocation, onLocationSelect }: RecentLocationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {locations.map((location) => (
            <div 
              key={location.id} 
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border border-gray-100 hover:border-gray-300 hover:shadow-md transform hover:-translate-y-1 ${
                selectedLocation && selectedLocation.id === location.id
                  ? 'bg-black text-white'
                  : 'bg-white hover:bg-gray-50'
              }`}
              onClick={() => onLocationSelect(location)}
            >
              <h4 className="font-semibold">{location.name}</h4>
              <div className={`flex items-center mt-2 text-sm ${
                selectedLocation && selectedLocation.id === location.id
                  ? 'text-gray-200'
                  : 'text-gray-500'
              }`}>
                <CalendarDays className="mr-2 h-4 w-4" />
                {location.date}
              </div>
              <div className={`flex items-center mt-1 text-sm ${
                selectedLocation && selectedLocation.id === location.id
                  ? 'text-gray-200'
                  : 'text-gray-500'
              }`}>
                <Clock className="mr-2 h-4 w-4" />
                {location.duration ? formatDuration(location.duration) : '0 seconds'}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 