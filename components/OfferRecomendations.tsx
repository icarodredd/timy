import { Box, Text } from "@chakra-ui/react";
import OffersCarousel from "./OffersCarousel";
import { createClient } from "@/utils/supabase/client";
import { Offer } from "@/app/page";
import { useEffect, useState } from "react";

export default function OfferRecomendations({ offerId }: { offerId: string }) {
  const supabase = createClient();
  const [allOffersFiltered, setAllOffersFiltered] = useState<Offer[]>();

  useEffect(() => {
    const fetchRecomendations = async () => {
      const { data: offersFiltered } = await supabase
        .from("all_offers")
        .select()
        .neq("id", offerId);

      setAllOffersFiltered(offersFiltered as Offer[]);
    };

    fetchRecomendations();
  }, []);

  return (
    <Box as={"section"}>
      <Text fontSize={"xl"} fontWeight={"bold"} my={2}>
        You may also like
      </Text>
      {/*  <OffersCarousel offers={allOffersFiltered as Offer[]} /> */}
    </Box>
  );
}
