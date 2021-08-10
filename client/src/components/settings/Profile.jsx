import { useRef } from "react";
import { useFirebase, isEmpty } from "react-redux-firebase";
import { useSelector, useDispatch } from "react-redux";
import { updatePhotoURL } from "../../feautures/user/userSlice";
import { auth } from "../../api/firebase";

// custom components
import Loading from "../Loading";

// styled components
import {
  Heading,
  Text,
  Divider,
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Image,
  Badge,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

// custom hooks
import { useFileHandler } from "../../hooks/useFileHandler";

const Profile = () => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const { emailVerified } = useSelector((state) => state.firebase.auth);
  const { email, photoURL } = useSelector((state) => state.user);

  // ref
  const hiddenFileInput = useRef(null);

  // custom hooks
  const { file, loading, onChange, reset } = useFileHandler({ file: null });

  // toast message
  const toast = useToast();

  const updateProfilPicture = () => {
    // update photoURL in db
    dispatch(updatePhotoURL(file, () => reset()));
  };

  // test
  const handleSendVerificationMail = () => {
    if (!emailVerified) {
      const user = auth.currentUser();
      user
        .sendEmailVerification()
        .then(() => {
          toast({
            title: `Verification email sent.`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Box mb={8}>
      <Heading as="h2" size="md" mb={2}>
        Profile
      </Heading>
      <Divider mb={4} />
      <Text mb={1}>Profile picture</Text>
      <Box position="relative">
        {loading ? (
          <Loading />
        ) : (
          <>
            <Image
              borderRadius="full"
              boxSize="150px"
              src={
                file
                  ? file
                  : photoURL
                  ? photoURL
                  : "https://via.placeholder.com/150"
              }
              alt="Profile Image"
              mb={4}
            />
            <IconButton
              position="absolute"
              bottom="0"
              left="0"
              size="sm"
              icon={<EditIcon />}
              onClick={() => hiddenFileInput.current.click()}
            />
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={onChange}
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
          </>
        )}
        {file ? (
          <Button mb={2} colorScheme="teal" onClick={updateProfilPicture}>
            Save Profil Picture
          </Button>
        ) : null}
      </Box>
      <Text mb={1}>Email</Text>
      <InputGroup size="md" mb={4}>
        <Input pr="4.5rem" type="text" value={email} isDisabled={true} />
        <InputRightElement width="6.5rem">
          {emailVerified ? (
            <Badge colorScheme="green">Verified</Badge>
          ) : (
            <Badge colorScheme="red">Not Verified</Badge>
          )}
        </InputRightElement>
      </InputGroup>
      {!emailVerified ? (
        <Button size="xs" onClick={handleSendVerificationMail}>
          Send verification mail
        </Button>
      ) : null}
    </Box>
  );
};

export default Profile;
