import QRScanner from "../../components/Game/QRScanner"

export default function QRpage() {
  const handleBack = () => {
    console.log("Back button clicked")
  }

  return (
    <div className="h-screen w-full">
      <QRScanner onBack={handleBack} />
    </div>
  )
}

