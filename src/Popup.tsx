// Popup.tsx
import { useEffect, useState } from '@lynx-js/react';

type PopupProps = {
  title?: string;
  width?: string;          // e.g. "92%"
  maxHeight?: string;      // e.g. "90vh"
  bodyMaxHeight?: string;  // e.g. "60vh"
  footer?: any;            // pinned footer content
  children?: any;          // scrollable body content
};

export default function Popup({
  title = 'TikTok Style Popup',
  width = '92%',
  maxHeight = '90vh',
  bodyMaxHeight = '60vh',
  children,
}: PopupProps) {
  const [open, setOpen] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (open) setVisible(true);
  }, [open]);

  const handleTransitionEnd = () => {
    if (!open) setVisible(false);
  };
  const footer = (
    <view style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
      <view
        style={{
          padding: '10px 14px',
          borderRadius: '12px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          marginRight: '10px',
        }}
        bindtap={() => console.log('Learn more')}
        accessibility-element={true}
        accessibility-traits="button"
      >
        <text style={{ color: '#fff', fontSize: '14px', fontWeight: 600 as any }}>Learn more</text>
      </view>
      <view
        style={{ padding: '10px 14px', borderRadius: '12px', backgroundColor: '#fff' }}
        bindtap={() => setOpen(false)}
        accessibility-element={true}
        accessibility-traits="button"
        accessibility-label="Close popup"
        
      >
        <text style={{ color: '#FE2C55', fontSize: '14px', fontWeight: 700 as any }}>Got it</text>
      </view>
    </view>
  );

  if (!visible) return null;

  return (
    <view
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: open ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0)',
        transition: 'background-color 250ms ease',
        zIndex: 1000,
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
          width,
          maxWidth: '520px',
          minHeight: '650px',
          maxHeight,                    // dialog height clamp
          backgroundColor: '#FE2C55',   // TikTok red
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          padding: '20px',
          opacity: open ? 1 : 0,
          transition: 'opacity 250ms ease, transform 250ms ease',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',           // keep everything inside
        }}
        catchtap={() => {}}             // prevent backdrop from catching taps inside
        bindtransitionend={handleTransitionEnd}
        accessibility-element={true}
        accessibility-label={title ? `${title}. Dialog` : 'Dialog'}
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
            backgroundColor: 'rgba(255,255,255,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          bindtap={() => setOpen(false)}
          accessibility-element={true}
          accessibility-traits="button"
          accessibility-label="Close popup"
        >
          <text style={{ color: '#fff', fontSize: '18px', fontWeight: 700 as any }}>✕</text>
        </view>

        {/* Header */}
        {title ? (
          <view style={{ marginBottom: '12px' }}>
            <text style={{ fontSize: '18px', fontWeight: 700 as any, color: '#fff' }}>
              {title}
            </text>
          </view>
        ) : null}

        {/* Body (scrollable) */}
        <scroll-view
          scroll-y                // ✅ correct for Lynx
          style={{
            flex: 1,
            maxHeight: bodyMaxHeight,
            overflow: 'hidden',
            paddingRight: '4px',
            minHeight:'550px',
            backgroundColor: 'rgba(255,255,255,0.12)',
            borderRadius: '12px',
            padding: '12px 14px',
          }}
        >
          {children}
        </scroll-view>

        {/* Footer (pinned) */}
        {footer ? (
          <view style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
            {footer}
          </view>
        ) : null}
      </view>
    </view>
  );
}