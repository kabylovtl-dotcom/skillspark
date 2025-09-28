import React from "react";

// DeltaYurtLogo.tsx
// Professional logo component matching the provided design
// Features: White pill capsule, purple curved band, yurt-like top cap, and bold text

export default function DeltaYurtLogo({ width = 200, height = 150, className = "" }) {
  // Color palette matching the provided design
  const purpleLight = "#8B5CF6"; // Vibrant purple
  const purpleDark = "#4C1D95"; // Deep purple
  const textPurple = "#5B21B6"; // Text purple
  const backgroundPurple = "#7C3AED"; // Background purple

  const viewBoxW = 400;
  const viewBoxH = 200;

  // Main capsule dimensions
  const capsule = {
    x: 50,
    y: 60,
    width: 300,
    height: 80,
    rx: 40,
  };

  return (
    <div style={{ width, height }} className={className}>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&display=swap"
        rel="stylesheet"
      />

      <svg
        viewBox={`0 0 ${viewBoxW} ${viewBoxH}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="DeltaYurt logo"
      >
        <defs>
          {/* Radial background gradient */}
          <radialGradient id="bgGradient" cx="30%" cy="20%" r="80%">
            <stop offset="0%" stopColor={purpleLight} />
            <stop offset="60%" stopColor={backgroundPurple} />
            <stop offset="100%" stopColor={purpleDark} />
          </radialGradient>

          {/* Soft shadow for the capsule */}
          <filter id="capsuleShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.15" />
          </filter>

          {/* Purple band gradient */}
          <linearGradient id="bandGradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor={purpleLight} />
            <stop offset="50%" stopColor={backgroundPurple} />
            <stop offset="100%" stopColor={purpleDark} />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width={viewBoxW} height={viewBoxH} fill="url(#bgGradient)" />

        {/* Main white capsule */}
        <rect
          x={capsule.x}
          y={capsule.y}
          rx={capsule.rx}
          width={capsule.width}
          height={capsule.height}
          fill="#FFFFFF"
          filter="url(#capsuleShadow)"
        />

        {/* Purple curved band */}
        <path
          d={`M ${capsule.x + 20} ${capsule.y - 5}
               C ${capsule.x + 80} ${capsule.y - 25}, ${capsule.x + capsule.width - 80} ${capsule.y - 25}, ${capsule.x + capsule.width - 20} ${capsule.y - 5}
               L ${capsule.x + capsule.width - 20} ${capsule.y + 15}
               C ${capsule.x + capsule.width - 80} ${capsule.y - 5}, ${capsule.x + 80} ${capsule.y - 5}, ${capsule.x + 20} ${capsule.y + 15}
               Z`}
          fill="url(#bandGradient)"
        />

        {/* Yurt-like top cap */}
        <path
          d={`M ${capsule.x + 100} ${capsule.y - 20}
               C ${capsule.x + 120} ${capsule.y - 35}, ${capsule.x + capsule.width - 120} ${capsule.y - 35}, ${capsule.x + capsule.width - 100} ${capsule.y - 20}
               C ${capsule.x + capsule.width - 110} ${capsule.y - 10}, ${capsule.x + 110} ${capsule.y - 10}, ${capsule.x + 100} ${capsule.y - 20}
               Z`}
          fill="#FFFFFF"
        />

        {/* DeltaYurt text */}
        <text
          x={capsule.x + capsule.width / 2}
          y={capsule.y + capsule.height / 2 + 2}
          textAnchor="middle"
          fontFamily="Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
          fontWeight="700"
          fontSize="36"
          fill={textPurple}
          dominantBaseline="middle"
        >
          DeltaYurt
        </text>
      </svg>
    </div>
  );
}