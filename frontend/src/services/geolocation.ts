/**
 * Represents a geographical location with latitude and longitude coordinates.
 */
export interface Location {
  /**
   * The latitude of the location.
   */
  lat: number;
  /**
   * The longitude of the location.
   */
  lng: number;
}

/**
 * Represents a hospital with location and other details.
 */
export interface Hospital {
  /**
   * The name of the hospital.
   */
  name: string;
  /**
   * The location of the hospital.
   */
  location: Location;
  /**
   * Contact number of the hospital.
   */
  contact: string;
}

/**
 * Asynchronously retrieves nearby hospitals for a given location.
 *
 * @param location The location for which to retrieve hospitals.
 * @returns A promise that resolves to a list of Hospital objects.
 */
export async function getNearbyHospitals(location: Location): Promise<Hospital[]> {
  // Replace with actual data for Aligarh hospitals

  return [
    {
      name: 'Jawaharlal Nehru Medical College, AMU',
      location: { lat: 27.9035, lng: 78.0842 },
      contact: '0571-2700920',
    },
    {
      name: 'Aligarh Muslim University Health Service',
      location: { lat: 27.8974, lng: 78.0785 },
      contact: 'N/A', // Contact info may not be readily available
    },
    {
      name: 'Private Hospital Aligarh',
      location: { lat: 27.8804, lng: 78.0645 },
      contact: 'N/A',
    },
    {
      name: 'Mohammad Aslam Children Hospital',
      location: { lat: 27.8993, lng: 78.0823 },
      contact: 'N/A',
    },
    {
      name: 'M S Eye Hospital',
      location: { lat: 27.8783, lng: 78.0679 },
      contact: 'N/A',
    },
  ];
}

/**
 * Represents a specialist doctor with location and other details.
 */
export interface Doctor {
  /**
   * The name of the doctor.
   */
  name: string;
  /**
   * The location of the doctor.
   */
  location: Location;
   /**
   * The specialization of the doctor.
   */
  specialization: string;
   /**
   * Contact number of the doctor.
   */
  contact: string;
}


/**
 * Calculates the distance between two locations using the Haversine formula.
 *
 * @param loc1 The first location.
 * @param loc2 The second location.
 * @returns The distance between the two locations in kilometers.
 */
function calculateDistance(loc1: Location, loc2: Location): number {
  const R = 6371; // Radius of the earth in km
  const dLat = toRad(loc2.lat - loc1.lat);
  const dLng = toRad(loc2.lng - loc1.lng);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(loc1.lat)) * Math.cos(toRad(loc2.lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
/**
 * Asynchronously retrieves specialist doctors for a given location and specialization.
 *
 * @param location The location for which to retrieve doctors.
 * @param specialization The specialization of the doctor.
 * @returns A promise that resolves to a list of Doctor objects.
 */
export async function getSpecialistDoctors(
  location: Location,
  specialization: string
): Promise<Doctor[]> {
  
  const allDoctors: Doctor[] = [
    {
        name: 'Dr. Anika Verma',
        location: { lat: 27.9055, lng: 78.0862 }, // Near JN Medical College
        specialization: 'Cardiologist',
        contact: '987-654-3210',
    },
    {
        name: 'Dr. Rajesh Khanna',
        location: { lat: 27.8994, lng: 78.0795 }, // Near AMU Health Service
        specialization: 'Dermatologist',
        contact: '987-987-9870',
    },
    {
        name: 'Dr. Priya Sharma',
        location: { lat: 27.8824, lng: 78.0665 }, // Near Private Hospital Aligarh
        specialization: 'Neurologist',
        contact: '876-543-2109',
    },
    {
        name: 'Dr. Amit Kumar',
        location: { lat: 27.9013, lng: 78.0843 }, // Near Mohammad Aslam Children Hospital
        specialization: 'Pediatrician',
        contact: '876-876-8760',
    },
    {
        name: 'Dr. Sunita Rao',
        location: { lat: 27.8803, lng: 78.0699 }, // Near M S Eye Hospital
        specialization: 'General Physician',
        contact: '765-432-1098',
    },
    {
        name: 'Dr. Vikram Singh',
        location: { lat: 27.9045, lng: 78.0852 }, // Near JN Medical College
        specialization: 'Cardiologist',
        contact: '999-888-7770',
    },
    {
        name: 'Dr. Deepa Patel',
        location: { lat: 27.8984, lng: 78.0775 }, // Near AMU Health Service
        specialization: 'Dermatologist',
        contact: '777-666-5550',
    },
    {
        name: 'Dr. Rahul Gupta',
        location: { lat: 27.8794, lng: 78.0635 }, // Near Private Hospital Aligarh
        specialization: 'Neurologist',
        contact: '909-808-7070',
    },
    {
        name: 'Dr. Meera Iyer',
        location: { lat: 27.8983, lng: 78.0813 }, // Near Mohammad Aslam Children Hospital
        specialization: 'Pediatrician',
        contact: '989-878-7670',
    },
    {
        name: 'Dr. Sanjay Verma',
        location: { lat: 27.8773, lng: 78.0669 }, // Near M S Eye Hospital
        specialization: 'General Physician',
        contact: '898-979-9690',
    },
];

  // Filter doctors by specialization and proximity
  const filteredDoctors = allDoctors
    .filter(doctor => doctor.specialization.toLowerCase() === specialization.toLowerCase())
    .filter(doctor => {
      const distance = calculateDistance(location, doctor.location);
      return distance <= 5; // Filter doctors within 5km
    });


  return filteredDoctors.map(doctor => ({
      name: doctor.name,
      location: doctor.location,
      specialization: doctor.specialization,
      contact: doctor.contact,
  }));
}

const toRad = (Value: number) => {
    return (Value * Math.PI) / 180;
};
