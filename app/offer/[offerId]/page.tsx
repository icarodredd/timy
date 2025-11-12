"use client";

import { Offer, Review } from "@/app/page";
import { createClient } from "@/utils/supabase/client";
import { Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { use } from "react";
import { Text } from "@chakra-ui/react";
import { useCartStore } from "@/hooks/useCartStore";
import OfferRecomendations from "@/components/OfferRecomendations";
import OfferReviews from "@/components/OfferReviews";
import { RatingGroup } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";

export default function OfferPage({
  params,
}: {
  params: Promise<{ offerId: string }>;
}) {
  const supabase = createClient();
  const { offerId } = use(params);
  const { addToCart, offers, removeFromCart } = useCartStore();
  const [offer, setOffer] = useState<Offer>();

  useEffect(() => {
    const fetchOffer = async () => {
      const { data } = await supabase
        .from("all_offers")
        .select()
        .eq("id", offerId)
        .single();
      setOffer(data as Offer);
    };

    fetchOffer();
  }, []);

  const getMedianRating = (reviews: Review[]) => {
    return (
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    );
  };

  return (
    <main style={{ paddingTop: "10vh" }}>
      {offer && (
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box display={"flex"} gap={"4"} justifyContent={"start"}>
            <Box display={"flex"} flexDir={"column"} gap={"4"}>
              {offer?.images?.map((url, index) => (
                <Image
                  key={index}
                  className="rounded-lg"
                  src={url}
                  alt={offer.title}
                  width={100}
                  height={100}
                />
              ))}
            </Box>
            <Image
              className="rounded-lg"
              src={offer.image_url}
              alt={offer.title}
              width={500}
              height={500}
            />
          </Box>
          <Box display={"flex"} flexDir={"column"} width={"60%"} gap={4}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Text
                textTransform={"uppercase"}
                fontSize={"2xl"}
                fontWeight={"bold"}
              >
                {offer.title}
              </Text>
              <Text fontSize={"xl"}>
                <RatingGroup.Root
                  count={5}
                  defaultValue={getMedianRating(offer.reviews)}
                  readOnly
                  size="sm"
                >
                  <RatingGroup.HiddenInput />
                  <RatingGroup.Control />
                </RatingGroup.Root>{" "}
                {offer.reviews.length} reviews
              </Text>
            </Box>

            <Text fontSize={"lg"}>{offer.description}</Text>
            <Text fontSize={"4xl"} fontWeight={"bold"}>
              ${offer.price.toFixed(2)}
            </Text>
            <Text my={5} fontWeight={"bold"} textAlign={"center"}>
              • Enjoy free shipping!
            </Text>
            {offers.includes(offer.id) ? (
              <Button size={"2xl"} onClick={() => removeFromCart(offer.id)}>
                Remove from cart
              </Button>
            ) : (
              <Button size={"2xl"} onClick={() => addToCart(offer.id)}>
                Add to cart
              </Button>
            )}
            <Text textAlign={"center"} my={10}>
              <Icon size={"2xl"}>
                <MdLocalShipping />
              </Icon>{" "}
              Ships In 2 - 3 Weeks
            </Text>
          </Box>
        </Box>
      )}
      <OfferRecomendations offerId={offerId} />
      <OfferReviews offerId={offerId} />
    </main>
  );
}
