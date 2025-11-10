"use client";

import { Offer } from "@/app/page";
import { createClient } from "@/utils/supabase/client";
import { Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { use } from "react";
import { Text } from "@chakra-ui/react";
import { useCartStore } from "@/hooks/useCartStore";
import OfferRecomendations from "@/components/OfferRecomendations";

export default function OfferPage({
  params,
}: {
  params: Promise<{ offerId: string }>;
}) {
  const supabase = createClient();
  const { offerId } = use(params);
  const { addToCart } = useCartStore();
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

  return (
    <main style={{ paddingTop: "10vh" }}>
      {offer && (
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box display={"flex"} gap={"4"} justifyContent={"start"}>
            <Box display={"flex"} flexDir={"column"} gap={"4"}>
              {offer?.images.map((url, index) => (
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
          <Box display={"flex"} flexDir={"column"} width={"60%"}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Text
                textTransform={"uppercase"}
                fontSize={"2xl"}
                fontWeight={"bold"}
              >
                {offer.title}
              </Text>
              <Text fontSize={"xl"}>{offer.reviews.length} reviews</Text>
            </Box>

            <Text fontSize={"lg"}>{offer.description}</Text>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              ${offer.price.toFixed(2)}
            </Text>
            <Button size={"2xl"} onClick={() => addToCart(offer.id)}>
              Add to cart
            </Button>
          </Box>
        </Box>
      )}
      <OfferRecomendations offerId={offerId} />
    </main>
  );
}
