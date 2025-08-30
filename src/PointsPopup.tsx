// PointsPopup.tsx
import { useEffect, useState } from '@lynx-js/react';

type PointsPopupProps = {
  open: boolean;
  points?: number;
  onClose?: () => void;
};

export default function PointsPopup({ open, points = 5, onClose }: PointsPopupProps) {
  const [visible, setVisible] = useState(open);
  const [showTitle, setShowTitle] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      // staggered fade-ins
      requestAnimationFrame(() => {
        setShowTitle(true);
        setTimeout(() => setShowBadge(true), 140);
      });
    } else {
      // hide and unmount after transitions
      setShowBadge(false);
      setShowTitle(false);
      setTimeout(() => setVisible(false), 220);
    }
  }, [open]);

  if (!visible) return null;

  return (
    <view
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: open ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0)',
        transition: 'background-color 220ms ease',
        zIndex: 1100,
      }}
      accessibility-exclusive-focus={true}
      accessibility-element={false}
    >
      <view
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${open ? 1 : 0.96})`,
          transformOrigin: 'center',
          width: '86%',
          maxWidth: '420px',
          backgroundColor: '#111',               // dark card so the red pops
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
          padding: '22px',
          opacity: open ? 1 : 0,
          transition: 'opacity 220ms ease, transform 220ms ease',
          overflow: 'hidden',
        }}
        catchtap={() => {}}
        accessibility-element={true}
        accessibility-label="Points awarded dialog"
      >
        {/* Close (✕) */}
        <view
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '32px',
            height: '32px',
            borderRadius: '16px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          bindtap={onClose}
          accessibility-element={true}
          accessibility-traits="button"
          accessibility-label="Close points popup"
        >
          <text style={{ color: '#fff', fontSize: '18px', fontWeight: 700 as any }}>✕</text>
        </view>

        {/* Title */}
        <view
          style={{
            marginBottom: '12px',
            opacity: showTitle ? 1 : 0,
            transform: showTitle ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 220ms ease, transform 220ms ease',
          }}
        >
          <text style={{ color: '#fff', fontSize: '18px', fontWeight: 700 as any }}>
            New Karma Points for today
          </text>
        </view>

        {/* Badge: 5 ❤️ */}
        <view
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 0 8px',
            opacity: showBadge ? 1 : 0,
            transform: showBadge ? 'scale(1)' : 'scale(0.96)',
            transition: 'opacity 220ms ease, transform 220ms ease',
          }}
        >
          <view
            style={{
              backgroundColor: '#FE2C55',       // TikTok red
              color: '#fff',
              borderRadius: '16px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 16px rgba(254,44,85,0.45)',
            }}
          >
            <text style={{ fontSize: '24px', fontWeight: 800 as any, color: '#fff', marginRight: '8px' }}>
              {points}
            </text>
            <text style={{ fontSize: '22px' }}>❤️</text>
          </view>
        </view>

        {/* Message */}
        <view style={{ marginTop: '10px' }}>
          <text style={{ color: '#bbb', fontSize: '14px' }}>
            Thanks for supporting creators! Your watch time converted into real rewards.
          </text>
        </view>

        {/* Footer action */}
        <view style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
          <view
            style={{ padding: '10px 14px', borderRadius: '12px', backgroundColor: '#fff' }}
            bindtap={onClose}
            accessibility-element={true}
            accessibility-traits="button"
            accessibility-label="Close"
          >
            <text style={{ color: '#111', fontSize: '14px', fontWeight: 700 as any }}>Close</text>
          </view>
        </view>
      </view>
    </view>
  );
}
