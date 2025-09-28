import React from "react";
import DeltaYurtLogo from './DeltaYurtLogo';

export default function DeltaYurtLogoWithText() {
  return (
    <div className="flex items-center gap-3">
      {/* Логотип юрты */}
      <DeltaYurtLogo width={120} height={90} />
    </div>
  );
}
