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
import { titleToPath } from "../helpers/pathTitles";
import Link from "next/link";
import { useRouter } from "next/router";

function DrawerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const router = useRouter();

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
          <DrawerHeader></DrawerHeader>

          <DrawerBody>
            <List spacing={3}>
              {Object.entries(titleToPath).map((item) => (
                <ListItem
                  key={item[1]}
                  onClick={() => {
                    router.push(`/categories/${item[1]}`);
                    onClose();
                  }}
                >
                  {item[0]}
                </ListItem>
              ))}
            </List>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerMenu;
