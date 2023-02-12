import { useRef } from "react";
import { useRouter } from "next/router";
import DarkModeSwitch from "./DarkModeSwitch";
import { titleToPath, titleToIcon } from "../helpers/pathTitles";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  List,
  ListItem,
  Box,
  Image,
  HStack,
  Text,
  useDisclosure,
  useColorModeValue,
  VStack,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaHome } from "react-icons/fa";

function DrawerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const router = useRouter();
  const color = useColorModeValue("light.global.color", "dark.global.color");
  const background = useColorModeValue("light.global.bg", "dark.global.bg");
  const linkColor = useColorModeValue(
    "light.theme.primary",
    "dark.theme.primary"
  );

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
        color={color}
        background={background}
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
          <HamburgerIcon w={30} h={30} color={color} />
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
          <DrawerHeader background={background}></DrawerHeader>

          <DrawerBody background={background} fontWeight={500}>
            <List spacing={3}>
              <ListItem
                _hover={{ cursor: "pointer" }}
                onClick={() => {
                  router.push(`/`);
                  onClose();
                }}
              >
                <HStack>
                  <FaHome />
                  <Text>ΑΡΧΙΚΗ</Text>
                </HStack>
              </ListItem>
              {Object.entries(titleToPath).map((item) => (
                <ListItem
                  key={item[1]}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push(`/categories/${item[1]}`);
                    onClose();
                  }}
                >
                  <HStack>
                    {titleToIcon[item[0] as keyof typeof titleToIcon]}
                    <Text>{item[0]}</Text>
                  </HStack>
                </ListItem>
              ))}
            </List>
          </DrawerBody>
          <DrawerFooter background={background} justifyContent="flex-start">
            <VStack alignItems="flex-start">
              <Text>Developed by Stefanos Leventis</Text>
              <Text textDecor="underline" color={linkColor}>
                <Link href="mailto:s.leventis77@gmail.com">
                  s.leventis77@gmail.com
                </Link>
              </Text>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default DrawerMenu;
