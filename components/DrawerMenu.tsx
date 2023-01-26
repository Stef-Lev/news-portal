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
import { useRef } from "react";
import { titleToPath } from "../helpers/pathTitles";
import { useRouter } from "next/router";

function DrawerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const router = useRouter();

  return (
    <Box>
      <Box
        position="fixed"
        top={0}
        bg="blue.900"
        w="100%"
        zIndex={200}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton ref={btnRef} colorScheme="white" onClick={onOpen}>
          <HamburgerIcon w={30} h={30} color="text.light" />
        </IconButton>
        <Box py="10px">
          <Image
            alt="news logo"
            src="/news.png"
            borderRadius="10px"
            w="120px"
            css={{ filter: "hue-rotate(-60deg)" }}
            onClick={() => router.push("/")}
          />
        </Box>

        <IconButton
          aria-label="ghost"
          colorScheme="white"
          onClick={onOpen}
          visibility="hidden"
        >
          <HamburgerIcon w={30} h={30} color="text.light" />
        </IconButton>
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
          <DrawerHeader background="blue.800"></DrawerHeader>

          <DrawerBody background="blue.800" fontWeight={500}>
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

          <DrawerFooter background="blue.800"></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default DrawerMenu;
