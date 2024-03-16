import React from "react";
import { View } from "react-native";
import { cn } from "~/lib/utils";

export const Row = (props: {
  className?: string;
  children?: React.ReactNode;
  expand?: boolean;
  center?: boolean;
  crossCenter?: boolean;
}) => {
  return (
    <View
      className={cn(
        "flex flex-row",
        props.expand && "flex-1",
        props.center && "justify-center",
        props.crossCenter && "items-center",
        props.className
      )}
    >
      {props.children}
    </View>
  );
};
