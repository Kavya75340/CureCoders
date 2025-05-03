// symptom-diagnosis.ts
'use server';

/**
 * @fileOverview An AI agent that provides possible diagnoses and suggests medicines based on symptoms.
 *
 * - symptomDiagnosis - A function that handles the symptom diagnosis process.
 * - SymptomDiagnosisInput - The input type for the symptomDiagnosis function.
 * - SymptomDiagnosisOutput - The return type for the symptomDiagnosis function.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';

const SymptomDiagnosisInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A description of the symptoms experienced by the patient.'),
});

export type SymptomDiagnosisInput = z.infer<typeof SymptomDiagnosisInputSchema>;

const SymptomDiagnosisOutputSchema = z.object({
  possibleDiagnoses: z
    .string()
    .describe('A list of possible diagnoses based on the symptoms.'),
  suggestedMedicines: z
    .string()
    .describe('A list of suggested over-the-counter medicines for the symptoms.'),
});

export type SymptomDiagnosisOutput = z.infer<typeof SymptomDiagnosisOutputSchema>;

export async function symptomDiagnosis(input: SymptomDiagnosisInput): Promise<SymptomDiagnosisOutput> {
  return symptomDiagnosisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'symptomDiagnosisPrompt',
  input: {
    schema: z.object({
      symptoms: z
        .string()
        .describe('A description of the symptoms experienced by the patient.'),
    }),
  },
  output: {
    schema: z.object({
      possibleDiagnoses: z
        .string()
        .describe('A list of possible diagnoses based on the symptoms.'),
      suggestedMedicines: z
        .string()
        .describe('A list of suggested over-the-counter medicines for the symptoms.'),
    }),
  },
  prompt: `You are a medical diagnosis assistant. Based on the symptoms provided by the patient, provide a list of possible diagnoses and suggest some over-the-counter medicines.

Symptoms: {{{symptoms}}}

Possible Diagnoses: 

Suggested Medicines: `,
});

const symptomDiagnosisFlow = ai.defineFlow<
  typeof SymptomDiagnosisInputSchema,
  typeof SymptomDiagnosisOutputSchema
>(
  {
    name: 'symptomDiagnosisFlow',
    inputSchema: SymptomDiagnosisInputSchema,
    outputSchema: SymptomDiagnosisOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);

