"use client";

import { Offer } from "@/app/page";
import { Box } from "@chakra-ui/react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";

export default function MainCarouselOffers({ offers }: { offers: Offer[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  return (
    <Box pt={"10vh"} className="embla_main" ref={emblaRef}>
      <div className="embla__container_main">
        {offers.map((offer) => (
          <Box
            key={offer.id}
            className="embla__slide_main"
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
