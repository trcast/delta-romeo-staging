import React, { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import WorkPreview from "../components/WorkPreview";
import ServiceTags from "../components/ServiceTags";
import "../App.css";

const Work = () => {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceTagClick = (serviceName) => {
    setSelectedService((prevSelectedService) =>
      prevSelectedService === serviceName ? null : serviceName
    );
  };

  return (
    <div>
      <SectionHeader title="Work" />
      <ServiceTags
        selectedService={selectedService}
        onServiceTagClick={handleServiceTagClick}
      />
      <WorkPreview selectedService={selectedService} />
    </div>
  );
};

export default Work;
