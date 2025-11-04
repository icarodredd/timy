"use client";

import Image from "next/image";
import whiteTimyLogo from "@/public/timy-logo-white.png";
import darkTimyLogo from "@/public/timy-logo-dark.png";
import {
  Box,
  Link as ChakraLink,
  Button,
  Menu,
  Portal,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaUserCircle } from "react-icons/fa";
import useThemeDetector from "@/hooks/useThemeDetector";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import Cart from "./ui/Cart";

export default function Header() {
  const isDarkMode = useThemeDetector();

  return (
    <Box
      position={"fixed"}
      insetX={0}
      top={0}
      zIndex={100}
      backdropFilter={"blur(8.7px)"}
      as={"header"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      py={2}
      px={2}
    >
      <Box display={"flex"} alignItems={"center"}>
        <Box display={{ mdDown: "flex", md: "none" }}>
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant="ghost" size="md">
                <IoMenu />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item asChild value="all-offers">
                    <Link href={"/all-offers"}>All Offers</Link>
                  </Menu.Item>
                  <Menu.Item asChild value="Feminine">
                    <Link href={"/feminine"}>Feminine</Link>
                  </Menu.Item>
                  <Menu.Item asChild value="masculine">
                    <Link href={"/masculine"}>Masculine</Link>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Box>
        <Link href={"/"}>
          <Image
            src={isDarkMode ? whiteTimyLogo : darkTimyLogo}
            alt="Timy Logo"
            width={200}
            height={200}
            style={{ width: "30vw", height: "auto", maxWidth: "200px" }}
          />
        </Link>
      </Box>
      <Box display={{ mdDown: "none", md: "flex" }} gap={10}>
        <ChakraLink asChild>
          <NextLink href="/masculine">Masculine</NextLink>
        </ChakraLink>
        <ChakraLink asChild>
          <NextLink href="/feminine">Feminine</NextLink>
        </ChakraLink>
      </Box>
      <Box alignItems={"center"} display={"flex"}>
        <Cart />
        <Button variant={"ghost"} asChild>
          <a href="/profile">
            <FaUserCircle />
          </a>
        </Button>
      </Box>
    </Box>
  );
}
