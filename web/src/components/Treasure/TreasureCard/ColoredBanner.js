const ColoredBanner = ({ lightColor, darkColor, height }) => (
  <svg
    height={height}
    viewBox="0 0 54 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27.4449 45.692L52.9999 58.3867L53 5.00003C53 2.79088 51.2091 1.00001 49 1.00002L27.0001 1.00009L5.00011 1.00002C2.79097 1.00001 1.0001 2.79087 1.0001 5.00001L1 56.4994L26.6105 45.6666L27.0336 45.4876L27.4449 45.692Z"
      fill={darkColor}
      stroke={lightColor}
      strokeWidth="2"
    />
    <path
      d="M27.2155 40.5424L48.5 50.7071L48.5001 5.50002C48.5001 5.22388 48.2762 5.00002 48.0001 5.00002L27 5.00002L6.00008 5C5.72394 5 5.50008 5.22386 5.50008 5.5L5.5 49.1966L26.8117 40.5304L27.0162 40.4473L27.2155 40.5424Z"
      fill={lightColor}
      stroke={lightColor}
    />
  </svg>
)

export default ColoredBanner
