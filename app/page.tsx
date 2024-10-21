'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { encodePassphrase, generateRoomId, randomString } from '@/lib/client-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

function DemoMeeting() {
  const router = useRouter();
  const [e2ee, setE2ee] = useState(false);
  const [sharedPassphrase, setSharedPassphrase] = useState(randomString(64));

  const startMeeting = () => {
    if (e2ee) {
      router.push(`/rooms/${generateRoomId()}#${encodePassphrase(sharedPassphrase)}`);
    } else {
      router.push(`/rooms/${generateRoomId()}`);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Créer une salle</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full" onClick={startMeeting}>
          Créer une salle
        </Button>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="use-e2ee"
            checked={e2ee}
            onCheckedChange={(checked) => setE2ee(checked === true)}
          />
          <Label htmlFor="use-e2ee">Exiger un mot de passe</Label>
        </div>
        {e2ee && (
          <div className="space-y-2">
            <Label htmlFor="passphrase">Passphrase</Label>
            <Input
              id="passphrase"
              type="password"
              value={sharedPassphrase}
              onChange={(ev) => setSharedPassphrase(ev.target.value)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <main className="w-full max-w-md">
        <Card className="mb-8">
          <CardContent className="flex flex-col items-center p-6">
            <Image src="/images/logo.png" alt="LiveKit Meet" width={60} height={45} />
            <h2 className="mt-4 text-xl font-semibold text-center">
              Solutions de formation interne pour les entreprises.
            </h2>
          </CardContent>
        </Card>
        <DemoMeeting />
      </main>
      <footer className="mt-8 text-center text-sm text-gray-500">{/* Footer content */}</footer>
    </div>
  );
}
