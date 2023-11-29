import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import chevron from "../assets/client/chevron.svg";

const ProjectPage = () => {
  const [works, setWorks] = useState({ acf: {} });
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

  const media1 =
    works.acf.project_media_1_type === "Video" &&
    works.acf.project_media_1_type !== "false"
      ? works.acf.project_video_1
      : works.acf.project_image_1;

  const media2 =
    works.acf.project_media_2_type === "Video" &&
    works.acf.project_media_2_type !== "false"
      ? works.acf.project_video_2
      : works.acf.project_image_2;

  const media3 =
    works.acf.project_media_3_type === "Video" &&
    works.acf.project_media_3_type !== "false"
      ? works.acf.project_video_3
      : works.acf.project_image_3;

  const media4 =
    works.acf.project_media_4_type === "Video" &&
    works.acf.project_media_4_type !== "false"
      ? works.acf.project_video_4
      : works.acf.project_image_4;

  const media5 =
    works.acf.project_media_5_type === "Video" &&
    works.acf.project_media_5_type !== "false"
      ? works.acf.project_video_5
      : works.acf.project_image_5;

  const media6 =
    works.acf.project_media_6_type === "Video" &&
    works.acf.project_media_6_type !== "false"
      ? works.acf.project_video_6
      : works.acf.project_image_6;

  const media7 =
    works.acf.project_media_7_type === "Video" &&
    works.acf.project_media_7_type !== "false"
      ? works.acf.project_video_7
      : works.acf.project_image_7;

  const media8 =
    works.acf.project_media_8_type === "Video" &&
    works.acf.project_media_8_type !== "false"
      ? works.acf.project_video_8
      : works.acf.project_image_8;

  const media9 =
    works.acf.project_media_9_type === "Video" &&
    works.acf.project_media_9_type !== "false"
      ? works.acf.project_video_9
      : works.acf.project_image_9;

  const media10 =
    works.acf.project_media_10_type === "Video" &&
    works.acf.project_media_10_type !== "false"
      ? works.acf.project_video_10
      : works.acf.project_image_10;

  const projectMedia = [
    { type: works.acf.project_media_1_type, content: media1 },
    { type: works.acf.project_media_2_type, content: media2 },
    { type: works.acf.project_media_3_type, content: media3 },
    { type: works.acf.project_media_4_type, content: media4 },
    { type: works.acf.project_media_5_type, content: media5 },
    { type: works.acf.project_media_6_type, content: media6 },
    { type: works.acf.project_media_7_type, content: media7 },
    { type: works.acf.project_media_8_type, content: media8 },
    { type: works.acf.project_media_9_type, content: media9 },
    { type: works.acf.project_media_10_type, content: media10 },
  ];

  const filteredMedia = projectMedia.filter(
    (media) =>
      media.type !== "false" &&
      media.content !== "false" &&
      media.type &&
      media.content
  );

  const openModal = (mediaIndex) => {
    setSelectedImageIndex(mediaIndex);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const navigateMedia = (direction) => {
    const maxIndex = projectMedia.length - 1;

    if (projectMedia.length === 0) {
      return;
    }

    let newIndex = selectedImageIndex + direction;

    // Adjust newIndex to be within the bounds of the filtered array
    newIndex = (newIndex + maxIndex + 1) % (maxIndex + 1);

    // Find the next valid index
    while (projectMedia[newIndex].type === "false") {
      newIndex = (newIndex + direction + maxIndex + 1) % (maxIndex + 1);

      // If all media items have type === "false", break the loop
      if (newIndex === selectedImageIndex) {
        console.log("All media items have type === 'false'");
        break;
      }
    }

    console.log("Selected Index:", selectedImageIndex);
    console.log("New Index:", newIndex);

    setSelectedImageIndex(newIndex);
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
              {works.acf.main_project_video_1 && (
                <video width="100%" height="100%" controls>
                  <source
                    src={works.acf.main_project_video_1}
                    type="video/mp4"
                  />
                </video>
              )}
              {works.acf.main_project_video_2 && (
                <video width="100%" height="100%" controls>
                  <source
                    src={works.acf.main_project_video_2}
                    type="video/mp4"
                  />
                </video>
              )}
              {works.acf.main_project_video_3 && (
                <video width="100%" height="100%" controls>
                  <source
                    src={works.acf.main_project_video_3}
                    type="video/mp4"
                  />
                </video>
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
              {filteredMedia.map(
                (media, index) =>
                  media.type &&
                  media.content && (
                    <div
                      key={index}
                      className={
                        media.type === "Video"
                          ? "project-video-container"
                          : "project-image-container-page"
                      }
                    >
                      {media.type === "Video" ? (
                        <video width="100%" height="100%" controls>
                          <source src={media.content} type="video/mp4" />
                        </video>
                      ) : (
                        <img
                          src={media.content}
                          alt=""
                          onClick={() => openModal(index)}
                          className="project-image"
                        />
                      )}
                    </div>
                  )
              )}
            </section>
          </div>
        </div>
      )}
      {selectedImageIndex !== null &&
        selectedImageIndex < filteredMedia.length && (
          <div className="image-modal">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <span className="prev" onClick={() => navigateMedia(-1)}>
              <img className="chevron-mobile-left" src={chevron} alt="" />
            </span>

            {filteredMedia[selectedImageIndex].type === "Video" &&
            filteredMedia[selectedImageIndex].type !== "false" ? (
              <video
                width="100%"
                height="100%"
                controls
                className="image-modal-content"
              >
                <source
                  src={filteredMedia[selectedImageIndex].content}
                  type="video/mp4"
                />
              </video>
            ) : null}

            {filteredMedia[selectedImageIndex].type !== "false" &&
            filteredMedia[selectedImageIndex].type !== "Video" ? (
              <img
                className="image-modal-content"
                src={filteredMedia[selectedImageIndex].content}
                alt=""
              />
            ) : null}

            <span className="next" onClick={() => navigateMedia(1)}>
              <img className="chevron-mobile-right" src={chevron} alt="" />
            </span>
          </div>
        )}
    </>
  );
};

export default ProjectPage;
