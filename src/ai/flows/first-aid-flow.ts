
'use server';
/**
 * @fileOverview Provides AI-powered first aid advice based on user queries.
 *
 * - getFirstAidAdvice - A function that retrieves first aid advice for a given situation.
 * - FirstAidInput - The input type for the getFirstAidAdvice function.
 * - FirstAidOutput - The return type for the getFirstAidAdvice function.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';

const FirstAidInputSchema = z.object({
  query: z
    .string()
    .describe('The user\'s question or description of the situation requiring first aid (e.g., "minor burn", "bee sting", "how to stop bleeding from a cut").'),
});
export type FirstAidInput = z.infer<typeof FirstAidInputSchema>;

const FirstAidOutputSchema = z.object({
  advice: z
    .string()
    .describe('Step-by-step first aid advice for the given query. Include a disclaimer that this is not professional medical advice and to seek help for serious situations.'),
});
export type FirstAidOutput = z.infer<typeof FirstAidOutputSchema>;

export async function getFirstAidAdvice(input: FirstAidInput): Promise<FirstAidOutput> {
  return firstAidFlow(input);
}

const prompt = ai.definePrompt({
  name: 'firstAidPrompt',
  input: {
    schema: FirstAidInputSchema,
  },
  output: {
    schema: FirstAidOutputSchema,
  },
  prompt: `You are a helpful assistant providing basic first aid guidance. The user needs help with the following situation:

"{{{query}}}"

Provide clear, step-by-step first aid instructions for this situation. Focus on actions someone can take immediately with common household items if possible.

IMPORTANT: Start your response with the first aid steps. At the very end, add the following disclaimer:
"Disclaimer: This information is for basic guidance only and does not replace professional medical advice. Always seek professional medical help for serious injuries, emergencies, or if you are unsure."`,
});

const firstAidFlow = ai.defineFlow<
  typeof FirstAidInputSchema,
  typeof FirstAidOutputSchema
>(
  {
    name: 'firstAidFlow',
    inputSchema: FirstAidInputSchema,
    outputSchema: FirstAidOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    // Ensure the output is not null before returning
    if (!output) {
        throw new Error("Failed to get first aid advice from AI.");
    }
    return output;
  }
);
