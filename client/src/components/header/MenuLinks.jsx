import { isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { Box, Button, Stack, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon, SettingsIcon } from "@chakra-ui/icons";
import { MenuItem } from "./MenuItem";

export const MenuLinks = ({ isOpen }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const subscription = useSelector((state) => state.subscription);
  const auth = useSelector((state) => state.firebase.auth);

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        {!isEmpty(auth) ? (
          <>
            {subscription.plan === "basic" ? (
              <MenuItem to="/subscription">
                <Button>Upgrade</Button>
              </MenuItem>
            ) : null}
            <MenuItem to="/settings">
              <Button>
                <SettingsIcon />
              </Button>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem to="/">Home</MenuItem>
            <MenuItem to="/login">Signin</MenuItem>
            <MenuItem to="/signup" button={true}>
              Signup
            </MenuItem>
          </>
        )}
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Stack>
    </Box>
  );
};
