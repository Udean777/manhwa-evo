import React, { forwardRef, useCallback } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { interpolate, useAnimatedStyle } from "react-native-reanimated";

const BottomSheet = forwardRef<
  BottomSheetModal,
  { snapPoints: any; children: React.ReactNode }
>(({ snapPoints, children }, ref) => {
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheetModal
      backdropComponent={renderBackdrop}
      ref={ref}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      index={0}
    >
      {children}
    </BottomSheetModal>
  );
});

export default BottomSheet;
