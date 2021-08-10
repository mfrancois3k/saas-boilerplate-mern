import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import saasApi from "../../api/saas";
import { firebase } from "../../api/firebase";

// custom components
import Alert from "../Alert";

// styled components
import {
  Box,
  Heading,
  Divider,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";

// custom hooks
import { useInput } from "../../hooks/useInput";

const DeleteAccount = () => {
  /* const firebase = useFirebase(); */
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.firebase.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const { value: currentPassword, bind: bindCurrentPassword } = useInput("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    try {
      const oAuthUser = firebase.auth().currentUser;
      switch (auth.providerData[0].providerId) {
        case "password":
          // reauthenticate
          const credentials = firebase
            .auth()
            .EmailAuthProvider.credential(user.email, currentPassword);
          await oAuthUser.reauthenticateWithCredential(credentials);
          break;
        case "google.com":
          // reauthenticate
          const provider = new firebase.auth.GoogleAuthProvider();
          await oAuthUser.reauthenticateWithPopup(provider);
          break;
        default:
          setErrorMessage("No provider match");
      }
      const {
        data: { deletedCount },
      } = await saasApi.delete("/user/delete-account"); // delete user in db
      if (deletedCount === 1) {
        await oAuthUser.delete();
      }
      console.log("nothing deleted");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const providerId = auth.providerData[0].providerId;

  return (
    <Box mb={8}>
      <Heading as="h2" size="md" mb={2} color="red.500">
        DELETE ACCOUNT
      </Heading>
      <Divider mb={4} />
      <Button colorScheme="red" onClick={() => setIsOpen(true)}>
        Delete Account
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Account
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? Once you delete your account, there is no going
              back. Please be certain.
              {providerId === "password" ? (
                <InputGroup size="md" mt={4}>
                  <Input
                    pr="4.5rem"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter password"
                    {...bindCurrentPassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              ) : null}
              {errorMessage && <Alert status="error" text={errorMessage} />}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default DeleteAccount;
