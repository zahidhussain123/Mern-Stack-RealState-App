import React from "react";
import "./singleProperty.css";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getSingleProperty } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import Favourite from "../../components/favourite/Favourite";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";

const SingleProperty = () => {
  const location = useLocation();
  const id = location.pathname?.split("/").pop();
  const { data, isError, isLoading } = useQuery(["singleResd", id], () =>
    getSingleProperty(id)
  );

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
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        <div className="like">
          <Favourite />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProperty;
