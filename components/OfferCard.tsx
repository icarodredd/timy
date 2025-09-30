import { Offer } from "@/app/page";
import { Button, Card, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function OfferCard({ offer }: { offer: Offer }) {
  return (
    <Link className="w-full h-full" href={"#"}>
      <Card.Root maxW="sm" height={"100%"} border={"none"} overflow="hidden">
        <Image
          backgroundColor={"white"}
          padding={"40px"}
          src={offer.image_url}
          alt={offer.title}
        />
        <Card.Body justifyContent={"space-around"} gap="2">
          <Card.Title>{offer.title}</Card.Title>
          <Card.Description>{offer.description}</Card.Description>
          <Text
            textStyle="2xl"
            fontWeight="medium"
            letterSpacing="tight"
            mt="2"
          >
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(offer.price)}
          </Text>
        </Card.Body>
        <Card.Footer gap="2">
          <Button variant="solid">Buy now</Button>
          <Button variant="ghost">Add to cart</Button>
        </Card.Footer>
      </Card.Root>
    </Link>
  );
}
