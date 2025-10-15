import { Box, Button, Card, Image } from "@chakra-ui/react";
import Link from "next/link";

export const CardHorizontal = () => (
  <Card.Root
    flexDirection="row"
    overflow="hidden"
    minW={{ base: "90vw", sm: "30vw" }}
  >
    <Image
      objectFit="cover"
      maxW="300px"
      minW={"70px"}
      src="./warranty-watch.jpg"
      alt="A omega watch"
    />
    <Box>
      <Card.Body>
        <Card.Title fontSize={"2xl"} mb="2">
          Authenticity. Warranty. Never Pay Retail.
        </Card.Title>
        <Card.Description py={6} fontSize={"md"}>
          All products are 100% authentic guaranteed.
          <br />
          We purchase our inventory via authorized dealers or respected industry
          wholesalers/distributors.
          <br />
          Buy what you love at a price you love even more.
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Link href={"/all"}>
          <Button size={"xl"}>Buy Watches</Button>
        </Link>
      </Card.Footer>
    </Box>
  </Card.Root>
);
