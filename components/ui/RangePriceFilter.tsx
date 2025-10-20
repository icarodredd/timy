"use client";

import { useEffect, useState } from "react";
import { Slider } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function RangePriceFilter({
  minPrice,
  maxPrice,
}: {
  minPrice: number;
  maxPrice: number;
}) {
  const router = useRouter();
  const [value, setValue] = useState<[number, number]>([minPrice, maxPrice]);

  useEffect(() => {
    setValue([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      params.set("minPrice", String(value[0]));
      params.set("maxPrice", String(value[1]));
      router.replace(`?${params.toString()}`, { scroll: false });
    }, 250);
    return () => clearTimeout(t);
  }, [value, router]);

  return (
    <Slider.Root
      value={value}
      onValueChange={(e) => setValue(e.value as [number, number])}
      maxW="md"
      max={1000}
      minStepsBetweenThumbs={8}
    >
      <Slider.Label>Price</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} />
        <Slider.Thumb index={1} />
      </Slider.Control>
    </Slider.Root>
  );
}
