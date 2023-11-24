import React, { useState } from "react";
import chevron from "../assets/client/chevron.svg";

const Service = ({ serviceName, serviceGroup }) => {
  const [openService, setOpenService] = useState(null);

  const toggleDescription = (id) => {
    setOpenService((prevService) => (prevService === id ? null : id));
  };

  return (
    <section className="services-global-container">
      <div className="services-group-container">
        <h4 className="white regular">{serviceName}</h4>
        <div className="services-container">
          {serviceGroup &&
            serviceGroup.map((service) => (
              <div
                className="service-line-container"
                key={service.term_id}
                onClick={() => toggleDescription(service.term_id)}
              >
                <div className="services-line">
                  <h5 className="regular">{service.name}</h5>
                  <img
                    className={`chevron ${
                      openService === service.term_id ? "flip" : ""
                    }`}
                    src={chevron}
                    alt=""
                  />
                </div>
                <div
                  className={`description-container ${
                    openService === service.term_id ? "open" : ""
                  }`}
                >
                  <p className="gray">{service.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
