import React, { useContext, useState } from "react";
import "./singleProperty.css";
import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { cancelBooking, getSingleProperty } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import Favourite from "../../components/favourite/Favourite";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import Map from "../../components/map/Map";
import useAuthCheck from "../../hooks/useAuthCheck";
import BookingModal from "../../components/bookingModal/BookingModal";
import { useAuth0 } from "@auth0/auth0-react";
import { useDisclosure } from '@mantine/hooks';
import UserDetailsContext from "../../context/UserDetailsContext";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";

const SingleProperty = () => {
  const location = useLocation();
  const id = location.pathname?.split("/").pop();
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isError, isLoading } = useQuery(["singleResd", id], () =>
    getSingleProperty(id)
  );
  const { user } = useAuth0()
  const { validateLogin } = useAuthCheck();
  const {userDetails: {bookings, token}, setUserDetails} = useContext(UserDetailsContext)
  // const [modalOpened, setModalOpened] = useState(false);
  const getCancelBook = () => {
    toast.success("Booking Cancelled successfully",{ position: "bottom-right" })
    setUserDetails(prev => ({
      ...prev,
      bookings: prev.bookings.filter((visit) => visit?.id !== id)
    })) 
  }
  const {mutate, isLoading: cancelling} = useMutation({
    mutationFn: () => cancelBooking(id, user?.email, token),
    onSuccess: () => getCancelBook()
  })

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader
            width="80"
            height="80"
            radius={1}
            color="#4066ff"
            aria-label="puff-loading"
          />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }
  return (
    <div className="wrapper" >
      <div className="flexColStart paddings innerWidth property-container">
        <div className="like">
          <Favourite id={id} />
        </div>
        <img src={data?.residency?.image} alt="home image" />

        <div className="flexCenter property-details">
          {/* left */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.residency?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data?.residency?.price}
              </span>
            </div>

            {/* facilities */}
            <div className="flexStart facilities">
              {/* bathrooms */}
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.residency?.facilities?.bathrooms} Bathrooms</span>
              </div>

              {/* parkings */}
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.residency?.facilities.parkings} Parking</span>
              </div>

              {/* rooms */}
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.residency?.facilities.bedrooms} Room/s</span>
              </div>
            </div>

            {/* description */}

            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.residency?.description}
            </span>

            {/* address */}

            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.residency?.address} {data?.residency?.city}{" "}
                {data?.residency?.country}
              </span>
            </div>
            {bookings?.map((booking) => booking?.id)?.includes(id) ? (
              <>
              <Button variant="outline" w={"100%"} color="red" onClick={() => mutate()} disabled={cancelling}>Cancel Booking</Button>
              <span style={{color: "whitesmoke"}}>
                  Your visit already booked for date{" "}
                  {bookings?.filter((booking) => booking?.id === id)[0].date}
                </span>
              </>
            ) : (
              <button
              className="button"
              onClick={() => {
                if (validateLogin()) open();
              }}
            >
              Book Your Visit
            </button>
            )
          }
           
            <BookingModal
              opened={opened}
              close={close}
              propertyId={id}
              email={user?.email}
            />
          </div>
          {/* map */}
          <div className="map">
            <Map
              address={data?.residency?.address}
              city={data?.residency?.city}
              country={data?.residency?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProperty;
