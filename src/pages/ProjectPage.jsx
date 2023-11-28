import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import chevron from "../assets/client/chevron.svg";

const ProjectPage = () => {
  const [works, setWorks] = useState([]);
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

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

  const projectImages = [
    works?.acf?.project_image_1,
    works?.acf?.project_image_2,
    works?.acf?.project_image_3,
    works?.acf?.project_image_4,
  ];

  const openModal = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const navigateImage = (direction) => {
    const maxIndex = (projectImages && projectImages.length) - 1;

    // Return if projectImages is undefined or empty
    if (!projectImages || projectImages.length === 0) {
      return;
    }

    let newIndex = selectedImageIndex + direction;

    // Ensure newIndex stays within bounds
    if (newIndex < 0) {
      newIndex = maxIndex;
    } else if (newIndex > maxIndex) {
      newIndex = 0;
    }

    setSelectedImageIndex(newIndex);
  };

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
                <div className="info-data-services-mobile">
                  <p className="white">{works.acf.services[0].name}</p>
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
            <section className="project-gallery-container">
              {projectImages.map((image, index) => (
                <div className="project-image-container-page">
                  <img
                    key={index}
                    src={image}
                    alt=""
                    onClick={() => openModal(index)}
                    className="project-image"
                  />
                </div>
              ))}
            </section>

            {selectedImageIndex !== null && (
              <div className="image-modal">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <span className="prev" onClick={() => navigateImage(-1)}>
                  <img className="chevron-mobile-left" src={chevron} alt="" />
                </span>
                <img
                  className="image-modal-content"
                  src={projectImages[selectedImageIndex]}
                  alt=""
                />
                <span className="next" onClick={() => navigateImage(1)}>
                  <img className="chevron-mobile-right" src={chevron} alt="" />
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectPage;
