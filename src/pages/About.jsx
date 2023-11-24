import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeader from "../components/SectionHeader";
import Service from "../components/Service";
import { Link } from "react-router-dom";
import "../App.css";

const About = () => {
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

  const [openService, setOpenService] = useState(null);

  function toggleDescription(id) {
    setOpenService((prevService) => (prevService === id ? null : id));
  }

  return (
    <div>
      <SectionHeader title="About" />
      <section className="container-right-global">
        <div className="about-bio-container">
          <p
            className="white"
            dangerouslySetInnerHTML={{ __html: biographies[0]?.acf.about_bio }}
          />
          <Link className="link-style" to="/contact" href="/contact">
            <button className="all-work-button">Contact Us</button>
          </Link>
        </div>
      </section>
      <SectionHeader title="Services" />
      <Service
        serviceName={biographies[0]?.acf.service_1_name}
        serviceGroup={biographies[0]?.acf.service_1_group}
      />
      <Service
        serviceName={biographies[0]?.acf.service_2_name}
        serviceGroup={biographies[0]?.acf.service_2_group}
      />
      <Service
        serviceName={biographies[0]?.acf.service_3_name}
        serviceGroup={biographies[0]?.acf.service_3_group}
      />
      <SectionHeader title="Leadership" />
      <section className="leaders-global-container">
        <div className="leader-container">
          <div className="leader-image-container">
            <img src={biographies[0]?.acf.dave_image} alt="" />
          </div>
          <div className="leader-info-container">
            <div className="leader-info-header">
              <h4 className="white">Dave Dimeola</h4>
              <h5 className="gray regular">{biographies[0]?.acf.dave_role}</h5>
            </div>
            <p
              className="white"
              dangerouslySetInnerHTML={{ __html: biographies[0]?.acf.dave_bio }}
            />
          </div>
        </div>
        <div className="leader-container">
          <div className="leader-image-container">
            <img src={biographies[0]?.acf.ryan_image} alt="" />
          </div>
          <div className="leader-info-container">
            <div className="leader-info-header">
              <h4 className="white">Ryan O'Phelan</h4>
              <h5 className="gray regular">{biographies[0]?.acf.ryan_role}</h5>
            </div>
            <p
              className="white"
              dangerouslySetInnerHTML={{ __html: biographies[0]?.acf.ryan_bio }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
