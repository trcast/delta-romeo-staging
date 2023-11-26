import React, { useEffect, useState } from "react";
import axios from "axios";
import arrowSm from "../assets/client/arrow-sm.svg";
import { Link } from "react-router-dom";

const WorkPreview = ({ selectedService }) => {
  const [works, setWorks] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredWork, setHoveredWork] = useState(null);

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

  const filteredWorks = selectedService
    ? works
        .filter((work) =>
          work.acf.services.some((service) => service.name === selectedService)
        )
        .sort((a, b) => a.acf.order - b.acf.order)
    : works.sort((a, b) => a.acf.order - b.acf.order);

  const handleMouseEnter = (work) => {
    setHoveredWork(work);
  };

  const handleMouseLeave = () => {
    setHoveredWork(null);
  };

  return (
    <div className="work-preview-container">
      {filteredWorks.map((work) => {
        return (
          <div
            key={work.id}
            className="work-preview-wrapper"
            onMouseMove={(e) =>
              setMousePosition({
                x: e.clientX,
                y: e.clientY + window.scrollY,
              })
            }
            onMouseEnter={() => {
              setIsHovered(true);
              handleMouseEnter(work);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              handleMouseLeave();
            }}
          >
            <Link to={`/work/${work.id}`} className="work-preview-link">
              <div className="work-preview-info hover-right-position">
                <div className="work-preview-name-client">
                  <h5>{work.acf.project_name}</h5>
                  <p className="gray work-preview-client">{work.acf.client}</p>
                </div>
                <div className="work-preview-services-container">
                  {work.acf.services.map((service) => (
                    <p className="gray" key={service.term_id}>
                      {service.name}
                    </p>
                  ))}
                </div>
                <div className="work-preview-arrow">
                  <img src={arrowSm} alt="" />
                </div>
              </div>
            </Link>
          </div>
        );
      })}
      {isHovered && hoveredWork && (
        <div
          className="project-image-container"
          style={{
            top: `${mousePosition.y - 5}px`,
            left: `${mousePosition.x + 5}px`,
            position: "absolute",
            zIndex: 1000,
          }}
        >
          <img
            src={hoveredWork.acf.main_project_image}
            alt="Main Project"
            style={{ maxWidth: "350px" }}
          />
        </div>
      )}
    </div>
  );
};

export default WorkPreview;
