"use client";

import { Offer } from "@/app/page";
import { useCartStore } from "@/hooks/useCartStore";
import { Box, Button, Card, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function OfferCard({
  offer,
  bodyClassName,
}: {
  offer: Offer;
  bodyClassName?: string;
}) {
  const { addToCart, removeFromCart, offers } = useCartStore();
  return (
    <Box className={`w-full h-full`}>
      <Card.Root maxW="sm" height={"100%"} border={"none"} overflow="hidden">
        <Link href={`/offer/${offer.id}`}>
          <Image
            backgroundColor={"white"}
            padding={"40px"}
            src={offer.image_url}
            alt={offer.title}
          />
        </Link>
        <Card.Body
          className={bodyClassName}
          justifyContent={"space-around"}
          gap="2"
        >
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
          {offers.includes(offer.id) ? (
            <Button onClick={() => removeFromCart(offer.id)}>
              Remove from cart
            </Button>
          ) : (
            <Button onClick={() => addToCart(offer.id)}>Add to cart</Button>
          )}
        </Card.Footer>
      </Card.Root>
    </Box>
  );
}
