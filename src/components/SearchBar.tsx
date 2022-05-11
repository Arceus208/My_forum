import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useRouter } from "next/router";

interface SearchBarProps {
  page: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ page }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (inputRef.current) {
      const searchText = inputRef.current.value;
      router.push(`/${page}?search=` + searchText);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input type="text" placeholder="Search" ref={inputRef} />
      </InputGroup>
    </form>
  );
};
