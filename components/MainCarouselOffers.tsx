"use client";

import { MainOffer } from "@/app/page";
import { Box } from "@chakra-ui/react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";

export default function MainCarouselOffers({
  mainOffers,
}: {
  mainOffers: MainOffer[];
}) {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  return (
    <Box pt={"18vh"} className="embla" ref={emblaRef}>
      <div className="embla__container">
        {mainOffers.map((offer) => (
          <Box
            key={offer.id}
            className="embla__slide"
            w="100vw"
            h="60vh"
            overflow="hidden"
          >
            <Link className="w-full" href={"#"}>
              <Image
                src={offer.image_url}
                height={400}
                width={1400}
                alt={offer.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            </Link>
          </Box>
        ))}
      </div>
    </Box>
  );
}
