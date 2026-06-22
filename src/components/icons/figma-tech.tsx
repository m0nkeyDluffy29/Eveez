import * as React from "react";
const figmaTech = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={50}
    height={50}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_319_5102)">
      <path
        d="M29.4167 41.1607L10.2955 33.1044L12.1779 30.649L28.4252 37.4605L39.09 23.4379L41.9479 24.6232L29.4167 41.1607ZM27.1212 32.5938L8.00002 24.5375L20.5313 7.99998L39.6524 16.0563L27.1212 32.5938ZM26.1297 28.8936L34.9344 17.3205L21.5227 11.7001L12.7181 23.2733L26.1297 28.8936Z"
        fill="#FF5A2A"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_319_5102"
        x={-3.29492}
        y={-4.2406}
        width={56.5376}
        height={57.642}
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
          result="effect1_dropShadow_319_5102"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_319_5102"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default figmaTech;
