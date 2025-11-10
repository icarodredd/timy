"use client";
import { Offer, Review } from "@/app/page";
import { createClient } from "@/utils/supabase/client";
import { Avatar, AvatarGroup, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function OfferReviews({ offerId }: { offerId: string }) {
  const supabase = createClient();
  const [offer, setOffer] = useState<Offer>();

  useEffect(() => {
    const fetchRecomendations = async () => {
      const { data } = await supabase
        .from("all_offers")
        .select()
        .eq("id", offerId)
        .single();

      setOffer(data as Offer);
    };

    fetchRecomendations();
  }, []);

  return (
    <Box display={"flex"} flexDir={"column"} gap={50} mt={20}>
      <Text fontSize={"2xl"} fontWeight={"bold"} my={2}>
        Reviews
      </Text>
      {offer?.reviews &&
        offer.reviews.map((review, index) => (
          <Avatar.Root key={index}>
            <Avatar.Fallback name={review.author} />
          </Avatar.Root>
        ))}
    </Box>
  );
}
