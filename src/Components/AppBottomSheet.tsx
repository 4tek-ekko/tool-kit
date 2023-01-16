import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet'
import { Portal } from '@gorhom/portal'
import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react'
interface AppBottomSheetProps extends BottomSheetProps {
  snapPoints: (`${number}%` | number)[]
  children: React.ReactNode
}
const AppBottomSheet = forwardRef(
  (
    { snapPoints = ['50%'], children, ...restProps }: AppBottomSheetProps,
    ref,
  ) => {
    const sheetRef = useRef<BottomSheet>()
    useImperativeHandle(
      ref,
      () => ({
        ...sheetRef.current,
        snapTo: (value, isPosition = false) => {
          if (isPosition) {
            sheetRef.current?.snapToPosition?.(value)
          } else {
            if (value >= 0 && value <= snapPoints.length - 1) {
              sheetRef.current?.snapToIndex?.(value)
            }
          }
        },
        close: () => sheetRef.current?.close?.(),
      }),
      [snapPoints],
    )
    return (
      <Portal name="AppBottomSheet">
        <BottomSheet
          enablePanDownToClose
          {...restProps}
          index={isNaN(restProps.index) ? -1 : restProps.index}
          snapPoints={snapPoints}
          ref={sheetRef}
        >
          {children}
        </BottomSheet>
      </Portal>
    )
  },
)

export default memo(AppBottomSheet)
