export async function registerNFCDevice(cardId: string, deviceId: string) {
  const response = await fetch('/api/nfc/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cardId, deviceId }),
  });

  if (!response.ok) {
    throw new Error('Failed to register NFC device');
  }

  return response.json();
}

export async function writeNFCTag(deviceId: string, cardData: any) {
  if (!('NDEFReader' in window)) {
    throw new Error('NFC is not supported on this device');
  }

  try {
    const ndef = new (window as any).NDEFReader();
    await ndef.write({
      records: [
        {
          recordType: 'url',
          data: `https://luxmeet.com/c/${cardData.id}`,
        },
      ],
    });
    return true;
  } catch (error) {
    console.error('Error writing to NFC tag:', error);
    throw error;
  }
}

export async function startNFCReader(onRead: (cardId: string) => void) {
  if (!('NDEFReader' in window)) {
    throw new Error('NFC is not supported on this device');
  }

  try {
    const ndef = new (window as any).NDEFReader();
    await ndef.scan();

    ndef.addEventListener('reading', ({ message }: any) => {
      for (const record of message.records) {
        if (record.recordType === 'url') {
          const url = new URL(record.data);
          const cardId = url.pathname.split('/').pop();
          if (cardId) {
            onRead(cardId);
          }
        }
      }
    });
  } catch (error) {
    console.error('Error starting NFC reader:', error);
    throw error;
  }
}