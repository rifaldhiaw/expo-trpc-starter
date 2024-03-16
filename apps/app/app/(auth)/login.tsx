import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput } from "react-native";
import Toast from "react-native-toast-message";
import { Col } from "~/components/ui/col";
import { Space } from "~/components/ui/space";
import { auth } from "~/lib/firebase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const signIn = useMutation({
    mutationFn: () => {
      return signInWithEmailAndPassword(auth, email, password);
    },
    onSuccess: (res) => {
      router.push("/(tabs)/");
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Failed to sign in",
        text2: (err as Error).message,
      });
    },
  });

  return (
    <Col className="flex-1 bg-background">
      <ScrollView
        className="flex flex-1 py-8 px-8"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Col className="flex flex-1 justify-center items-center">
          <Space size="2xl" />
          <Text className="text-4xl font-bold">Sign in</Text>
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
            <Pressable
              className="bg-primary p-4 rounded-lg flex items-center justify-center"
              disabled={signIn.isLoading}
              onPress={() => signIn.mutate()}
            >
              <Text className="text-xl font-semibold text-primary-foreground">
                Sign in
              </Text>
            </Pressable>
          </Col>

          {/* sign up */}
          <Space size="xl" />
          <Text className="text-lg">Don't have an account?</Text>

          <Pressable
            onPress={() => {
              router.push("/(auth)/register");
            }}
            className="flex flex-row "
          >
            <Text className="text-lg font-semibold text-primary">Sign up</Text>
          </Pressable>
        </Col>
        <Space size="2xl" />
      </ScrollView>
    </Col>
  );
};

export default SignIn;
