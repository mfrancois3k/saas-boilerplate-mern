import { useState } from "react";
import Logo from "./Logo";
import { NavBarContainer } from "./NavBarContainer";
import { MenuLinks } from "./MenuLinks";
import { MenuToggle } from "./MenuToggle";
import { DrawerMenu } from "./DrawerMenu";

// styled components
import { Flex } from "@chakra-ui/react";

export default function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Flex alignItems="center">
        <DrawerMenu />
        <Logo w="100px" />
      </Flex>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
}
