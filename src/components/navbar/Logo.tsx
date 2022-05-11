import { Box, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface LogoProps {}

export const Logo: React.FC<LogoProps> = ({}) => {
  const router = useRouter();
  return (
    <Link>
      <Box
        textColor={"#3182CE"}
        onClick={() => {
          router.push("/posts");
        }}
        fontWeight={800}
      >
        My Reddit
      </Box>
    </Link>
  );
};
