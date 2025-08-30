// IntroKarmaPopup.tsx
import Popup from './Popup.js';

type IntroKarmaPopupProps = {
  open: boolean;
  onClose?: () => void;
  onLearnMore?: () => void;
  onGotIt?: () => void;
};

export default function IntroKarmaPopup({
  open,
  onClose,
  onLearnMore,
  onGotIt,
}: IntroKarmaPopupProps) {
    const footer = (
        <view style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <view
            style={{
              padding: '10px 14px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              marginRight: '10px',
            }}
            bindtap={onLearnMore}
            accessibility-element={true}
            accessibility-traits="button"
          >
            <text style={{ color: '#fff', fontSize: '14px', fontWeight: 600 as any }}>Learn more</text>
          </view>
          <view
            style={{ padding: '10px 14px', borderRadius: '12px', backgroundColor: '#fff' }}
            bindtap={onGotIt}
            accessibility-element={true}
            accessibility-traits="button"
          >
            <text style={{ color: '#FE2C55', fontSize: '14px', fontWeight: 700 as any }}>Got it</text>
          </view>
        </view>
      );


  return (
    <Popup open={open} title="Introducing Karma Points" onClose={onClose} footer={footer}>
      <view style={{ marginBottom: '12px' }}>
        <text style={{ color: '#fff', fontSize: '15px', opacity: 0.95 }}>
          Turn your watch time into real support for creators.
        </text>
      </view>

      <view>
        {/* 1 */}
        <view style={{ display: 'flex', flexDirection: 'row', marginBottom: '12px' }}>
          <text style={{ color: '#fff', fontSize: '16px', marginRight: '8px' }}>✅</text>
          <view style={{ flex: 1 }}>
            <text style={{ color: '#fff', fontWeight: 700 as any }}>
              Your Daily Micro-Tipping Power:
            </text>
            <text style={{ color: '#fff', display: 'block', marginTop: '2px', opacity: 0.95 }}>
              You receive a small, daily allowance of Karma Points (e.g., worth 1¢) that is
              automatically dedicated to supporting creators.
            </text>
          </view>
        </view>

        {/* 2 */}
        <view style={{ display: 'flex', flexDirection: 'row', marginBottom: '12px' }}>
          <text style={{ color: '#fff', fontSize: '16px', marginRight: '8px' }}>⏱️</text>
          <view style={{ flex: 1 }}>
            <text style={{ color: '#fff', fontWeight: 700 as any }}>
              You Support Just By Watching:
            </text>
            <text style={{ color: '#fff', display: 'block', marginTop: '2px', opacity: 0.95 }}>
              We track your watch time. The longer you genuinely engage with a creator’s content, the
              more of your daily Karma Points they earn.
            </text>
          </view>
        </view>

        {/* 3 */}
        <view style={{ display: 'flex', flexDirection: 'row', marginBottom: '12px' }}>
          <text style={{ color: '#fff', fontSize: '16px', marginRight: '8px' }}>🎁</text>
          <view style={{ flex: 1 }}>
            <text style={{ color: '#fff', fontWeight: 700 as any }}>
              It’s Automatic and Free for You:
            </text>
            <text style={{ color: '#fff', display: 'block', marginTop: '2px', opacity: 0.95 }}>
              There’s no button to click. When a creator hits engagement goals through audience watch
              time, your allocated points are released to them as real money—you never spend your own
              cash.
            </text>
          </view>
        </view>

        {/* 4 */}
        <view style={{ display: 'flex', flexDirection: 'row' }}>
          <text style={{ color: '#fff', fontSize: '16px', marginRight: '8px' }}>❤️</text>
          <view style={{ flex: 1 }}>
            <text style={{ color: '#fff', fontWeight: 700 as any }}>
              Your Attention Has Value:
            </text>
            <text style={{ color: '#fff', display: 'block', marginTop: '2px', opacity: 0.95 }}>
              Karma Points directly reward the creators you love most—simply by giving them your
              attention.
            </text>
          </view>
        </view>
      </view>
    </Popup>
  );
}
