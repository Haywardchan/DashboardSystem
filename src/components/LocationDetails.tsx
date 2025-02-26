import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Clock } from 'lucide-react'
import { LocationDetailsProps } from '@/types'
import { formatDuration } from '@/utils/formatters'

export default function LocationDetails({ location }: LocationDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Location Details</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold">{location.name}</h3>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <CalendarDays className="mr-2 h-4 w-4" />
          {location.date}
        </div>
        <div className="flex items-center mt-1 text-sm text-gray-500">
          <Clock className="mr-2 h-4 w-4" />
          {location.duration ? formatDuration(location.duration) : '0 seconds'}
        </div>
        <div className="flex items-center mt-1 text-sm text-gray-500">
          <MapPin className="mr-2 h-4 w-4" />
          {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </div>
        <div className="mt-4">
          <Badge>Last Known Location</Badge>
        </div>
      </CardContent>
    </Card>
  )
} 