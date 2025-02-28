import React from "react";
import { ArrowLeft, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QRScannerProps {
  onBack?: () => void;
  qrCodeData?: string;
}

export default function QRScanner({ onBack = () => {}, qrCodeData = "" }: QRScannerProps) {
  const navigate = useNavigate();

  const handleBackToTables = () => {
    const bidaTableId = localStorage.getItem("bidaTableId");
    if (bidaTableId) {
      navigate(`/waiting-room/${bidaTableId}`);
    } else {
      navigate("/waiting-room");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-blue-900">
      {/* Top lighting effect */}
      <div className="absolute top-10 w-48 h-12 bg-white rounded-full opacity-20 blur-xl"></div>
      <div className="absolute top-28 w-32 h-8 bg-white rounded-full opacity-10 blur-lg"></div>

      {/* Header with back button and QR icon */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4">
        <button onClick={handleBackToTables} className="text-white p-2 rounded-full" aria-label="Go back">
          <ArrowLeft size={24} />
        </button>
        <button className="text-white p-2 rounded-full" aria-label="QR code">
          <QrCode size={24} />
        </button>
      </div>

      {/* Main QR scanning card */}
      <div className="w-[320px] bg-white rounded-lg shadow-xl p-6 flex flex-col items-center">
        {/* Purple circle with icon */}
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
          <div className="w-6 h-6 border-2 border-purple-700 rounded-full flex items-center justify-center">
            <div className="w-1 h-4 bg-purple-700 rotate-45 translate-x-1 -translate-y-1"></div>
          </div>
        </div>

        {/* QR Code */}
        <div className="w-48 h-48 mb-4">
          {qrCodeData ? (
            <img src={qrCodeData || "/placeholder.svg"} alt="QR Code" className="w-full h-full object-cover" />
          ) : (
            <img
              src="/QR.png"
              alt="QR Code"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Instruction text */}
        <p className="text-center text-gray-800 font-medium">
          Please scan the QR of the
          <br />
          table to continue
        </p>
      </div>
    </div>
  );
}

