/**
 * Isotipo "SX" de SolvorX, en línea para evitar un request extra y poder
 * escalarlo sin pérdida. Variante "claro" (tinta oscura, para fondo blanco).
 *
 * Es decorativo: el nombre de marca ya vive en el <h1> y en el header.
 */
export function SxIsotype({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-71.08 -778.66 1348.22 852.99"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id="sx-a"
          gradientUnits="userSpaceOnUse"
          x1="585.16"
          y1="-707.58"
          x2="1112.30"
          y2="0.00"
        >
          <stop offset="0.00" stopColor="#57BC9A" />
          <stop offset="0.10" stopColor="#4BA699" />
          <stop offset="0.20" stopColor="#3B8696" />
          <stop offset="0.30" stopColor="#377D93" />
          <stop offset="0.45" stopColor="#326FA5" />
          <stop offset="0.60" stopColor="#2F6DB9" />
          <stop offset="0.70" stopColor="#2961B4" />
          <stop offset="0.80" stopColor="#1D43A3" />
          <stop offset="0.90" stopColor="#1F4EAE" />
          <stop offset="1.00" stopColor="#2251AE" />
        </linearGradient>
        <linearGradient
          id="sx-b"
          gradientUnits="userSpaceOnUse"
          x1="1112.30"
          y1="-707.58"
          x2="585.16"
          y2="0.00"
        >
          <stop offset="0.00" stopColor="#DC4761" />
          <stop offset="0.10" stopColor="#D73F5F" />
          <stop offset="0.20" stopColor="#C63076" />
          <stop offset="0.30" stopColor="#B52A7C" />
          <stop offset="0.40" stopColor="#9F267F" />
          <stop offset="0.52" stopColor="#82227E" />
          <stop offset="0.60" stopColor="#64207B" />
          <stop offset="0.70" stopColor="#571C7A" />
          <stop offset="0.80" stopColor="#4B1A75" />
          <stop offset="1.00" stopColor="#4A1877" />
        </linearGradient>
        <linearGradient
          id="sx-va"
          gradientUnits="userSpaceOnUse"
          x1="491.40"
          y1="-707.58"
          x2="611.98"
          y2="-797.41"
        >
          <stop offset="0" stopColor="#000" stopOpacity=".16" />
          <stop offset=".42" stopColor="#000" stopOpacity="0" />
          <stop offset=".58" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity=".13" />
        </linearGradient>
        <linearGradient
          id="sx-vb"
          gradientUnits="userSpaceOnUse"
          x1="1018.55"
          y1="-707.58"
          x2="1139.13"
          y2="-617.74"
        >
          <stop offset="0" stopColor="#000" stopOpacity=".16" />
          <stop offset=".42" stopColor="#000" stopOpacity="0" />
          <stop offset=".58" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity=".13" />
        </linearGradient>
      </defs>
      <path
        d="M299.98,-0.06C331.49,-2.48 354.41,-6.80 380.64,-15.26C402.32,-22.24 434.68,-38.59 451.09,-50.86C461.02,-58.27 479.43,-77.60 489.41,-91.08C510.11,-119.04 521.47,-159.15 519.67,-197.94C518.31,-227.46 513.72,-245.92 501.86,-269.58C482.43,-308.36 452.41,-333.66 398.96,-356.31C386.65,-361.54 356.69,-371.81 343.38,-375.38C334.17,-377.85 330.94,-378.67 298.13,-386.98C255.68,-397.73 216.39,-409.34 194.65,-417.56C169.75,-426.98 147.79,-444.90 138.38,-463.48C130.29,-479.43 128.94,-504.99 135.21,-523.29C138.72,-533.56 144.82,-544.64 151.89,-553.57C167.70,-573.56 201.26,-588.72 241.55,-594.05C258.21,-596.26 288.25,-595.35 307.13,-592.08C309.46,-591.68 314.90,-590.74 319.24,-590.00C336.11,-587.10 350.69,-582.37 372.61,-572.70C392.55,-563.89 407.39,-555.06 428.07,-539.69C445.05,-527.06 444.14,-526.92 454.53,-543.93C456.66,-547.43 464.74,-559.76 472.48,-571.34C490.58,-598.41 499.34,-611.84 500.10,-613.65C501.83,-617.79 499.15,-620.73 483.46,-631.91C461.25,-647.75 453.20,-652.73 434.95,-661.94C385.00,-687.14 328.68,-700.00 268.49,-699.94C250.92,-699.92 223.17,-697.40 211.86,-694.80C210.11,-694.40 205.85,-693.57 202.40,-692.95C191.62,-691.04 171.73,-685.51 161.04,-681.45C136.81,-672.27 109.80,-657.47 93.29,-644.33C62.39,-619.71 43.89,-595.43 29.70,-560.87C20.68,-538.90 16.86,-519.63 15.95,-491.63C14.09,-434.54 36.54,-387.27 81.65,-353.27C102.04,-337.91 131.85,-323.22 159.40,-314.96C162.27,-314.09 165.03,-313.17 165.52,-312.91C166.02,-312.64 168.91,-311.72 171.94,-310.87C174.97,-310.01 182.21,-307.88 188.04,-306.13C208.98,-299.84 213.18,-298.68 231.44,-294.16C241.63,-291.63 252.23,-288.94 254.99,-288.18C257.76,-287.41 262.76,-286.14 266.11,-285.36C287.87,-280.22 314.27,-272.38 329.54,-266.51C366.83,-252.17 387.56,-237.52 396.10,-219.48C406.12,-198.30 405.86,-170.91 395.45,-150.24C392.78,-144.96 388.82,-139.92 382.40,-133.64C362.95,-114.61 332.98,-103.48 290.19,-99.39C249.85,-95.54 198.10,-101.61 160.52,-114.60C125.11,-126.84 98.26,-141.78 64.93,-167.79C63.02,-169.29 60.72,-170.65 59.83,-170.84C56.78,-171.45 56.17,-170.65 32.23,-134.79C25.03,-124.02 15.61,-109.97 11.28,-103.56C0.36,-87.40 0.00,-86.31 4.26,-82.28C7.54,-79.18 28.81,-64.11 40.23,-56.80C74.87,-34.64 122.93,-15.78 165.81,-7.53C207.50,0.49 257.02,3.25 299.98,-0.06Z"
        fill="#050A1E"
        fillRule="evenodd"
      />
      <path
        d="M491.40,-707.58 L678.91,-707.58 L1206.05,0.00 L1018.55,0.00 Z"
        fill="url(#sx-a)"
      />
      <path
        d="M491.40,-707.58 L678.91,-707.58 L1206.05,0.00 L1018.55,0.00 Z"
        fill="url(#sx-va)"
      />
      <path
        d="M1018.55,-707.58 L1206.05,-707.58 L678.91,0.00 L491.40,0.00 Z"
        fill="url(#sx-b)"
      />
      <path
        d="M1018.55,-707.58 L1206.05,-707.58 L678.91,0.00 L491.40,0.00 Z"
        fill="url(#sx-vb)"
      />
    </svg>
  );
}
