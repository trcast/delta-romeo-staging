import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ProjectPage = () => {
  const [works, setWorks] = useState([]);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const apiUrl =
        `https://yij.zsr.mybluehost.me/.website_7fda1f27/index.php?rest_route=/wp/v2/works/${id}&?_fields=acf&acf_format=standard&_=` +
        Date.now();
      const response = await axios.get(apiUrl);
      setWorks(response.data);
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
    <>
      {works && works.acf && (
        <div>
          <section className="project-details-main">
            <div className="project-page-details-container">
              <div className="detail-info-line">
                <p className="gray info-title">Year</p>
                <p className="white info-data">{works.acf.year}</p>
              </div>
              <div className="detail-info-line">
                <p className="gray info-title">Client</p>
                <p className="white info-data">{works.acf.client}</p>
              </div>
              <div className="detail-info-line">
                <p className="gray info-title">Project</p>
                <p className="white info-data">{works.acf.project_name}</p>
              </div>
              <div className="detail-info-line">
                <p className="gray info-title">Services</p>
                <div className="info-data-services">
                  {works.acf.services.map((service) => (
                    <p className="white" key={service.term_id}>
                      {service.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="project-hero-container">
            <h2>{works.acf.project_name}</h2>
            <div className="main-project-image-container">
              <img src={works.acf.main_project_image} alt="" />
            </div>
          </section>
          <section className="project-brief-container">
            <h5>Project Brief</h5>
            <div
              className="project-brief-paragraph"
              dangerouslySetInnerHTML={{ __html: works.acf.project_brief }}
            />
          </section>
          <div className="container-right-global">
            <div className="project-gallery-container">
              <div className="project-gallery-row">
                <img src={works.acf.project_image_1} alt="" />
                <img src={works.acf.project_image_2} alt="" />
              </div>
              <div className="project-gallery-row">
                <img src={works.acf.project_image_3} alt="" />
                <img src={works.acf.project_image_4} alt="" />
              </div>
            </div>
            {works.acf.include_sidebar && (
              <div className="project-sidebar-container">
                <p className="gray">{works.acf.sidebar}</p>
              </div>
            )}
            <section>
              <Link to="/work" className="link-style">
                <button className="all-work-button">All Work</button>
              </Link>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectPage;
