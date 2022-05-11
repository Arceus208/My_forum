import React, { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Image,
  Button,
} from "@chakra-ui/react";

type UploadFileProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  setField: any;
  isProfile?: boolean;
};

export const UploadFile: React.FC<UploadFileProps> = ({
  label,
  size: _,
  setField,
  isProfile,
  ...props
}) => {
  const [field, { error }] = useField(props);
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as any);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        {...field}
        {...props}
        value={undefined}
        type="file"
        id={field.name}
        onChange={(e) => {
          let pickedFile;
          if (e.target.files && e.target.files.length === 1) {
            pickedFile = e.target.files[0];
            setFile(pickedFile);
            setField("file", e.target.files[0]);
          }
        }}
        display="none"
        ref={inputRef}
      />
      <Button
        onClick={() => {
          if (inputRef.current) {
            inputRef!.current.click();
          }
        }}
        mb={3}
      >
        Choose an image
      </Button>
      <div>
        {!previewUrl && <p>Please pick an image</p>}
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Preview"
            borderRadius={isProfile ? "full" : 0}
            w={isProfile ? 150 : 200}
            h={150}
            objectFit="cover"
          />
        )}
      </div>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
