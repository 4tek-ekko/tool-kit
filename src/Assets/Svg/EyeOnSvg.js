import { moderateScale } from '@/Theme'
import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

const EyeOnSvg = ({ size = 18 }) => (
  <Svg
    width={moderateScale(size)}
    height={moderateScale(size)}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Circle cx={7} cy={7} r={7} fill="#C8D2EB" />
    <Path
      d="M7 3.182c-2.577 0-4.799 1.52-5.82 3.712a.25.25 0 0 0 0 .212 6.416 6.416 0 0 0 11.64 0 .25.25 0 0 0 0-.212A6.416 6.416 0 0 0 7 3.182Zm0 6.453a2.634 2.634 0 1 1 0-5.268 2.634 2.634 0 0 1 0 5.268Z"
      fill="#0E182F"
    />
    <Path
      d="M7 8.686a1.686 1.686 0 1 0 0-3.373 1.686 1.686 0 0 0 0 3.373Z"
      fill="#0E182F"
    />
  </Svg>
)

export default EyeOnSvg
