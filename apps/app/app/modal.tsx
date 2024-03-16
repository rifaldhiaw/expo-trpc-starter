import { StatusBar } from "expo-status-bar";
import { Platform, Text } from "react-native";
import { Col } from "~/components/ui/col";

export default function ModalScreen() {
  return (
    <Col expand center crossCenter>
      <Text className="text-4xl font-bold">Modal</Text>
      <Col className="my-8 bg-gray-200 h-px w-4/5" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </Col>
  );
}
