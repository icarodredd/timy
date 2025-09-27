"use client";

import Image from "next/image";
import whiteTimyLogo from "@/public/timy-logo-white.png";
import darkTimyLogo from "@/public/timy-logo-dark.png";
import { Box, Button, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import useThemeDetector from "@/app/hooks/useThemeDetector";
import { useTheme } from "next-themes";

export default function Header() {
  const isDarkMode = useThemeDetector();
  const {} = useTheme();

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
      py={2}
      px={6}
    >
      <Image
        src={isDarkMode ? whiteTimyLogo : darkTimyLogo}
        alt="Timy Logo"
        width={200}
        height={200}
        style={{ width: "30vw", height: "auto", maxWidth: "200px" }}
      />
      <Box display={{ mdDown: "none", md: "flex" }} gap={10}>
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
      <Box alignItems={"center"} display={"flex"}>
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
