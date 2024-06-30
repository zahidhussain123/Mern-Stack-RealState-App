import { Button, Container, Group, Modal, Stepper } from "@mantine/core";
import React, { useState } from "react";
import AddLocation from "../addLocation/AddLocation";
import { useAuth0 } from "@auth0/auth0-react";
import UploadImage from "../uploadImage/UploadImage";
import BasicDetails from "../basicDetails/BasicDetails";
import Facilities from "../facilities/Facilities";
import { checkNull } from "../../utils/common";

const AddPropertyModel = ({ opened, close }) => {
  const { user } = useAuth0();
  const [active, setActive] = useState(0);
  console.log("user email", user)
  const nextStep = () =>
    setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const [propertyDetails, setPropertyDetails] = useState({
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
    userEmail: !checkNull(user?.email) ? user?.email : "",
  });
  return (
    <Modal opened={opened} onClose={close} size={"90rem"}>
      <Container h={"40rem"} w={"100%"}>
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="Location" description="Address">
            <AddLocation
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
              nextStep={nextStep}
            />
          </Stepper.Step>
          <Stepper.Step label="Images" description="Upload">
            <UploadImage
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          </Stepper.Step>
          <Stepper.Step label="Basics" description="Details">
            <BasicDetails
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          </Stepper.Step>
          <Stepper.Completed>
            <Facilities
              setActive={setActive}
              opened={opened}
              close={close}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
              prevStep={prevStep}
            />
          </Stepper.Completed>
        </Stepper>
      </Container>

      {/* <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group> */}
    </Modal>
  );
};

export default AddPropertyModel;
