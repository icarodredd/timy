import OfferCard from "@/components/OfferCard";
import EmptyMessage from "@/components/ui/EmptyMessage";
import RangePriceFilter from "@/components/ui/RangePriceFilter";
import { createClient } from "@/utils/supabase/server";
import { Box, Breadcrumb, Grid, Heading } from "@chakra-ui/react";
import { Offer } from "../page";

type Search = {
  minPrice?: string;
  maxPrice?: string;
};

export default async function FemininePage(props: {
  searchParams: Promise<Search>;
}) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  const minPrice = Number(await searchParams?.minPrice) || 0;
  const maxPrice = Number(await searchParams?.maxPrice) || 50000;

  const { data } = await supabase
    .from("all_offers")
    .select()
    .eq("gender", "feminine")
    .gte("price", minPrice)
    .lte("price", maxPrice);

  const feminineOffers = data as Offer[];

  return (
    <main style={{ paddingTop: "10vh" }}>
      <Breadcrumb.Root size={"lg"} my={2}>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/feminine">
              Feminine Department
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
        flexDirection={{ lgDown: "column" }}
      >
        <Box display={"flex"} flexDirection={"column"} width={{ lg: "15%" }}>
          <Heading textAlign={"start"} fontWeight={"bold"} size={"xl"} py={4}>
            Filters
          </Heading>
          <RangePriceFilter minPrice={minPrice || 0} maxPrice={maxPrice || 0} />
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={{ md: "100%", lg: "80%" }}
        >
          <Heading textAlign={"start"} fontWeight={"bold"} size={"4xl"} py={12}>
            Feminine Department
          </Heading>
          {feminineOffers.length > 0 ? (
            <Grid
              templateColumns={{ md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
            >
              {feminineOffers?.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </Grid>
          ) : (
            <EmptyMessage />
          )}
        </Box>
      </Box>
    </main>
  );
}
