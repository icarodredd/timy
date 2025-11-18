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
  const [mainImage, setMainImage] = useState<string>("");

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
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          gap={{
            base: "20px",
            md: "10px",
          }}
          flexDir={{ base: "column", md: "row" }}
        >
          <Box display={"flex"} gap={"4"} justifyContent={"start"}>
            <Box display={"flex"} flexDir={"column"} gap={"4"}>
              {offer?.images?.map((url, index) => (
                <Image
                  onClick={() => setMainImage(url)}
                  onMouseEnter={() => setMainImage(url)}
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
              className="rounded-lg h-fit! max-lg:max-w-8/12!"
              src={mainImage || offer.images[0]}
              alt={offer.title}
              width={500}
              height={500}
            />
          </Box>
          <Box
            display={"flex"}
            flexDir={"column"}
            width={{ base: "100%", md: "60%" }}
            gap={4}
          >
            <Box
              display={"flex"}
              justifyContent={{ base: "space-evenly", md: "space-between" }}
            >
              <Text
                textTransform={"uppercase"}
                fontSize={"2xl"}
                fontWeight={"bold"}
              >
                {offer.title}
              </Text>
              <Box fontSize={"xl"}>
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
              </Box>
            </Box>

            <Text textAlign={{ mdDown: "center" }} fontSize={"lg"}>
              {offer.description}
            </Text>
            <Text
              textAlign={{ mdDown: "center" }}
              fontSize={"4xl"}
              fontWeight={"bold"}
            >
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
