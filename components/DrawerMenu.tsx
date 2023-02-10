import { useRef } from "react";
import { useRouter } from "next/router";
import DarkModeSwitch from "./DarkModeSwitch";
import { titleToPath } from "../helpers/pathTitles";
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
  Box,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

function DrawerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const router = useRouter();

  return (
    <Box>
      <Box
        position="fixed"
        top={0}
        bg="white"
        w="100%"
        zIndex={200}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton
          ref={btnRef}
          w="100px"
          display="flex"
          justifyContent="flex-start"
          pl="20px"
          aria-label="hamburger"
          colorScheme="white"
          onClick={onOpen}
        >
          <HamburgerIcon w={30} h={30} color="text.dark" />
        </IconButton>

        <Box py="10px">
          <Image
            alt="news logo"
            src="/news.png"
            borderRadius="10px"
            w="120px"
            _hover={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
          />
        </Box>
        <DarkModeSwitch />
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader background="white"></DrawerHeader>

          <DrawerBody background="white" fontWeight={500}>
            <List spacing={3}>
              {Object.entries(titleToPath).map((item) => (
                <ListItem
                  key={item[1]}
                  _hover={{ cursor: "pointer" }}
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

          <DrawerFooter background="white"></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default DrawerMenu;
