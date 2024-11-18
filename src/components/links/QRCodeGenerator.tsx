import { useState } from 'react';
import { QRCode } from 'qrcode.react';
import { HexColorPicker } from 'react-colorful';
import { Button } from '../ui/Button';
import { Upload, Download, Settings } from 'lucide-react';

interface QRCodeGeneratorProps {
  url: string;
  logo?: string;
}

export function QRCodeGenerator({ url, logo }: QRCodeGeneratorProps) {
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [size, setSize] = useState(256);
  const [includeMargin, setIncludeMargin] = useState(true);
  const [level, setLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');

  const downloadQR = () => {
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qr-code.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <QRCode
          id="qr-code"
          value={url}
          size={size}
          level={level}
          includeMargin={includeMargin}
          fgColor={fgColor}
          bgColor={bgColor}
          imageSettings={
            logo
              ? {
                  src: logo,
                  height: 24,
                  width: 24,
                  excavate: true,
                }
              : undefined
          }
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Size</label>
          <input
            type="range"
            min="128"
            max="512"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="mt-1 w-full"
          />
          <div className="mt-1 text-sm text-gray-500">{size}px</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Error Correction Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          >
            <option value="L">Low</option>
            <option value="M">Medium</option>
            <option value="Q">Quartile</option>
            <option value="H">High</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Colors</label>
          <div className="flex space-x-4">
            <div>
              <label className="block text-xs text-gray-500">Foreground</label>
              <div
                className="mt-1 h-8 w-8 cursor-pointer rounded border border-gray-300"
                style={{ backgroundColor: fgColor }}
                onClick={() => setShowColorPicker(!showColorPicker)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Background</label>
              <div
                className="mt-1 h-8 w-8 cursor-pointer rounded border border-gray-300"
                style={{ backgroundColor: bgColor }}
                onClick={() => setShowColorPicker(!showColorPicker)}
              />
            </div>
          </div>
          {showColorPicker && (
            <div className="absolute z-10 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Foreground Color
                  </label>
                  <HexColorPicker color={fgColor} onChange={setFgColor} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Background Color
                  </label>
                  <HexColorPicker color={bgColor} onChange={setBgColor} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="include-margin"
            checked={includeMargin}
            onChange={(e) => setIncludeMargin(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="include-margin" className="ml-2 text-sm text-gray-700">
            Include margin
          </label>
        </div>

        {logo && (
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={() => {
                // Handle logo removal
              }}
            >
              Remove Logo
            </Button>
          </div>
        )}

        <div className="flex space-x-4">
          <Button onClick={downloadQR} className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Download QR Code
          </Button>
          <Button variant="outline" onClick={() => setShowColorPicker(!showColorPicker)}>
            <Settings className="mr-2 h-4 w-4" />
            Customize
          </Button>
        </div>
      </div>
    </div>
  );
}