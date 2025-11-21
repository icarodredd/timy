import { Offer } from "@/app/page";
import { useCartStore } from "@/hooks/useCartStore";
import { createClient } from "@/utils/supabase/client";
import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import OfferCard from "../OfferCard";
import Link from "next/link";

const Cart = () => {
  const { offers } = useCartStore();
  const [cartData, setCartData] = useState<Offer[]>();
  const supabase = createClient();

  useEffect(() => {
    const fetchOffers = async () => {
      const promises = offers.map((offer) =>
        supabase.from("all_offers").select().eq("id", offer).single()
      );
      const results = await Promise.all(promises);
      setCartData(results.map((r) => r.data) as Offer[]);
    };

    fetchOffers();
  }, [offers]);

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="ghost" size="sm">
          <FaCartShopping />
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title textAlign={"center"} fontSize={"xl"}>
                Cart: ({offers.length})
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body className="flex flex-col gap-4">
              {cartData && cartData.length > 0
                ? cartData?.map((item) => (
                    <OfferCard
                      key={item.id}
                      offer={item}
                      bodyClassName="flex-none! justify-start!"
                    />
                  ))
                : "You don't have items on the cart..."}
            </Drawer.Body>
            <Drawer.Footer>
              <Button asChild variant={"outline"}>
                <Link href={"/checkout"}>Proceed to purchase</Link>
              </Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default Cart;
