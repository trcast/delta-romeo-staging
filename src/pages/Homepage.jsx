import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeader from "../components/SectionHeader";
import WorkPreview from "../components/WorkPreview";
import ServiceTags from "../components/ServiceTags";
import SectionHeaderLink from "../components/SectionHeaderLink";

const Homepage = () => {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceTagClick = (serviceName) => {
    setSelectedService((prevSelectedService) =>
      prevSelectedService === serviceName ? null : serviceName
    );
  };

  const [biographies, setBiographies] = useState([]);

  const fetchData = async () => {
    try {
      const apiUrl =
        "https://yij.zsr.mybluehost.me/.website_7fda1f27/index.php?rest_route=/wp/v2/biographies&?_fields=acf&acf_format=standard&_=" +
        Date.now();
      const response = await axios.get(apiUrl);
      setBiographies(response.data);
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
    <div>
      <div className="homepage-bio-container">
        <div className="homepage-bio">
          <h6
            className="white"
            dangerouslySetInnerHTML={{
              __html: biographies[0]?.acf.homepage_bio,
            }}
          />
        </div>
      </div>
      <SectionHeader title="Work" />
      <ServiceTags
        selectedService={selectedService}
        onServiceTagClick={handleServiceTagClick}
      />
      <WorkPreview selectedService={selectedService} />
      <SectionHeaderLink title="About" link="about" />
      <SectionHeaderLink title="Contact" link="contact" />
      <SectionHeaderLink title="Jobs" link="jobs" />
    </div>
  );
};

export default Homepage;
