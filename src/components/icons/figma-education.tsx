import * as React from "react";
const figmaEducation = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={55}
    height={48}
    viewBox="0 0 55 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_319_5146)">
      <path
        d="M21.6297 39.4294L10.9004 29.2439L13.7075 18.7674L7.99996 13.32L30.0512 7.99994L46.4881 23.6329L42.7651 37.5272L39.8674 36.7508L43.1604 24.4613L38.8215 25.4967L36.0143 35.9732L21.6297 39.4294ZM25.3288 25.6243L40.4586 22.0173L29.1593 11.3286L14.0294 14.9356L25.3288 25.6243ZM22.5136 36.1305L33.5705 33.5027L35.5097 26.2657L24.4378 28.9495L16.1912 21.0893L14.252 28.3263L22.5136 36.1305Z"
        fill="#FF5A2A"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_319_5146"
        x={-5.61426}
        y={-5.15649}
        width={62.9097}
        height={57.7424}
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
          result="effect1_dropShadow_319_5146"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_319_5146"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default figmaEducation;
