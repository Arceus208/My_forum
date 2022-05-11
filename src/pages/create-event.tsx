import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { NavBar } from "../components/navbar/NavBar";
import { SideNav } from "../components/navbar/SideNav";
import { UploadFile } from "../components/UploadFile";
import { Wrapper } from "../components/Wrapper";
import { useCreateEventMutation } from "../generated/graphql";
import { useIsAuth } from "../utils/isAuthHook";
import { toErrorMap } from "../utils/toErrorMap";

const CreateEvent: React.FC<{}> = ({}) => {
  const [createEventMut] = useCreateEventMutation();
  useIsAuth();
  return (
    <Box>
      <NavBar></NavBar>
      <Flex maxW={[300, 500, 700, 1500]} mx="auto" flexDirection="row" mt={10}>
        <SideNav></SideNav>
        <Box w={[300, 500, 700, 900]} boxShadow="xl" p={10} h="60vh">
          <Formik
            initialValues={{
              name: "",
              location: "",
              description: "",
              eventDate: "",
              eventTime: "",
              file: null,
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await createEventMut({
                variables: values,
              });
              if (response.data?.createEvent.errors) {
                setErrors(toErrorMap(response.data.createEvent.errors));
              }
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <InputField label="Event name" name="name"></InputField>
                <InputField label="Location" name="location"></InputField>
                <InputField
                  label="Description"
                  name="description"
                  textarea
                ></InputField>
                <UploadFile
                  label="Event Picture"
                  name="file"
                  setField={setFieldValue}
                ></UploadFile>
                <InputField
                  label="Date"
                  name="eventDate"
                  type="date"
                ></InputField>
                <InputField
                  label="Time"
                  name="eventTime"
                  type="time"
                ></InputField>
                <Flex flexDirection={"column"}>
                  <Button
                    type="submit"
                    mt={2}
                    mx="auto"
                    colorScheme="blue"
                    isLoading={isSubmitting}
                  >
                    Submit
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Box>
  );
};

export default CreateEvent;
