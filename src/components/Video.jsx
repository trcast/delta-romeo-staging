import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Video = () => {
  const [works, setWorks] = useState([]);
  const [selectedWorkIndex, setSelectedWorkIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const apiUrl =
        "https://yij.zsr.mybluehost.me/.website_7fda1f27/index.php?rest_route=/wp/v2/works&?_fields=acf&acf_format=standard&_=" +
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

  useEffect(() => {
    const newIndex = Math.floor(Math.random() * works.length);
    setSelectedWorkIndex(newIndex);
  }, [works]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="video-container">
      <div className="video">
        {works.length > 0 && (
          <>
            <div className="title-tag-container">
              <Link
                to={`/work/${works[selectedWorkIndex].id}`}
                className="link-style"
              >
                <p className="white title-tag">
                  {works[selectedWorkIndex].acf.project_name}
                </p>
              </Link>
              <button className="title-tag" onClick={openModal}>
                <p className="white">View Our Reel</p>
              </button>
            </div>
            <Link to={`/work/${works[selectedWorkIndex].id}`}>
              <img
                src={works[selectedWorkIndex].acf.main_project_image}
                alt={`Project ${selectedWorkIndex + 1}`}
              />
            </Link>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-container">
          <div className="close-modal-container">
            <button className="close-modal" onClick={closeModal}>
              X
            </button>
          </div>
          <iframe
            src="https://player.vimeo.com/video/677307385?badge=0&amp;autopause=0&amp;quality_selector=1&amp;player_id=0&amp;app_id=58479"
            allow="autoplay; fullscreen;"
            title="Demo Reel 2022"
            className="vimeo-video"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Video;
