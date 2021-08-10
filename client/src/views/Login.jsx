import { useState } from "react";
import saasApi from "../api/saas";
import { useFirebase } from "react-redux-firebase";
import { Link as RouterLink } from "react-router-dom";

// custom components
import Alert from "../components/Alert";

// custom hooks
import { useInput } from "../hooks/useInput";

// style componnents
import {
  Container,
  Heading,
  Text,
  Link,
  InputGroup,
  InputRightElement,
  Input,
  Button,
  Flex,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const firebase = useFirebase();

  // custom hooks
  const { value: email, bind: bindEmail } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleShowClick = () => setShow(!show);

  const loginWithGoogle = () => {
    return firebase
      .login({ provider: "google", type: "popup" })
      .then(async ({ user }) => {
        const { data } = await saasApi.post("/auth/firebase-login", { user });
        console.log(data);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* signInWithEmailAndPassword(email, password, () => {
      history.push("/dashboard");
    }); */
  };

  return (
    <Container maxW="container.xl">
      <Flex wrap="wrap">
        <Flex direction="column" basis={{ base: "100%", md: "50%" }}>
          <Heading mb={14} size="2xl">
            Sign In
          </Heading>
          <Flex mb={14} justifyContent="space-between" flexWrap="wrap">
            <Button
              leftIcon={<FcGoogle />}
              variant="outline"
              mb={4}
              flexBasis={{ base: "100%", md: "45%" }}
              onClick={loginWithGoogle}
            >
              Continue with Google
            </Button>
          </Flex>

          <form onSubmit={handleSubmit}>
            <FormControl id="email" mb={6}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" {...bindEmail} />
            </FormControl>

            <FormControl id="password" mb={6}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={show ? "text" : "password"} {...bindPassword} />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            {errorMessage && (
              <Alert
                status="error"
                text={errorMessage}
                title="Error"
                withCloseButton={false}
              />
            )}

            <Button
              borderRadius="10px"
              colorScheme="teal"
              isDisabled={!email || !password}
              isLoading={isSubmitting && !errorMessage}
              type="submit"
            >
              Submit
            </Button>
          </form>

          <Flex
            mt={14}
            flexDirection={{ base: "column", md: "row" }}
            justifyContent={{ md: "space-between" }}
          >
            <Text>
              Don't have an account?{" "}
              <Link as={RouterLink} to="/signup" color={"green.500"}>
                Sign Up
              </Link>
            </Text>
            <Text mt={{ base: "6", md: "0" }}>
              <Link as={RouterLink} to="/forgot-password">
                Forgot Password?
              </Link>
            </Text>
          </Flex>
        </Flex>

        <Flex basis={{ base: "100%", md: "50%" }}>
          {/* IMAGE OR SOMETHING LIKE THIS */}
        </Flex>
      </Flex>
    </Container>
  );
}
