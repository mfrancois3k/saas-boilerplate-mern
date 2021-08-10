import { useSelector } from "react-redux";
import { useFirebase, isEmpty } from "react-redux-firebase";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Image,
  Flex,
  Box,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { MenuItem } from "./MenuItem";

export const DrawerMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);
  const { email, photoURL } = useSelector((state) => state.user);

  return !isEmpty(auth) ? (
    <>
      <Button variant="outline" onClick={onOpen} mr={4}>
        <HamburgerIcon />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              <Flex direction="column" alignItems="center">
                <Image
                  borderRadius="full"
                  boxSize="50px"
                  src={photoURL ? photoURL : "https://via.placeholder.com/150"}
                  alt="Profile URL"
                  mb={2}
                />
                <Heading as="h6" size="xs">
                  {email}
                </Heading>
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <Flex
                h="100%"
                py={10}
                direction="column"
                justifyContent="space-between"
                alignItems="stretch"
              >
                <Box>
                  <MenuItem to="/dashboard">
                    <Button
                      border="none"
                      leftIcon={<AiFillHome />}
                      variant="outline"
                      w="100%"
                      justifyContent="flex-start"
                      onClick={onClose}
                    >
                      Dashboard
                    </Button>
                  </MenuItem>
                  <MenuItem to="/feautures">
                    <Button
                      border="none"
                      leftIcon={<AiFillHome />}
                      variant="outline"
                      w="100%"
                      justifyContent="flex-start"
                      onClick={onClose}
                    >
                      Feautures
                    </Button>
                  </MenuItem>
                </Box>
                <Box>
                  <MenuItem to="/settings">
                    <Button
                      border="none"
                      leftIcon={<SettingsIcon />}
                      variant="outline"
                      w="100%"
                      justifyContent="flex-start"
                      onClick={onClose}
                    >
                      Settings
                    </Button>
                  </MenuItem>
                  <MenuItem to="/login">
                    <Button
                      border="none"
                      leftIcon={<AiOutlineLogout />}
                      variant="outline"
                      w="100%"
                      justifyContent="flex-start"
                      onClick={() => {
                        onClose();
                        firebase.logout();
                      }}
                    >
                      Sign Out
                    </Button>
                  </MenuItem>
                </Box>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  ) : null;
};
