
'use client';

import { useState, useEffect } from 'react';
import { getSpecialistDoctors, Location, Doctor } from '@/services/geolocation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { List, ListItem } from '@/components/ui/list';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Stethoscope, Loader2, MapPin } from "lucide-react" // Added Loader2 and MapPin icons


export const SpecialistDoctors = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [specialization, setSpecialization] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Get user's location
 useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setLoadingLocation(false);
                setError(null); // Clear previous errors
            },
            geoError => {
                 setError("Could not retrieve your location. Please ensure location services are enabled in your browser/device settings and that permissions are granted to this site.");
                setLoadingLocation(false);
                toast({
                    title: 'Location Error',
                    description:
                        'Could not retrieve your location. Please ensure location services are enabled in your browser/device settings.',
                    variant: 'destructive',
                });
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // Added options for better accuracy and timeout
        );
    } else {
        console.error(
            'Geolocation is not supported by this browser or environment.'
        );
        setError(
            'Geolocation is not supported by this browser or environment.'
        );
        setLoadingLocation(false);
        toast({
            title: 'Error',
            description:
                'Geolocation is not supported by this browser or environment.',
            variant: 'destructive',
        });
    }
  }, [toast]);

  // Handle form submission to search for doctors
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) {
        setError('Could not get your location. Cannot search for doctors.');
        toast({ title: 'Error', description: 'Location not available.', variant: 'destructive' });
        return;
    }
    if (!specialization.trim()) {
        setError('Please enter a specialization.');
        toast({ title: 'Input Required', description: 'Please enter a specialization to search for.', variant: 'destructive' });
        return;
    }

    setLoadingDoctors(true);
    setError(null); // Clear previous errors
    setDoctors([]); // Clear previous results

    try {
      const fetchedDoctors = await getSpecialistDoctors(location, specialization);
      setDoctors(fetchedDoctors);
       if (fetchedDoctors.length === 0) {
            setError(`No ${specialization} doctors found near your location.`);
       }
    } catch (fetchError) {
      console.error('Error fetching doctors:', fetchError);
       const errorMsg = fetchError instanceof Error ? fetchError.message : 'An unknown error occurred.';
      setError(`Failed to fetch doctors: ${errorMsg}`);
      toast({
        title: 'Error',
        description: `Failed to fetch doctors. ${errorMsg}`,
        variant: 'destructive',
      });
    } finally {
      setLoadingDoctors(false);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6" /> Find Specialist Doctors
        </CardTitle>
      </CardHeader>
      <CardContent>
         {loadingLocation && (
            <div className="flex items-center justify-center space-x-2 p-4">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Detecting your location...</span>
            </div>
         )}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-6">
          <Input
            placeholder="Enter specialization (e.g., Cardiologist, Dermatologist)"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            disabled={loadingLocation || loadingDoctors} // Disable while loading location or doctors
            aria-label="Specialization input"
          />
          <Button type="submit" disabled={loadingLocation || loadingDoctors || !specialization.trim()}>
            {loadingDoctors ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                </>
            ) : (
                'Search Doctors'
            )}
          </Button>
        </form>

        {error && !loadingDoctors && (
           <Alert variant="destructive" className="mb-4">
             <MapPin className="h-4 w-4" /> {/* Changed icon */}
             <AlertTitle>Notice</AlertTitle>
             <AlertDescription>
               {error}
             </AlertDescription>
           </Alert>
        )}

        {doctors.length > 0 && !loadingDoctors && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Doctors Found:</h3>
            <List className="max-h-60 overflow-y-auto border rounded-md p-2">
              {doctors.map((doctor, index) => (
                <ListItem key={index} className="border-b last:border-b-0 py-2">
                   <div className="font-semibold">{doctor.name}</div>
                   <div className="text-sm text-muted-foreground">{doctor.specialization}</div>
                   <div className="text-sm">Contact: {doctor.contact || 'N/A'}</div>
                   <div className="text-xs text-muted-foreground">
                     Loc: {doctor.location.lat.toFixed(4)}, {doctor.location.lng.toFixed(4)}
                   </div>
                </ListItem>
              ))}
            </List>
          </div>
        )}

        {!loadingLocation && !loadingDoctors && doctors.length === 0 && !error && (
             <p className="mt-4 text-sm text-muted-foreground text-center">
                 Enter a specialization above and search to find doctors near you.
             </p>
         )}
      </CardContent>
    </Card>
  );
};
