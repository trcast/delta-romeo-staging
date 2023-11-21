import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeader from "../components/SectionHeader";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("your-name", name);
    formData.append("your-email", email);
    formData.append("your-subject", subject);
    formData.append("your-message", message);

    const reqOptions = {
      method: "POST",
      body: formData,
    };

    const req = await fetch(
      "https://yij.zsr.mybluehost.me/.website_7fda1f27/index.php?rest_route=/contact-form-7/v1/contact-forms/66/feedback",
      reqOptions
    );
    const response = await req.json();

    if (response.status === "mail_sent") {
      setSubmissionStatus("success");
    } else {
      setSubmissionStatus("error");
    }

    setName("");
    setEmail("");
    setMessage("");
    setSubject("");
  };

  const handleResetForm = () => {
    setSubmissionStatus(null);
    setName("");
    setEmail("");
    setMessage("");
    setSubject("");
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
      <SectionHeader title="Contact" />
      <section className="contact-global-container">
        {submissionStatus === "success" ? (
          <div>
            <div className="success-container">
              <h4 className="white regular">Successfully submitted!</h4>
            </div>
            <button className="all-work-button" onClick={handleResetForm}>
              Submit Another Form
            </button>
          </div>
        ) : (
          <section className="conact-form-container">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Name"
                className="form-input"
              />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="form-input"
              />

              <input
                type="subject"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                placeholder="Subject"
                className="form-input"
              />
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Message"
                className="form-input"
                rows={10}
              />
              <button className="all-work-button" type="submit">
                Submit
              </button>
            </form>
          </section>
        )}

        <section className="contact-form-info-container">
          <h4 className="white semibold">Get in Touch</h4>
          <p className="gray">{biographies[0]?.acf.contact_bio}</p>
        </section>
      </section>
    </div>
  );
};

export default Contact;
