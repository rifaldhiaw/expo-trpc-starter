import React from "react";
import { View } from "react-native";
import { cn } from "~/lib/utils";

export const Col = (props: {
  className?: string;
  children?: React.ReactNode;
  expanded?: boolean;
  center?: boolean;
  crossCenter?: boolean;
}) => {
  return (
    <View
      className={cn(
        "flex flex-col",
        props.expanded && "flex-1",
        props.center && "justify-center",
        props.crossCenter && "items-center",
        props.className
      )}
    >
      {props.children}
    </View>
  );
};
