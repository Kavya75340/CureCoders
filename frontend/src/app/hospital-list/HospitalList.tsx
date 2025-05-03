'use client';
 import { useState, useEffect } from 'react';
 import { getNearbyHospitals, Location, Hospital } from '@/services/geolocation';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { useToast } from '@/hooks/use-toast';
 import { List, ListItem } from '@/components/ui/list';

 export const HospitalList = () => {
   const [location, setLocation] = useState<Location | null>(null);
   const [hospitals, setHospitals] = useState<Hospital[]>([]);
   const [loading, setLoading] = useState(false);
   const { toast } = useToast();

   useEffect(() => {
     if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(
         position => {
           setLocation({
             lat: position.coords.latitude,
             lng: position.coords.longitude,
           });
         },
         error => {
           console.error('Error getting location:', error);
           toast({
             title: 'Error',
             description: 'Could not retrieve your location.',
             variant: 'destructive',
           });
         }
       );
     } else {
       console.error('Geolocation is not supported by this browser.');
       toast({
         title: 'Error',
         description: 'Geolocation is not supported by this browser.',
         variant: 'destructive',
       });
     }
   }, [toast]);

   useEffect(() => {
     const fetchHospitals = async () => {
       if (location) {
         setLoading(true);
         try {
           const hospitals = await getNearbyHospitals(location);
           setHospitals(hospitals);
         } catch (error) {
           console.error('Error fetching hospitals:', error);
           toast({
             title: 'Error',
             description: 'Failed to fetch nearby hospitals.',
             variant: 'destructive',
           });
         } finally {
           setLoading(false);
         }
       }
     };

     fetchHospitals();
   }, [location, toast]);

   return (
     <Card className="w-full max-w-lg">
       <CardHeader>
         <CardTitle>Nearby Hospitals</CardTitle>
       </CardHeader>
       <CardContent>
         {loading && <p>Loading hospitals...</p>}
         {!loading && hospitals.length === 0 && <p>No hospitals found near your location.</p>}
         {!loading && hospitals.length > 0 && (
           <List>
             {hospitals.map((hospital, index) => (
               <ListItem key={index}>
                 <strong>{hospital.name}</strong>
                 <p>Contact: {hospital.contact}</p>
                 <p>
                   Location: Lat: {hospital.location.lat}, Lng: {hospital.location.lng}
                 </p>
               </ListItem>
             ))}
           </List>
         )}
         {!loading && !location && <p>Detecting Location...</p>}
       </CardContent>
     </Card>
   );
 };
