import { Box, Field, HStack, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export default function ProfilePage() {
  return (
    <main style={{ paddingTop: "10vh" }}>
      <Box display={"flex"} width={"full"} justifyContent={"center"} py={10}>
        <HStack
          gap="10"
          width={{ base: "90%", md: "60%" }}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Field.Root required>
            <Field.Label>
              Name <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="George Smith" variant="subtle" />
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Email <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="me@example.com" variant="subtle" />
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Phone Number <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="+X (XXX) XXX-XXXX" variant="subtle" />
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Street Adress <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="+X (XXX) XXX-XXXX" variant="subtle" />
          </Field.Root>
          <Box
            display={"flex"}
            flexDirection={{ base: "column", sm: "row" }}
            gap={4}
          >
            <Field.Root required>
              <Field.Label>
                City <Field.RequiredIndicator />
              </Field.Label>
              <Input placeholder="City" variant="subtle" />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Region <Field.RequiredIndicator />
              </Field.Label>
              <Input placeholder="Region" variant="subtle" />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Postal Code <Field.RequiredIndicator />
              </Field.Label>
              <Input placeholder="+6315000" variant="subtle" />
            </Field.Root>
          </Box>
        </HStack>
      </Box>
    </main>
  );
}
