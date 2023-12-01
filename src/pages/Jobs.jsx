import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeader from "../components/SectionHeader";

const Jobs = () => {
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
    <section>
      <SectionHeader title="Jobs" />
      <div className="jobs-container">
        <h4 className="white regular">Current Openings</h4>
        <p
          className="gray white-link"
          dangerouslySetInnerHTML={{ __html: biographies[0]?.acf.jobs_bio }}
        />
      </div>
    </section>
  );
};

export default Jobs;
