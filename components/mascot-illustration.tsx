interface MascotIllustrationProps {
  type: "bunny" | "cow" | "frog"
  instrument: "trumpet" | "saxophone" | "flute"
  size: number
}

export default function MascotIllustration({ type, instrument, size }: MascotIllustrationProps) {
  // This is a placeholder component that would normally contain SVG illustrations
  // In a real implementation, you would have actual SVG illustrations for each mascot

  const getColor = () => {
    switch (type) {
      case "bunny":
        return "#F5F5DC" // Light beige
      case "cow":
        return "#FFFFFF" // White
      case "frog":
        return "#90EE90" // Light green
      default:
        return "#FFFFFF"
    }
  }

  const getInstrumentColor = () => {
    switch (instrument) {
      case "trumpet":
        return "#FFD700" // Gold
      case "saxophone":
        return "#D4AF37" // Brass
      case "flute":
        return "#C0C0C0" // Silver
      default:
        return "#FFD700"
    }
  }

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: "relative",
      }}
    >
      {/* Simple placeholder for mascot */}
      <div
        style={{
          width: `${size * 0.8}px`,
          height: `${size * 0.8}px`,
          backgroundColor: getColor(),
          borderRadius: "50%",
          position: "absolute",
          top: "10%",
          left: "10%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        {/* Eyes */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "25%",
            width: `${size * 0.1}px`,
            height: `${size * 0.1}px`,
            backgroundColor: "#000",
            borderRadius: "50%",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "30%",
            right: "25%",
            width: `${size * 0.1}px`,
            height: `${size * 0.1}px`,
            backgroundColor: "#000",
            borderRadius: "50%",
          }}
        ></div>

        {/* Smile */}
        <div
          style={{
            position: "absolute",
            bottom: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: `${size * 0.4}px`,
            height: `${size * 0.15}px`,
            borderBottomLeftRadius: `${size * 0.2}px`,
            borderBottomRightRadius: `${size * 0.2}px`,
            border: "2px solid #000",
            borderTop: "none",
          }}
        ></div>

        {/* Instrument */}
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "-20%",
            width: `${size * 0.5}px`,
            height: `${size * 0.15}px`,
            backgroundColor: getInstrumentColor(),
            borderRadius: `${size * 0.1}px`,
          }}
        ></div>
      </div>
    </div>
  )
}
