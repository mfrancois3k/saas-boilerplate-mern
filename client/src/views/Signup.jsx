import { useState } from "react";
import saasApi from "../api/saas";
import { useFirebase } from "react-redux-firebase";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../feautures/user/userSlice";

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
  FormHelperText,
  Checkbox,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const firebase = useFirebase();
  const dispatch = useDispatch();

  // custom hooks
  const { value: email, bind: bindEmail } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleShowClick = () => setShow(!show);

  const loginWithGoogle = () => {
    return firebase
      .login({ provider: "google", type: "popup" })
      .then(async ({ user }) => {
        await saasApi.post("/auth/firebase-login", { user });
        dispatch(getUser());
      });
  };

  const signupWithEmailAndPassword = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await saasApi.post("/auth/firebase-login", { user });
        setIsSubmitting(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsSubmitting(false);
      });
  };

  /* useEffect(() => {
    // clear error messages
    clearState();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); */

  return (
    <Container maxW="container.xl">
      <Flex wrap="wrap">
        <Flex direction="column" basis={{ base: "100%", md: "50%" }}>
          <Heading mb={14} size="2xl">
            Create an account.
          </Heading>
          <Text mb={14} fontSize="2xl">
            You’ll get an unlimited, free 14-day trial of all features. No
            credit card required.
          </Text>

          <Flex mb={14} justifyContent="space-between" flexWrap="wrap">
            <Button
              leftIcon={<FcGoogle />}
              variant="outline"
              mb={4}
              flexBasis={{ base: "100%", md: "45%" }}
              onClick={loginWithGoogle}
            >
              Sign up with Google
            </Button>
          </Flex>

          <form onSubmit={signupWithEmailAndPassword}>
            <FormControl id="email" mb={6}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" {...bindEmail} />
              <FormHelperText>We'll never share your email.</FormHelperText>
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

            <Flex mb={6}>
              <Checkbox
                variantColor="teal"
                value={termsAgreed}
                onChange={() => setTermsAgreed(!termsAgreed)}
                mr={4}
              />
              <Text>
                I've read and agree with{" "}
                <Link as={RouterLink} to="/terms-of-service">
                  Terms of Service
                </Link>{" "}
                and our{" "}
                <Link as={RouterLink} to="/privacy-policy">
                  Privacy Policy
                </Link>
              </Text>
            </Flex>

            {errorMessage && <Alert status="error" text={errorMessage} />}

            <Button
              borderRadius="10px"
              colorScheme="teal"
              isDisabled={!termsAgreed || !email || !password}
              isLoading={isSubmitting && !errorMessage}
              type="submit"
            >
              Submit
            </Button>
          </form>

          <Text mt={14}>
            Already have an account?{" "}
            <Link as={RouterLink} to="/login" color={"green.500"}>
              Sign In
            </Link>
          </Text>
        </Flex>

        <Flex basis={{ base: "100%", md: "50%" }}>
          {/* IMAGE OR SOMETHING LIKE THIS */}
        </Flex>
      </Flex>
    </Container>
  );
}
