
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getFirstAidAdvice } from '@/ai/flows/first-aid-flow';
import { Terminal } from "lucide-react"

export const FirstAidTips = () => {
  const [query, setQuery] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return; // Don't submit empty queries

    setLoading(true);
    setAdvice(null);
    setError(null);

    try {
      const result = await getFirstAidAdvice({ query });
      setAdvice(result.advice);
    } catch (err) {
      console.error('First aid advice failed:', err);
      setError('Sorry, I could not retrieve first aid advice at this time. Please try again later.');
      setAdvice(null); // Clear any previous advice on error
    } finally {
      setLoading(false);
    }
  };

  // Function to format advice with line breaks
  const formatAdvice = (text: string | null) => {
    if (!text) return null;
    // Split by newline characters and wrap each line in a paragraph
    // Also, bold the disclaimer part
    const parts = text.split('Disclaimer:');
    const mainAdvice = parts[0]?.split('\n').map((line, index) => (
      <p key={`line-${index}`} className="mb-2">{line}</p>
    ));
    const disclaimer = parts[1] ? (
        <p className="mt-4 text-sm text-muted-foreground">
            <strong>Disclaimer:</strong>{parts[1]}
        </p>
    ) : null;

    return (
        <>
            {mainAdvice}
            {disclaimer}
        </>
    )
  };


  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>AI-Powered First Aid Guidance</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-6">
          <Input
            placeholder="Describe the situation (e.g., minor burn, bee sting)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
            aria-label="First aid query input"
          />
          <Button type="submit" disabled={loading || !query.trim()}>
            {loading ? 'Getting Advice...' : 'Get First Aid Advice'}
          </Button>
        </form>

        {error && (
           <Alert variant="destructive">
             <Terminal className="h-4 w-4" />
             <AlertTitle>Error</AlertTitle>
             <AlertDescription>
               {error}
             </AlertDescription>
           </Alert>
        )}

        {advice && !error && (
          <div className="mt-4 p-4 border rounded-md bg-secondary/50">
            <h3 className="text-lg font-semibold mb-2">First Aid Steps:</h3>
            <div className="text-sm">{formatAdvice(advice)}</div>
          </div>
        )}

         {!advice && !loading && !error && (
             <p className="mt-4 text-sm text-muted-foreground text-center">
                 Enter a situation above to get first aid advice.
             </p>
         )}
      </CardContent>
    </Card>
  );
};
