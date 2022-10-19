import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  List,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRef } from "react";

function DrawerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <IconButton ref={btnRef} colorScheme="white" onClick={onOpen}>
        <HamburgerIcon w={30} h={30} color="black" />
      </IconButton>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <List spacing={3}>
              <ListItem>Sports</ListItem>
              <ListItem>Lorem ipsum dolor</ListItem>
              <ListItem>Lorem ipsum dolor</ListItem>
            </List>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerMenu;
