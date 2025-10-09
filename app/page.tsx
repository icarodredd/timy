import { CardHorizontal } from "@/components/CardHorizontal";
import MainCarouselOffers from "@/components/MainCarouselOffers";
import OffersCarousel from "@/components/OffersCarousel";
import { createClient } from "@/utils/supabase/server";
import { Box, Heading } from "@chakra-ui/react";

export interface Offer {
  id: number;
  created_at: string;
  title: string;
  description: string;
  image_url: string;
  stock: number;
  price: number;
}

export default async function Home() {
  const supabase = await createClient();

  const { data: mainBanners } = await supabase.from("main_banners").select();
  const { data: allOffers } = await supabase.from("all_offers").select();
  const { data: goldWatches } = await supabase.from("gold_watches").select();

  return (
    <main>
      <Box
        as={"section"}
        display={"flex"}
        flexDirection={"column"}
        width={"full"}
        justifyContent={"center"}
      >
        <MainCarouselOffers offers={mainBanners as Offer[]} />
        <Box as={"section"}>
          <Heading textAlign={"start"} fontWeight={"bold"} size={"4xl"} py={12}>
            All Watches
          </Heading>
          <OffersCarousel offers={allOffers as Offer[]} />
        </Box>
        <Heading textAlign={"start"} fontWeight={"bold"} size={"4xl"} py={12}>
          Gold Watches
        </Heading>
        <Box as={"section"}>
          <OffersCarousel offers={goldWatches as Offer[]} />
        </Box>
        <Box py={12} display={"flex"} justifyContent={"center"}>
          <CardHorizontal />
        </Box>
      </Box>
    </main>
  );
}
