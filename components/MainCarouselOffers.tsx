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
    <Box pt={"40"} className="embla" ref={emblaRef}>
      <div className="embla__container">
        {mainOffers.map((offer) => (
          <div key={offer.id} className="embla__slide">
            <Link href={"#"}>
              <Image
                className="w-full"
                src={offer.image_url}
                height={400}
                width={1400}
                alt={offer.title}
              />
            </Link>
          </div>
        ))}
      </div>
    </Box>
  );
}
