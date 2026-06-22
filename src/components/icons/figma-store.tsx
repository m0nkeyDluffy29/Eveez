import * as React from "react";
const figmaStore = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={55}
    height={54}
    viewBox="0 0 55 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_319_5135)">
      <path
        d="M15.1727 10.8977L15.9491 7.99996L46.0414 16.0632L45.2649 18.9609L15.1727 10.8977ZM8.00005 37.9635L11.1059 26.3724L8.95111 25.795L9.72755 22.8973L14.3962 13.7955L44.4885 21.8587L43.9807 32.0754L43.2043 34.9731L41.0495 34.3958L37.9437 45.9869L35.046 45.2105L38.1518 33.6193L29.4584 31.2899L26.3526 42.8811L8.00005 37.9635ZM11.6742 35.8422L24.2313 39.2069L26.5607 30.5135L14.0036 27.1488L11.6742 35.8422ZM12.6847 23.6897L41.0236 31.2831L12.6847 23.6897ZM12.6847 23.6897L41.0236 31.2831L41.3604 24.1263L15.9714 17.3233L12.6847 23.6897Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_319_5135"
        x={-2.15479}
        y={-0.557495}
        width={58.2769}
        height={55.1217}
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
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_319_5135"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_319_5135"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default figmaStore;
