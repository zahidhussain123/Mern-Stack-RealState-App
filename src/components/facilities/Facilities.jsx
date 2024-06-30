import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import { createRESIDENCY } from "../../utils/api";
import UserDetailsContext from "../../context/UserDetailsContext";
import { useProperties } from "../../hooks/useProperties";
import { toast } from "react-toastify";

const Facilities = ({
  setActive,
  opened,
  close,
  propertyDetails,
  setPropertyDetails,
  prevStep,
}) => {
  const { user } = useAuth0();
  const { refetch: refetchProperties } = useProperties();
  const {
    userDetails: { token },
  } = useContext(UserDetailsContext);
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities.bedrooms,
      parkings: propertyDetails.facilities.parkings,
      bathrooms: propertyDetails.facilities.bathrooms,
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Must have atleast one room" : null),
      bathrooms: (value) =>
        value < 1 ? "Must have atleast one bathroom" : null,
    },
  });
  const { bedrooms, parkings, bathrooms } = form.values;
  // console.log("rest op", ...propertyDetails)
  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createRESIDENCY(
        {
          ...propertyDetails,
          facilities: { bedrooms, parkings, bathrooms },
        },
        token
      ),
    onSuccess: () => {
      toast.success("residency added Successfully", {
        position: "bottom-right",
      });
    },
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        facilities: {
          bedrooms: 0,
          parkings: 0,
          bathrooms: 0,
        },
        userEmail: user?.email,
      });
      close();
      setActive(0);
      refetchProperties();
    },
  });

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { bedrooms, parkings, bathrooms },
      }));
      mutate();
    }
  };

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <NumberInput
          withAsterisk
          label="No of Bedrooms"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          label="No of Parkings"
          min={0}
          {...form.getInputProps("parkings")}
        />
        <NumberInput
          withAsterisk
          label="No of Bathrooms"
          min={0}
          {...form.getInputProps("bathrooms")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" color="green" disabled={isLoading}>
            {isLoading ? "Submitting" : "Add Property"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
