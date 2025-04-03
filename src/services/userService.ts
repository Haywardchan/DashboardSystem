import { MissingPerson } from '@/models/MissingPerson'; // Import the MissingPerson interface

const API_URL = 'http://127.0.0.1:5000/api/missing-persons'; // Base URL for your API

// Function to get all missing persons
export const getAllMissingPersons = async (): Promise<MissingPerson[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }
  return response.json(); // Return the response data as MissingPerson[]
};

// Function to get a specific missing person by ID
export const getMissingPersonById = async (id: string) => {
  const response = await fetch(`${API_URL}/id/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }
  return response.json(); // Return the response data
};

// Function to get a specific missing person by EUI
export const getMissingPersonByEui = async (eui: string) => {
  const response = await fetch(`${API_URL}/eui/${eui}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }
  return response.json(); // Return the response data
};

// Function to get specific locations using EUI
export const getLocationsByEui = async (eui: string) => {
  const response = await fetch(`${API_URL}/eui/${eui}/locations`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }
  return response.json(); // Return the response data
};

// Function to create a new missing person entry
export const createMissingPerson = async (personData: any) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(personData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }
  return response.json(); // Return the response data
};

// Function to update missing person information
export const updateMissingPerson = async (id: string, personData: any) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(personData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }
  return response.json(); // Return the response data
};

// Function to delete a missing person entry
export const deleteMissingPerson = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }
  return response.json(); // Return the response data
};

// Function to get drone location
export const getDrone = async () => {
  const response = await fetch(`http://192.168.254.2:8080/api/getdrone`, {
    method: 'GET',
  });
  console.log(response)
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }
  return response.json(); // Return the response data
};

// Function to get the localization result
export const getLocalization = async (gatewayData: any) => {
  const response = await fetch(`http://10.0.0.26:5000/api/localization`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gatewayData),
  });
  // console.log("HELLLLOOOOEOFJOEJOEC")
  // console.log(response)
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }
  return response.json(); // Return the response data
};