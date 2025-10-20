"use client";

import { Container, HStack, Icon, Link, Stack } from "@chakra-ui/react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Copyright } from "./ui/copyright";
import useThemeDetector from "@/hooks/useThemeDetector";
import whiteTimyLogo from "@/public/timy-logo-white.png";
import darkTimyLogo from "@/public/timy-logo-dark.png";
import Image from "next/image";

export default function Footer() {
  const isDarkMode = useThemeDetector();
  return (
    <Container as="footer" py={{ base: "10", md: "12" }}>
      <Stack gap="6">
        <Stack direction="row" justify="space-between" align="center">
          <Link href={"/"}>
            <Image
              src={isDarkMode ? whiteTimyLogo : darkTimyLogo}
              alt="Timy Logo"
              width={200}
              height={200}
              style={{ width: "30vw", height: "auto", maxWidth: "200px" }}
            />
          </Link>
          <HStack gap="4">
            {socialLinks.map(({ href, icon }, index) => (
              <Link key={index} href={href} colorPalette="gray">
                <Icon size="md">{icon}</Icon>
              </Link>
            ))}
          </HStack>
        </Stack>
        <Copyright />
      </Stack>
    </Container>
  );
}
const socialLinks = [
  { href: "https://github.com/icarodredd", icon: <SiGithub /> },
  { href: "https://www.linkedin.com/icarodredd", icon: <SiLinkedin /> },
];
