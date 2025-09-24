import Image from "next/image";
import timyLogo from "@/public/timy-logo.png";
import { Box, Button, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <Box
      position={"fixed"}
      insetX={0}
      top={0}
      zIndex={1}
      backdropFilter={"blur(8.7px)"}
      as={"header"}
      display={"flex"}
      justifyContent={"space-between"}
      py={8}
    >
      <Image src={timyLogo} alt="Timy Logo" width={200} height={200} />
      <Box display={"flex"} gap={10}>
        <ChakraLink asChild>
          <NextLink href="/best-offers">Best Offers</NextLink>
        </ChakraLink>
        <ChakraLink asChild>
          <NextLink href="/masculine">Masculine</NextLink>
        </ChakraLink>
        <ChakraLink asChild>
          <NextLink href="/feminine">Feminine</NextLink>
        </ChakraLink>
      </Box>
      <Box alignItems={"center"} display={"flex"} gap={6}>
        <Button variant={"ghost"} asChild>
          <a href="/cart">
            <FaCartShopping />
          </a>
        </Button>
        <Button variant={"ghost"} asChild>
          <a href="/profile">
            <FaUserCircle />
          </a>
        </Button>
      </Box>
    </Box>
  );
}
