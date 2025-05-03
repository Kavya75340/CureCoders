'use client';

import { SymptomForm } from './SymptomForm'; // Updated import path
import Link from 'next/link';

export default function SymptomDiagnosisPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <Link href="/" className="absolute top-4 left-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-4 py-2 text-sm font-medium">
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-primary">
          Symptom Diagnosis
        </h1>
        <p className="mt-3 text-2xl">
          Describe your symptoms to get a possible diagnosis.
        </p>
        <div className="mt-10">
          <SymptomForm />
        </div>
      </main>
    </div>
  );
}
