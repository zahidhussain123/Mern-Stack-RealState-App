import React, { useContext, useState } from "react";
import { Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMutation } from "react-query";
import UserDetailsContext from "../../context/UserDetailsContext";
import { bookingVisitDetails } from "../../utils/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const BookingModal = ({ opened, close, email, propertyId }) => {
   const {userDetails: {token}, setUserDetails} =  useContext(UserDetailsContext)
   const [value, setValue] = useState(null)

const getSuccessBook = () => {
    toast.success("You booked visit Successfully");
    setUserDetails(prev => ({
      ...prev,
      bookings: [
        ...(prev?.bookings || []),
        {
          id: propertyId,
          date: dayjs(value)?.format("DD/MM/YYYY")
        }
      ]
    })) 
  }
   const {mutate, isLoading} = useMutation({
    mutationFn: () => bookingVisitDetails(token, email, propertyId, value),
    onSuccess: () => getSuccessBook(),
    // onError: ({ response }) => toast.error(response?.data?.message),
    onSettled: () => close()
  });
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Select your date of visit"
      centered
      radius={0}
      transitionProps={{ transition: 'fade', duration: 200 }}
    >
      <div className="flexColCenter" style={{ gap: "1rem" }}>
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <Button disabled={!value || isLoading} onClick={ () => {
             mutate();
        }}>
          Book visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
