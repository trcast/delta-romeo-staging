import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import chevron from "../assets/client/chevron.svg";

const ProjectPage = () => {
  const [works, setWorks] = useState({ acf: {} });
  const [mainIframeHtml, setMainIframeHtml] = useState("");
  const [secondaryIframeHtml, setSecondaryIframeHtml] = useState({});
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

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openModal = (image, index) => {
    setSelectedImage(image);
    setSelectedImageIndex(index - 1);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
    setSelectedImageIndex(null);
  };

  const handlePrev = () => {
    const totalImages = 10;
    const prevIndex = (selectedImageIndex - 1 + totalImages) % totalImages;
    const prevImageKey = `project_image_${prevIndex + 1}`;
    const prevImage = works.acf[prevImageKey];

    if (prevImage !== false) {
      setSelectedImage(prevImage);
      setSelectedImageIndex(prevIndex);
    }
  };

  const handleNext = () => {
    const totalImages = 10;
    const nextIndex = (selectedImageIndex + 1) % totalImages;
    const nextImageKey = `project_image_${nextIndex + 1}`;
    const nextImage = works.acf[nextImageKey];

    if (nextImage !== false) {
      setSelectedImage(nextImage);
      setSelectedImageIndex(nextIndex);
    } else {
      setSelectedImage(works.acf.project_image_1);
      setSelectedImageIndex(0);
    }
  };

  const [iframeHtml, setIframeHtml] = useState("");

  useEffect(() => {
    if (works.acf.main_project_video_1_type === "Url") {
      const originalIframeHtml = works.acf.main_project_url_1;

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = originalIframeHtml;
      const iframeElement = tempDiv.querySelector("iframe");

      iframeElement.width = "100%";
      iframeElement.height = "896px";

      const modifiedIframeHtml = tempDiv.innerHTML;

      setIframeHtml(modifiedIframeHtml);
    }
  }, [works.acf.main_project_video_1_type, works.acf.main_project_url_1]);

  useEffect(() => {
    updateIframeStyle(works.acf.main_project_url_1, setMainIframeHtml);
  }, [works.acf.main_project_video_1_type, works.acf.main_project_url_1]);

  useEffect(() => {
    for (let index = 1; index <= 5; index++) {
      const videoTypeKey = `secondary_project_video_${index}_type`;
      const urlKey = `secondary_project_url_${index}`;
      const iframeHtml = works.acf[urlKey];

      if (works.acf[videoTypeKey] === "Url" && iframeHtml) {
        updateIframeStyle(iframeHtml, (modifiedHtml) =>
          setSecondaryIframeHtml((prev) => ({
            ...prev,
            [urlKey]: modifiedHtml,
          }))
        );
      }
    }
  }, [works.acf]);

  const updateIframeStyle = (originalIframeHtml, setIframeHtml) => {
    if (!originalIframeHtml) {
      console.error("Original iframe HTML is undefined");
      return;
    }

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = originalIframeHtml;
    const iframeElement = tempDiv.querySelector("iframe");

    if (!iframeElement) {
      console.error("Iframe element not found", originalIframeHtml);
      return;
    }

    iframeElement.width = "100%";
    iframeElement.height = "560px";

    const modifiedIframeHtml = tempDiv.innerHTML;

    setIframeHtml(modifiedIframeHtml);
  };

  return (
    <>
      {works.acf && (
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

                {works.acf.services && Array.isArray(works.acf.services) && (
                  <div className="info-data-services">
                    {works.acf.services.map((service) => (
                      <p className="white" key={service.term_id}>
                        {service.name}
                      </p>
                    ))}
                  </div>
                )}
                <div className="info-data-services-mobile">
                  {works.acf.services && Array.isArray(works.acf.services) && (
                    <p className="white">{works.acf.services[0].name}</p>
                  )}
                </div>
              </div>
            </div>
          </section>
          <section className="project-hero-container">
            <h2>{works.acf.project_name}</h2>
            <div className="main-project-image-container">
              {works.acf.main_project_video_1_type === "Video" && (
                <video controls className="main-project-image-content">
                  {works.acf.main_project_video_1 && (
                    <source
                      src={works.acf.main_project_video_1}
                      type="video/mp4"
                    />
                  )}
                </video>
              )}
              {works.acf.main_project_video_1_type === "Url" && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: iframeHtml,
                  }}
                  className="main-project-image-content"
                />
              )}
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
              <div className="project-gallery-video-container">
                {Array.from({ length: 5 }, (_, index) => index + 1).map(
                  (index) => {
                    const videoTypeKey = `secondary_project_video_${index}_type`;
                    const videoKey = `secondary_project_video_${index}`;
                    const urlKey = `secondary_project_url_${index}`;

                    return (
                      <div key={index} className="gallery-video-container">
                        {works.acf[videoTypeKey] === "Video" &&
                          works.acf[videoKey] && (
                            <video width="100%" height="100%" controls>
                              <source
                                src={works.acf[videoKey]}
                                type="video/mp4"
                              />
                            </video>
                          )}
                        {works.acf[videoTypeKey] === "Url" && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: secondaryIframeHtml[urlKey],
                            }}
                          />
                        )}
                      </div>
                    );
                  }
                )}
              </div>
              <div className="project-gallery-image-container">
                {Array.from({ length: 10 }, (_, index) => index + 1).map(
                  (index) => {
                    const imageKey = `project_image_${index}`;
                    if (works.acf[imageKey] !== false) {
                      return (
                        <div
                          key={index}
                          className="project-image-container-page"
                          onClick={() => openModal(works.acf[imageKey], index)}
                        >
                          <img
                            src={works.acf[imageKey]}
                            alt={`Project Image ${index}`}
                            className="project-image"
                          />
                        </div>
                      );
                    }

                    return null;
                  }
                )}
              </div>
            </section>
            {works.acf.include_sidebar && (
              <div className="project-sidebar-container">
                {works.acf.sidebar && (
                  <p
                    className="gray"
                    dangerouslySetInnerHTML={{ __html: works.acf.sidebar }}
                  />
                )}
              </div>
            )}
            <Link to="/work" className="link-style">
              <button className="all-work-button">View All Work</button>
            </Link>
          </div>

          {modalOpen && selectedImage && (
            <div className="image-modal">
              <div className="image-modal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <img
                  src={selectedImage}
                  alt={`Project Image ${selectedImageIndex + 1}`}
                  className="image-modal-content"
                />
                <span className="prev" onClick={handlePrev}>
                  <img className="chevron-left" src={chevron} alt="" />
                </span>
                <span className="next" onClick={handleNext}>
                  <img className="chevron-right" src={chevron} alt="" />
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectPage;
