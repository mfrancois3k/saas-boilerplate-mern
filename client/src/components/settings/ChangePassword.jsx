import { useState } from "react";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";

// custom components
import Alert from "../Alert";

// styled components
import {
  Heading,
  Text,
  Divider,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";

// custom hooks
import { useInput } from "../../hooks/useInput";

const ChangePassword = () => {
  const firebase = useFirebase();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.firebase.auth);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [errorComparePassword, setErrorComparePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // custom hooks
  const {
    value: currentPassword,
    reset: resetCurrentPassword,
    bind: bindCurrentPassword,
  } = useInput("");
  const {
    value: newPassword,
    reset: resetNewPassword,
    bind: bindNewPassword,
  } = useInput("");
  const {
    value: confirmedPassword,
    reset: resetConfirmedPassword,
    bind: bindConfirmedPassword,
  } = useInput("");

  // toast message
  const toast = useToast();

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (newPassword === confirmedPassword) {
      firebase
        .reauthenticateWithCredential({
          credential: firebase.auth.EmailAuthProvider.credential(
            user.email,
            currentPassword
          ),
        })
        .then(() => {
          toast({
            title: `Password changed successfully.`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          resetCurrentPassword();
          resetNewPassword();
          resetConfirmedPassword();
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    } else {
      setErrorComparePassword("Password don't match");
    }
  };

  const disabled = auth.providerData[0].providerId !== "password";

  return (
    <Box mb={8}>
      <Heading as="h2" size="md" mb={2}>
        Change Password
      </Heading>
      <Divider mb={4} />
      <form onSubmit={handleUpdatePassword}>
        <Text mb={1}>Current password</Text>
        <InputGroup size="md" mb={4}>
          <Input
            pr="4.5rem"
            type={showCurrentPassword ? "text" : "password"}
            {...bindCurrentPassword}
            isDisabled={disabled}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              isDisabled={disabled}
            >
              {showCurrentPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Text mb={1}>New password</Text>
        <InputGroup size="md" mb={4}>
          <Input
            pr="4.5rem"
            type={showNewPassword ? "text" : "password"}
            {...bindNewPassword}
            isDisabled={disabled}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setShowNewPassword(!showNewPassword)}
              isDisabled={disabled}
            >
              {showNewPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Text mb={1}>Confirm new password</Text>
        <InputGroup size="md" mb={2}>
          <Input
            pr="4.5rem"
            type={showConfirmNewPassword ? "text" : "password"}
            {...bindConfirmedPassword}
            isDisabled={disabled}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
              isDisabled={disabled}
            >
              {showConfirmNewPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {errorComparePassword && (
          <Alert status="error" text={errorComparePassword} />
        )}
        {errorMessage && <Alert status="error" text={errorMessage} />}
        <Button mt={2} colorScheme="teal" type="submit" isDisabled={disabled}>
          Update Password
        </Button>
      </form>
    </Box>
  );
};

export default ChangePassword;
