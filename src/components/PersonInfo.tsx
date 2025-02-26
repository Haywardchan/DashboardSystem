import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMissingPersons } from '@/hooks/useMissingPersons'
import { MissingPerson } from "@/models/MissingPerson";
import { useMissingPerson } from "@/hooks/useMissingPerson";

interface PersonInfoProps {
  devEUI: string;
}

export default function PersonInfo({ devEUI }: PersonInfoProps) {
  const { person, loading, error } = useMissingPerson(devEUI);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!person) return <p>No person found.</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Missing Person Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            {/* <AvatarImage src={person.image} alt={person.name} /> */}
            <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{person.name}</h2>
            <h2 className="text-xl font-semibold">{person.devEUI}</h2>
            <p className="text-sm text-gray-500">Age: {person.age}</p>
            <p className="text-sm text-gray-500">Last Seen: {person.last_seen_location.name}</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-700">{person.description}</p>
      </CardContent>
    </Card>
  )
} 