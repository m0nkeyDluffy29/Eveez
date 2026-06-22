import * as React from "react";
const figmaBolt = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={43}
    height={56}
    viewBox="0 0 43 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_319_5113)">
      <path
        d="M20.3338 40.0688L28.3135 26.0258L20.441 27.4485L19.8494 16.0216L13.1211 30.8039L19.9603 29.5678L20.3338 40.0688ZM17.6039 47.1518L17.1027 33.1328L8.00018 34.7779L19.9875 8.43776L22.4097 8L23.2684 23.889L34.0929 21.9327L20.0261 46.714L17.6039 47.1518Z"
        fill="#FF5A2A"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_319_5113"
        x={-4.23047}
        y={-1.604}
        width={50.2153}
        height={58.0452}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={4} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 0.352941 0 0 0 0 0.164706 0 0 0 0.6 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_319_5113"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_319_5113"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default figmaBolt;
