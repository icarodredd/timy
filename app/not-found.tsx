import { Button, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        paddingTop: "10vh",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Text fontSize={"2xl"} fontWeight={"bold"}>
        404 - Page Not Found
      </Text>
      <Text>The page you are looking for does not exist.</Text>
      <Button asChild>
        <Link href="/">Go back to Home</Link>
      </Button>
    </main>
  );
}
