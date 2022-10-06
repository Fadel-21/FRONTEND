import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Link,
  useToast,
} from "native-base";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const Toast = useToast();

  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "") {
      setError("Please fill in the form correctly");
    }

    let user = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      isAdmin: false,
    };

    axios
      .post(`${baseURL}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            title: "Account verified",
            variant: "lightText",
            description: "Thanks for signing up with us.",
            placement: "top",
            backgroundColor: "green.600",
          });
          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          title: "Error",
        });
      });
  };

  return (
    <KeyboardAvoidingView
      h={{
        lg: "auto",
      }}
    >
      <Center w="100%">
        <Box p="2" w="90%" maxW="290" py="2">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            fontWeight="semibold"
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
            fontWeight="medium"
            size="xs"
          >
            Sign up to continue!
          </Heading>
          <VStack>
            <FormControl>
              <Input
                placeholder={"Email"}
                name={"email"}
                id={"email"}
                onChangeText={(text) => setEmail(text.toLowerCase())}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder={"Name"}
                name={"name"}
                id={"name"}
                onChangeText={(text) => setName(text)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder={"Phone Number"}
                name={"phone"}
                id={"phone"}
                keyboardType={"numeric"}
                onChangeText={(text) => setPhone(text)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder={"Password"}
                name={"password"}
                id={"password"}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
              />
            </FormControl>
            {error ? <Error message={error} /> : null}
            <Button mt="2" colorScheme="orange" onPress={() => register()}>
              Sign up
            </Button>
            <Center>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                  margin: 3,
                }}
                onPress={() => props.navigation.navigate("Login")}
              >
                Back to Sign In
              </Link>
            </Center>
          </VStack>
        </Box>
      </Center>
    </KeyboardAvoidingView>
  );
};

export default Register;
