import React, { useEffect, useState } from "react";
import axios from "axios";

const ServiceTags = ({ selectedService, onServiceTagClick }) => {
  const [services, setServices] = useState([]);

  const fetchData = async () => {
    try {
      const apiUrl =
        "https://yij.zsr.mybluehost.me/.website_7fda1f27/index.php?rest_route=/wp/v2/work-services&_=" +
        Date.now();
      const response = await axios.get(apiUrl);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Fetching data at interval...");
      fetchData();
    }, 30 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="service-tag-container">
      {services.map((service) => (
        <div
          key={service.id}
          className={`service-tag ${
            selectedService === service.name ? "selected" : ""
          }`}
          onClick={() => onServiceTagClick(service.name)}
        >
          <p>{service.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceTags;
