'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List, ListItem } from '@/components/ui/list';

export const EmergencyContacts = () => {
  const emergencyContacts = [
    { name: 'Police', number: '112' },
    { name: 'Ambulance', number: '108' },
  ];

  const makeCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Emergency Contacts</CardTitle>
      </CardHeader>
      <CardContent>
        <List>
          {emergencyContacts.map((contact, index) => (
            <ListItem key={index} onClick={() => makeCall(contact.number)} style={{ cursor: 'pointer' }}>
              <strong>{contact.name}:</strong> {contact.number}
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
