import { useCallback, useEffect, useState } from "@lynx-js/react";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";
//import PopUp from './PopUp';
import Popup from './Popup.js';

export function App(props: { onRender?: () => void }) {
  //const [alterLogo, setAlterLogo] = useState(false);
  //const [open, setOpen] = useState(false);

  return (
    <view style={{ minHeight: '100vh' }}>
      <Popup title="Introducing Karma Points" >
        {/* Subtitle */}
        <view style={{ marginBottom: '12px' }}>
          <text style={{ color: '#fff', fontSize: '15px', opacity: 0.95 }}>
            Turn your watch time into real support for creators.
          </text>
        </view>

        {/* Bullets — long content will scroll */}
        <view style={{ display: 'flex', flexDirection: 'row', marginBottom: '12px' }}>
          <text style={{ color: '#fff', fontSize: '16px', marginRight: '8px' }}>1.</text>
          <view style={{ flex: 1 }}>
            <text style={{ color: '#fff', fontWeight: 700 as any }}>Your Daily Micro-Tipping Power:</text>
            <text style={{ color: '#fff', display: 'block', marginTop: '2px', opacity: 0.95 }}>
              You receive a small, daily allowance of Karma Points (e.g., worth 1¢)
              that is automatically dedicated to supporting creators.
            </text>
          </view>
        </view>

        <view style={{ display: 'flex', flexDirection: 'row', marginBottom: '12px' }}>
          <text style={{ color: '#fff', fontSize: '16px', marginRight: '8px' }}>2.</text>
          <view style={{ flex: 1 }}>
            <text style={{ color: '#fff', fontWeight: 700 as any }}>You Support Just By Watching:</text>
            <text style={{ color: '#fff', display: 'block', marginTop: '2px', opacity: 0.95 }}>
              We track your watch time. The longer you genuinely engage with a creator’s content,
              the more of your daily Karma Points they earn.
            </text>
          </view>
        </view>

        <view style={{ display: 'flex', flexDirection: 'row', marginBottom: '12px' }}>
          <text style={{ color: '#fff', fontSize: '16px', marginRight: '8px' }}>3.</text>
          <view style={{ flex: 1 }}>
            <text style={{ color: '#fff', fontWeight: 700 as any }}>It’s Automatic and Free for You:</text>
            <text style={{ color: '#fff', display: 'block', marginTop: '2px', opacity: 0.95 }}>
              There’s no button to click. When a creator hits engagement goals through audience watch time,
              your allocated points are released to them as real money—you never spend your own cash.
            </text>
          </view>
        </view>

        <view style={{ display: 'flex', flexDirection: 'row' }}>
          <text style={{ color: '#fff', fontSize: '16px', marginRight: '8px' }}>4.</text>
          <view style={{ flex: 1 }}>
            <text style={{ color: '#fff', fontWeight: 700 as any }}>Your Attention Has Value:</text>
            <text style={{ color: '#fff', display: 'block', marginTop: '2px', opacity: 0.95 }}>
              Karma Points directly reward the creators you love most—simply by giving them your attention.
            </text>
          </view>
        </view>
      </Popup>
    </view>
  );
}

