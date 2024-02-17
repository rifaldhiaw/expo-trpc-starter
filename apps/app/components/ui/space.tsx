import React from "react";
import { View } from "react-native";
import { cn } from "~/lib/utils";

export const Space = (props: {
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}) => {
  const size = {
    xs: "h-1 w-1",
    sm: "h-2 w-2",
    md: "h-4 w-4",
    lg: "h-8 w-8",
    xl: "h-16 w-16",
    "2xl": "h-32 w-32",
    "3xl": "h-64 w-64",
  }[props.size];

  return <View className={cn("bg-transparent", size)} />;
};
