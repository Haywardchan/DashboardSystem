export interface Location {
  latitude: number;
  longitude: number;
  name: string;
}

export interface LastSeenLocation {
  latitude: number;
  longitude: number;
  name: string;
}

export interface MissingPerson {
  _id: string;
  age: number;
  contact_info: string;
  created_at: string; // Consider using Date type if you want to handle dates
  description: string;
  devEUI: string;
  last_seen_date: string; // Consider using Date type if you want to handle dates
  last_seen_location: LastSeenLocation;
  locations: Location[];
  name: string;
  photo_url: string;
  residence_time: string[]; // Consider using Date type if you want to handle dates
  status: string;
  updated_at: string; // Consider using Date type if you want to handle dates
} 