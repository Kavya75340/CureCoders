'use client';

import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useState} from 'react';
import {symptomDiagnosis} from '@/ai/flows/symptom-diagnosis';

export const SymptomForm = () => {
  const [symptoms, setSymptoms] = useState('');
  const [diagnoses, setDiagnoses] = useState<string | null>(null);
  const [medicines, setMedicines] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDiagnoses(null); // Clear previous diagnoses
    setMedicines(null); // Clear previous medicines

    try {
      const result = await symptomDiagnosis({symptoms: symptoms});
      setDiagnoses(result.possibleDiagnoses);
      setMedicines(result.suggestedMedicines);
    } catch (error) {
      console.error('Diagnosis failed:', error);
      setDiagnoses('An error occurred while processing your symptoms.');
      setMedicines('An error occurred while processing your symptoms.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Symptom-Based Diagnosis</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Textarea
            placeholder="Describe your symptoms..."
            value={symptoms}
            onChange={e => setSymptoms(e.target.value)}
            disabled={loading}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Diagnosing...' : 'Get Possible Diagnoses'}
          </Button>
        </form>

        {diagnoses && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Possible Diagnoses:</h3>
            <p>{diagnoses}</p>
          </div>
        )}

        {medicines && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Suggested Medicines:</h3>
            <p>{medicines}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
