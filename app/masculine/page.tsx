import OfferCard from "@/components/OfferCard";
import RangePriceFilter from "@/components/ui/RangePriceFilter";
import { createClient } from "@/utils/supabase/server";
import { Box, Breadcrumb, Grid, Heading } from "@chakra-ui/react";

type Search = {
  minPrice?: string;
  maxPrice?: string;
};

export default async function MasculinePage({
  searchParams,
}: {
  searchParams: Search;
}) {
  const supabase = await createClient();
  const minPrice = Number(searchParams?.minPrice) || 0;
  const maxPrice = Number(searchParams?.maxPrice) || 50000;

  const { data: masculineOffers } = await supabase
    .from("all_offers")
    .select()
    .eq("gender", "masculine")
    .gte("price", minPrice)
    .lte("price", maxPrice);

  return (
    <main style={{ paddingTop: "18vh" }}>
      <Breadcrumb.Root size={"lg"} my={2}>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/masculine">
              Masculine Department
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <hr />
      <Box
        as={"section"}
        display={"flex"}
        width={"full"}
        justifyContent={"space-between"}
      >
        <Box display={"flex"} flexDirection={"column"} width={"15%"}>
          <Heading textAlign={"start"} fontWeight={"bold"} size={"xl"} py={4}>
            Filters
          </Heading>
          <RangePriceFilter minPrice={minPrice || 0} maxPrice={maxPrice || 0} />
        </Box>
        <Box display={"flex"} flexDirection={"column"} width={"80%"}>
          <Heading textAlign={"start"} fontWeight={"bold"} size={"4xl"} py={12}>
            Masculine Department
          </Heading>
          <Grid templateColumns="repeat(4, 1fr)" gap="6">
            {masculineOffers?.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </Grid>
        </Box>
      </Box>
    </main>
  );
}
