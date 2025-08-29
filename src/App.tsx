import { useCallback, useEffect, useState } from "@lynx-js/react";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";

export function App(props: { onRender?: () => void }) {
  const [alterLogo, setAlterLogo] = useState(false);

  useEffect(() => {
    console.info("Hello, ReactLynx");
  }, []);
  props.onRender?.();

  const onTap = useCallback(() => {
    "background only";
    setAlterLogo((prevAlterLogo) => !prevAlterLogo);
  }, []);

  return (
    <view className="min-h-screen bg-black flex flex-col items-center justify-center">
      {/* Logo Section */}
      <view className="flex flex-col items-center mb-8">
        <view className="flex flex-col items-center mb-2" bindtap={onTap}>
          {alterLogo ? (
            <image src={reactLynxLogo} className="w-24 h-24 animate-spin" />
          ) : (
            <image src={lynxLogo} className="w-24 h-24" />
          )}
        </view>
        <text className="text-4xl font-bold text-white">React</text>
        <text className="italic text-2xl font-semibold text-white mb-2">
          on Lynx
        </text>
      </view>
      {/* Content Section */}
      <view className="flex flex-col items-center justify-center">
        <image src={arrow} className="w-6 h-6 mb-2" />
        <text className="text-lg text-white mb-2">hello hello testing!</text>
        <text className="text-xs text-white/65 mb-2">
          Edit
          <text className="italic text-white/85"> src/App.tsx </text>
          to see updates!
        </text>
      </view>
      <view className="flex-1" />
    </view>
  );
}
