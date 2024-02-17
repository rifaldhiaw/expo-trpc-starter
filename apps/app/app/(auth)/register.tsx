import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { ScrollView, TextInput } from "react-native";
import Toast from "react-native-toast-message";
import { Button } from "~/components/ui/button";
import { Col } from "~/components/ui/col";
import { Space } from "~/components/ui/space";
import { Text } from "~/components/ui/typography";
import { auth } from "~/lib/firebase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const signUp = useMutation({
    mutationFn: () => {
      return createUserWithEmailAndPassword(auth, email, password);
    },
    onSuccess: (res) => {
      router.push("/(tabs)/");
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Failed to sign up",
        text2: (err as Error).message,
      });
    },
  });

  const onSignInWithGoogle = () => {
    signUp.mutate();
  };

  return (
    <Col className="flex-1 bg-background">
      <ScrollView
        className="flex flex-1 py-8 px-8"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Col className="flex flex-1 justify-center items-center">
          <Space size="2xl" />
          <Text className="text-4xl font-bold">Register</Text>
          <Space size="xl" />

          <Col className="flex px-8">
            {/* email field */}
            <Col className="flex flex-row items-center w-full border border-gray-300 rounded-lg px-8 py-5">
              <FontAwesome5
                name="envelope"
                size={16}
                color="#000"
                className="w-10"
              />
              <TextInput
                className="flex-1 text-xl leading-tight"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </Col>

            {/* password field */}
            <Space size="md" />
            <Col className="flex flex-row items-center w-full border border-gray-300 rounded-lg px-8 py-5">
              <FontAwesome5
                name="lock"
                size={16}
                color="#000"
                className="w-10"
              />
              <TextInput
                className="flex-1 text-xl leading-tight"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </Col>
          </Col>

          <Space size="lg" />
          <Col className="self-stretch px-8">
            <Button disabled={signUp.isLoading} onPress={onSignInWithGoogle}>
              <Text className="text-xl font-semibold text-white">Register</Text>
            </Button>
          </Col>

          {/* sign in */}
          <Space size="xl" />
          <Text className="text-lg">Already have an account?</Text>

          <Button
            variant="ghost"
            onPress={() => {
              router.push("/(auth)/login");
            }}
            className="flex flex-row "
          >
            <Text className="text-lg font-semibold text-primary">Sign In</Text>
          </Button>
        </Col>
        <Space size="2xl" />
      </ScrollView>
    </Col>
  );
};

export default SignIn;
