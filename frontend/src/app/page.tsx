import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <h1 className="text-4xl font-bold">
          Welcome to{' '}
          <a className="text-primary" href="#">
            Hack4Health!
          </a>
        </h1>


        <p className="mt-3 text-2xl text-foreground">
          Explore our health tools.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/symptom-diagnosis" className="relative w-64 h-48 rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-70"
              style={{ backgroundImage: `url('https://picsum.photos/id/30/800/600')` }} // Image related to health/diagnosis
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold bg-black bg-opacity-40 hover:bg-opacity-60 transition-colors duration-300">
              Symptom Diagnosis
            </div>
          </Link>
          <Link href="/hospital-list" className="relative w-64 h-48 rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-70"
              style={{ backgroundImage: `url('https://picsum.photos/id/22/800/600')` }} // Image related to hospitals/buildings
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold bg-black bg-opacity-40 hover:bg-opacity-60 transition-colors duration-300">
              Nearby Hospitals
            </div>
          </Link>
           <Link href="/specialist-doctors" className="relative w-64 h-48 rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-70"
              style={{ backgroundImage: `url('https://picsum.photos/seed/doctors/800/600')` }} // Image related to doctors/specialists
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold bg-black bg-opacity-40 hover:bg-opacity-60 transition-colors duration-300">
              Specialist Doctors
            </div>
          </Link>
          <Link href="/emergency-contacts" className="relative w-64 h-48 rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-70"
              style={{ backgroundImage: `url('https://picsum.photos/seed/ambulance/800/600')` }} // Image related to emergency/ambulance
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold bg-black bg-opacity-40 hover:bg-opacity-60 transition-colors duration-300">
              Emergency Contacts
            </div>
          </Link>
          <Link href="/first-aid" className="relative w-64 h-48 rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-70"
              style={{ backgroundImage: `url('https://picsum.photos/seed/firstaid/800/600')` }} // Image related to first aid/medical kit
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold bg-black bg-opacity-40 hover:bg-opacity-60 transition-colors duration-300">
              First Aid Tips
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
