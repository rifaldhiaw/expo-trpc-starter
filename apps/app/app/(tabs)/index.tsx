import { useRouter } from "expo-router";
import { Button } from "~/components/ui/button";
import { Col } from "~/components/ui/col";
import { Row } from "~/components/ui/row";
import { Space } from "~/components/ui/space";
import { Text } from "~/components/ui/typography";
import { auth } from "~/lib/firebase";
import { trpc } from "~/lib/trpcClient";
import { useMainStore } from "~/stores/mainStore";

export default function TabOneScreen() {
  const router = useRouter();

  const userQuery = trpc.user.getById.useQuery({ id: "1" });

  const userFirebase = useMainStore((state) => state.user);

  const renderUserInfo = () => {
    if (userQuery.isLoading) {
      return <Text>Loading...</Text>;
    }

    if (userQuery.error) {
      return <Text>Error: {userQuery.error.message}</Text>;
    }

    return (
      <Col>
        <Text>ID: {userQuery.data.id}</Text>
        <Text>Name: {userQuery.data.name}</Text>
        <Space size="md" />
        <Text>Server Token Id</Text>
        <Text>{userQuery.data.firebaseUid}</Text>
      </Col>
    );
  };

  return (
    <Col expanded className="bg-background">
      <Space size="xl" />

      <Col crossCenter>
        <Text className="font-bold">User From Backend:</Text>
        {renderUserInfo()}
      </Col>

      <Space size="lg" />
      <Col crossCenter>
        <Text className="font-bold">User From Firebase:</Text>
        {userFirebase ? (
          <Col>
            <Text>Client Token Id</Text>
            <Text>{userFirebase.uid}</Text>
            <Space size="md" />

            <Text>Name: </Text>
            <Text>{userFirebase.displayName}</Text>
          </Col>
        ) : (
          <Text>Not logged in</Text>
        )}
      </Col>

      <Space size="lg" />

      <Row center>
        <Button
          onPress={() => {
            if (userFirebase) {
              auth.signOut();
            } else {
              router.push("/(auth)/login");
            }
          }}
        >
          <Text>{userFirebase ? "Logout" : "Login"}</Text>
        </Button>
      </Row>
    </Col>
  );
}
