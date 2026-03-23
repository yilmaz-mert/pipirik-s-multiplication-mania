// Decorative organic blob — visible only on desktop, absolutely positioned within the
// homepage's lg:relative wrapper at left:158px / top:158px behind all card content.
export default function YellowBlob() {
  return (
    <div
      className="hidden lg:block lg:absolute lg:left-[158px] lg:top-[158px] -z-10 pointer-events-none"
      aria-hidden="true"
    >
      <svg width="1074" height="740" viewBox="0 0 1074 740" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5986 406.225C79.5304 241.744 392.459 374.463 351.975 214.898C311.491 55.3327 408.871 4.28694 467.226 0.127655C525.581 -4.03163 818.815 95.035 877.899 65.5419C925.166 41.9474 955.462 65.2898 964.702 79.9103C1044.7 115.705 1158.88 217.772 975.643 339.676C746.6 492.058 869.146 557.85 804.955 611.921C740.765 665.991 369.846 807.407 321.339 701.912C292.158 638.451 221.417 601.074 166.305 582.787C150.709 579.71 134.639 575.712 118.92 570.672C41.7131 545.911 -27.0144 495.975 10.5986 406.225Z" fill="#FAECA2"/>
      </svg>
    </div>
  );
}
