import { Link, Stack } from "expo-router";
import { Col } from "~/components/ui/col";
import { Text } from "~/components/ui/typography";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Col expanded center crossCenter>
        <Text className="text-lg font-bold">This screen doesn't exist.</Text>

        <Link href="/" className="mt-4 py-4">
          <Text className="text-sm text-blue-500">Go to home screen!</Text>
        </Link>
      </Col>
    </>
  );
}
