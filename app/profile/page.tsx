"use client";

import { useProfileStore } from "@/hooks/useProfileStore";
import {
  Box,
  Button,
  Field,
  HStack,
  Input,
  Portal,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";

export interface ProfileFormValues {
  name: string;
  email: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
}

const regions = createListCollection({
  items: [
    { label: "Alabama", value: "AL" },
    { label: "Alaska", value: "AK" },
    { label: "Arizona", value: "AZ" },
    { label: "Arkansas", value: "AR" },
    { label: "California", value: "CA" },
    { label: "Colorado", value: "CO" },
    { label: "Connecticut", value: "CT" },
    { label: "Delaware", value: "DE" },
    { label: "Florida", value: "FL" },
    { label: "Georgia", value: "GA" },
    { label: "Hawaii", value: "HI" },
    { label: "Idaho", value: "ID" },
    { label: "Illinois", value: "IL" },
    { label: "Indiana", value: "IN" },
    { label: "Iowa", value: "IA" },
    { label: "Kansas", value: "KS" },
    { label: "Kentucky", value: "KY" },
    { label: "Louisiana", value: "LA" },
    { label: "Maine", value: "ME" },
    { label: "Maryland", value: "MD" },
    { label: "Massachusetts", value: "MA" },
    { label: "Michigan", value: "MI" },
    { label: "Minnesota", value: "MN" },
    { label: "Mississippi", value: "MS" },
    { label: "Missouri", value: "MO" },
    { label: "Montana", value: "MT" },
    { label: "Nebraska", value: "NE" },
    { label: "Nevada", value: "NV" },
    { label: "New Hampshire", value: "NH" },
    { label: "New Jersey", value: "NJ" },
    { label: "New Mexico", value: "NM" },
    { label: "New York", value: "NY" },
    { label: "North Carolina", value: "NC" },
    { label: "North Dakota", value: "ND" },
    { label: "Ohio", value: "OH" },
    { label: "Oklahoma", value: "OK" },
    { label: "Oregon", value: "OR" },
    { label: "Pennsylvania", value: "PA" },
    { label: "Rhode Island", value: "RI" },
    { label: "South Carolina", value: "SC" },
    { label: "South Dakota", value: "SD" },
    { label: "Tennessee", value: "TN" },
    { label: "Texas", value: "TX" },
    { label: "Utah", value: "UT" },
    { label: "Vermont", value: "VT" },
    { label: "Virginia", value: "VA" },
    { label: "Washington", value: "WA" },
    { label: "West Virginia", value: "WV" },
    { label: "Wisconsin", value: "WI" },
    { label: "Wyoming", value: "WY" },
    { label: "District of Columbia", value: "DC" },
  ],
});

export default function ProfilePage() {
  const { profile, addValues } = useProfileStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({ defaultValues: profile });

  const onSubmit = handleSubmit((profileValues) => addValues(profileValues));

  return (
    <main style={{ paddingTop: "10vh" }}>
      <Box
        onSubmit={onSubmit}
        as={"form"}
        display={"flex"}
        width={"full"}
        justifyContent={"center"}
        py={10}
      >
        <HStack
          gap="6"
          width={{ base: "90%", md: "40%" }}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Field.Root required invalid={!!errors.name}>
            <Field.Label>
              Name <Field.RequiredIndicator />
            </Field.Label>
            <Input
              defaultValue={profile.name}
              {...register("name", {
                maxLength: 50,
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Name can only contain letters and spaces",
                },
              })}
              placeholder="George Smith"
              variant="subtle"
            />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root required invalid={!!errors.email}>
            <Field.Label>
              Email <Field.RequiredIndicator />
            </Field.Label>
            <Input
              defaultValue={profile.email}
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="me@example.com"
              variant="subtle"
            />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root required invalid={!!errors.phoneNumber}>
            <Field.Label>
              Phone Number <Field.RequiredIndicator />
            </Field.Label>
            <Input
              defaultValue={profile.phoneNumber}
              {...register("phoneNumber", {
                pattern: {
                  value: /^\d{11}$/,
                  message: "Enter a valid phone number",
                },
              })}
              placeholder="+X (XXX) XXX-XXXX"
              variant="subtle"
            />
            <Field.ErrorText>{errors.phoneNumber?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root required invalid={!!errors.streetAddress}>
            <Field.Label>
              Street Adress <Field.RequiredIndicator />
            </Field.Label>
            <Input
              defaultValue={profile.phoneNumber}
              {...register("streetAddress", {
                pattern: {
                  value: /^[a-zA-Z0-9\s.,]+$/,
                  message: "Enter a valid street address",
                },
              })}
              placeholder="8590 State Street East
Olney, MD 20832"
              variant="subtle"
            />
            <Field.ErrorText>{errors.streetAddress?.message}</Field.ErrorText>
          </Field.Root>
          <Box
            display={"flex"}
            flexDirection={{ base: "column", sm: "row" }}
            gap={4}
          >
            <Field.Root required invalid={!!errors.city}>
              <Field.Label>
                City <Field.RequiredIndicator />
              </Field.Label>
              <Input
                defaultValue={profile.city}
                {...register("city", {
                  maxLength: 50,
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "City can only contain letters and spaces",
                  },
                })}
                placeholder="City"
                variant="subtle"
              />
              <Field.ErrorText>{errors.city?.message}</Field.ErrorText>
            </Field.Root>
            <Select.Root required collection={regions} variant={"subtle"}>
              <Select.HiddenSelect {...register("state")} />
              <Select.Label>Select state</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select state" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {regions.items.map((state) => (
                      <Select.Item item={state} key={state.value}>
                        {state.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
            <Field.Root required invalid={!!errors.postalCode}>
              <Field.Label>
                Postal Code <Field.RequiredIndicator />
              </Field.Label>
              <Input
                defaultValue={profile.postalCode}
                {...register("postalCode", {
                  pattern: {
                    value: /^\d{5}$/,
                    message: "Enter a valid postal code",
                  },
                })}
                placeholder="12345"
                variant="subtle"
              />
              <Field.ErrorText>{errors.postalCode?.message}</Field.ErrorText>
            </Field.Root>
          </Box>
          <Button type="submit" size={"xl"}>
            Save
          </Button>
        </HStack>
      </Box>
    </main>
  );
}
