import MainCarouselOffers from "@/components/MainCarouselOffers";
import { createClient } from "@/utils/supabase/server";
import { Box } from "@chakra-ui/react";

export interface MainOffer {
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

  const { data: mainOffers } = await supabase.from("main_offers").select();

  return (
    <main>
      <Box
        as={"section"}
        display={"flex"}
        width={"full"}
        justifyContent={"center"}
      >
        <MainCarouselOffers mainOffers={mainOffers as MainOffer[]} />
      </Box>
    </main>
  );
}
