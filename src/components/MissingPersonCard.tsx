import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MissingPerson } from '@/models/MissingPerson';

interface MissingPersonCardProps {
  person: MissingPerson;
  onClick?: (person: MissingPerson) => void;
}

const MissingPersonCard: React.FC<MissingPersonCardProps> = ({ person, onClick }) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow w-108 h-42"
      onClick={() => onClick?.(person)}
    >
      <CardHeader>
        <CardTitle>{person.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            {/* <AvatarImage src={person.image} alt={person.name} /> */}
            <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{person.name}</h2>
            <p className="text-sm text-gray-500">Age: {person.age}</p>
            <p className="text-sm text-gray-500">Last Seen: {person.last_seen_location.name}</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-700">{person.description}</p>
      </CardContent>
    </Card>
  );
};

export default MissingPersonCard;