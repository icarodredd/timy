import OfferCard from "@/components/OfferCard";
import RangePriceFilter from "@/components/ui/RangePriceFilter";
import { createClient } from "@/utils/supabase/server";
import { Box, Breadcrumb, Em, Grid, Heading } from "@chakra-ui/react";
import { Offer } from "../page";
import EmptyMessage from "@/components/ui/EmptyMessage";

type Search = {
  minPrice?: string;
  maxPrice?: string;
};

export default async function MasculinePage(props: {
  searchParams: Promise<Search>;
}) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  const minPrice = Number(searchParams?.minPrice) || 0;
  const maxPrice = Number(searchParams?.maxPrice) || 50000;

  const { data } = await supabase
    .from("all_offers")
    .select()
    .eq("gender", "masculine")
    .gte("price", minPrice)
    .lte("price", maxPrice);

  const masculineOffers = data as Offer[];

  return (
    <main style={{ paddingTop: "10vh" }}>
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
        flexDirection={{ lgDown: "column" }}
      >
        <Box display={"flex"} flexDirection={"column"} width={{ lg: "15%" }}>
          <Heading textAlign={"start"} fontWeight={"bold"} size={"xl"} py={4}>
            Filters
          </Heading>
          <RangePriceFilter minPrice={0} maxPrice={100000} />
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={{ md: "100%", lg: "80%" }}
          justifyContent={"center"}
        >
          <Heading textAlign={"start"} fontWeight={"bold"} size={"4xl"} py={12}>
            Masculine Department
          </Heading>
          {masculineOffers.length > 0 ? (
            <Grid
              templateColumns={{ md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
              gap="6"
            >
              {masculineOffers?.map((offer) => (
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
