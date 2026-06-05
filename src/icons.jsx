// icons.jsx — Haven line icon set (simple geometric strokes, currentColor)

export function Icon({ name, size = 22, sw = 1.7, style = {} }) {
  const p = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: sw,
    strokeLinecap: 'round', strokeLinejoin: 'round', style,
  };
  switch (name) {
    case 'home':
      return <svg {...p}><path d="M4 11l8-6.5 8 6.5"/><path d="M6 9.8V19h12V9.8"/><path d="M10 19v-4.5h4V19"/></svg>;
    case 'ritual': // layered / calendar slab
      return <svg {...p}><rect x="4" y="5" width="16" height="15" rx="2.5"/><path d="M4 9.5h16M9 3.5v3M15 3.5v3"/><circle cx="9" cy="13.5" r="0.9" fill="currentColor" stroke="none"/><circle cx="15" cy="13.5" r="0.9" fill="currentColor" stroke="none"/></svg>;
    case 'insights':
      return <svg {...p}><path d="M4 19V5"/><path d="M4 19h16"/><path d="M7.5 15l3-3.5 3 2.5L19 8"/></svg>;
    case 'settings':
      return <svg {...p}><path d="M5 8h14M5 16h14"/><circle cx="9" cy="8" r="2.4" fill="var(--bg-1)"/><circle cx="15" cy="16" r="2.4" fill="var(--bg-1)"/></svg>;
    case 'plus': return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case 'minus': return <svg {...p}><path d="M5 12h14"/></svg>;
    case 'play': return <svg {...p}><path d="M8 5.5l11 6.5-11 6.5z" fill="currentColor" stroke="none"/></svg>;
    case 'pause': return <svg {...p}><rect x="7" y="5.5" width="3.4" height="13" rx="1.2" fill="currentColor" stroke="none"/><rect x="13.6" y="5.5" width="3.4" height="13" rx="1.2" fill="currentColor" stroke="none"/></svg>;
    case 'stop': return <svg {...p}><rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor" stroke="none"/></svg>;
    case 'flame':
      return <svg {...p}><path d="M12 3c2.5 3 4.5 5 4.5 8.5A4.5 4.5 0 0 1 12 16a4.5 4.5 0 0 1-4.5-4.5C7.5 9.8 8.6 8.6 9.5 7.5c.3 1.2 1 2 2 2.3C11 8 11 5.5 12 3z"/><path d="M12 21a6 6 0 0 0 6-6c0-1-.2-1.8-.5-2.6"/><path d="M12 21a6 6 0 0 1-6-6c0-1 .2-1.8.5-2.6"/></svg>;
    case 'steam':
      return <svg {...p}><path d="M8 20c-1.2-1.3-1.2-2.7 0-4s1.2-2.7 0-4"/><path d="M12 20c-1.2-1.3-1.2-2.7 0-4s1.2-2.7 0-4"/><path d="M16 20c-1.2-1.3-1.2-2.7 0-4s1.2-2.7 0-4"/></svg>;
    case 'lock': return <svg {...p}><rect x="5" y="10.5" width="14" height="9.5" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>;
    case 'unlock': return <svg {...p}><rect x="5" y="10.5" width="14" height="9.5" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 7.5-1.8"/></svg>;
    case 'clock': return <svg {...p}><circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3 1.8"/></svg>;
    case 'timer': return <svg {...p}><circle cx="12" cy="13" r="7.5"/><path d="M12 13V9M9.5 2.5h5M19 6l-1.5 1.5"/></svg>;
    case 'heart': return <svg {...p}><path d="M12 20S4 15 4 9.5A4 4 0 0 1 12 7a4 4 0 0 1 8 2.5C20 15 12 20 12 20z"/></svg>;
    case 'pulse': return <svg {...p}><path d="M3 12h4l2-5 3.5 11L16 9l1.5 3H21"/></svg>;
    case 'moon': return <svg {...p}><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>;
    case 'target': return <svg {...p}><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none"/></svg>;
    case 'bolt': return <svg {...p}><path d="M13 3 5 13h5l-1 8 8-10h-5z" fill="currentColor" stroke="none"/></svg>;
    case 'leaf': return <svg {...p}><path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14 0 0-1-3 1-6"/></svg>;
    case 'drop': return <svg {...p}><path d="M12 3.5c3 4 5.5 6.5 5.5 9.5a5.5 5.5 0 1 1-11 0c0-3 2.5-5.5 5.5-9.5z"/></svg>;
    case 'check': return <svg {...p}><path d="M5 12.5l4.5 4.5L19 7"/></svg>;
    case 'arrow-right': return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'arrow-up': return <svg {...p}><path d="M12 19V5M6 11l6-6 6 6"/></svg>;
    case 'arrow-down': return <svg {...p}><path d="M12 5v14M6 13l6 6 6-6"/></svg>;
    case 'chevron-right': return <svg {...p}><path d="M9 6l6 6-6 6"/></svg>;
    case 'chevron-down': return <svg {...p}><path d="M6 9l6 6 6-6"/></svg>;
    case 'chevron-left': return <svg {...p}><path d="M15 6l-6 6 6 6"/></svg>;
    case 'close': return <svg {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case 'plus-min': return <svg {...p}><path d="M12 6v12M6 12h12"/></svg>;
    case 'link': return <svg {...p}><path d="M9 15l6-6"/><path d="M11 7l1-1a3.5 3.5 0 0 1 5 5l-1 1"/><path d="M13 17l-1 1a3.5 3.5 0 0 1-5-5l1-1"/></svg>;
    case 'sparkle': return <svg {...p}><path d="M12 4l1.6 4.8L18 10l-4.4 1.2L12 16l-1.6-4.8L6 10l4.4-1.2z" fill="currentColor" stroke="none"/></svg>;
    case 'sun': return <svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4"/></svg>;
    case 'wind': return <svg {...p}><path d="M3 9h11a3 3 0 1 0-3-3"/><path d="M3 13h15a3 3 0 1 1-3 3"/></svg>;
    case 'gauge': return <svg {...p}><path d="M5 18a8 8 0 1 1 14 0"/><path d="M12 14l4-4"/><circle cx="12" cy="14" r="1.4" fill="currentColor" stroke="none"/></svg>;
    case 'bed': return <svg {...p}><path d="M4 18v-6h16v6M4 12V8M20 12V8M4 18v2M20 18v2M8 12v-2h8v2"/></svg>;
    case 'bell': return <svg {...p}><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2H4.5z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>;
    case 'shield': return <svg {...p}><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="8"/></svg>;
  }
}

// Haven sunset logomark: filled semicircle (sun) over horizon lines
export function Sunset({ size = 26, color = 'currentColor' }) {
  const w = size, h = size * 0.78;
  return (
    <svg width={w} height={h} viewBox="0 0 32 25" fill="none" className="sunset" style={{ display: 'block' }}>
      <path d="M5 14a11 11 0 0 1 22 0z" fill={color} />
      <path d="M2 18h28M7 22h18" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function Wordmark({ color = 'var(--t1)', size = 17 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <Sunset size={22} color="var(--accent)" />
      <span style={{
        fontSize: size, fontWeight: 600, letterSpacing: '0.34em',
        color, paddingLeft: 2, fontFamily: "'Hanken Grotesk', sans-serif",
      }}>HAVEN</span>
    </div>
  );
}
