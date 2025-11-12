"use client";
import { Offer } from "@/app/page";
import { createClient } from "@/utils/supabase/client";
import { Avatar, Box, RatingGroup, Text } from "@chakra-ui/react";
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
    <Box display={"flex"} flexDir={"column"} gap={10} mt={20}>
      <Text fontSize={"2xl"} fontWeight={"bold"}>
        Reviews
      </Text>
      {offer?.reviews &&
        offer.reviews.map((review, index) => (
          <Box
            key={index}
            display={"flex"}
            width={"fit"}
            gap={4}
            justifyContent={"space-between"}
          >
            <Avatar.Root>
              <Avatar.Fallback name={review.author} />
            </Avatar.Root>
            <Box display={"flex"} flexDir={"column"}>
              <Box display={"flex"} gap={8}>
                <Text fontWeight={"bold"} fontSize={"sm"}>
                  {review.author}
                </Text>
                <Text fontSize={"sm"}>{review.date}</Text>
              </Box>

              <RatingGroup.Root
                count={5}
                defaultValue={review.rating}
                readOnly
                size="sm"
              >
                <RatingGroup.HiddenInput />
                <RatingGroup.Control />
              </RatingGroup.Root>
              <Text fontSize={"sm"}>{review.text}</Text>
            </Box>
          </Box>
        ))}
    </Box>
  );
}
