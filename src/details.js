import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./baseUrl";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faFacebook,faLinkedin, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Table, Input, Button, Spin, message, Popconfirm, Modal } from "antd";
import { useParams } from "react-router-dom";
const Details = () => {
  const [singleDetails, setSingleDetails] = useState({});
  const [loader, setLoader] = useState(false);
  const { id } = useParams();



  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        const response = await axios.get(
          `${BASE_URL}/companies/${id}`
        );
        console.log(response.data, "response.data")
        setSingleDetails(response.data);
      } catch (error) {
        console.error(error);
        message.error("Failed to fetch company details");
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      
      <Row
        className="mt-4"
        style={{
          border: "1px solid #dee2e6",
          padding: 25,
          borderRadius: "5px",
        }}
      >
        <Col md={7}>
          {loader ? (
            <div>Loading...</div>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={singleDetails.logoUrl}
                alt="Company Logo"
                style={{ maxWidth: "100%", marginRight: "15px" }}
              />
              <div>
                <div style={{ fontWeight: "600", color: "#6C7A89" }}>
                  Description
                </div>
                <div>{singleDetails.description}</div>
              </div>
            </div>
          )}
        </Col>
        <Col md={5}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon icon={faPhone} style={{ marginRight: "10px" }} />
            <div style={{ fontWeight: "600", color: "#6C7A89" }}>Phone</div>
          </div>
          <div>
            <div>{singleDetails.phoneNo}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ marginRight: "10px" }}
            />
            <div style={{ fontWeight: "600", color: "#6C7A89" }}>Email</div>
          </div>
          <div>
            <div>{singleDetails.email}</div>
          </div>
        </Col>
      </Row>
      <Row className="mt-1">
        
        <Col
          md={4}
          style={{
            border: "1px solid #dee2e6",
            padding: 25,
            borderRadius: "5px",
         
          }}
        >
          <div>
            <h4>Company Details</h4>
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 10 }}
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                style={{ marginRight: "10px" }}
              />
              <div style={{ fontWeight: "600", color: "#6C7A89" }}>
                Description
              </div>
            </div>
            <div>{singleDetails.description}</div>
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 10 }}
            >
            
              <FontAwesomeIcon
                icon={faFacebook}
                style={{ marginRight: "10px" }}
              />
              <div style={{ fontWeight: "600", color: "#6C7A89" }}>
                Facebook
              </div>
            </div>
            <a
              href={singleDetails.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#BF55EC" }}
            >
              {singleDetails.facebookUrl}
            </a>
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 10 }}
            >
              <FontAwesomeIcon
                icon={faInstagram}
                style={{ marginRight: "10px" }}
              />
              <div style={{ fontWeight: "600", color: "#6C7A89" }}>
                Instagram
              </div>
            </div>
            <a
              href={singleDetails.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#BF55EC" }}
            >
              {singleDetails.instagramUrl}
            </a>
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 10 }}
            >
              <FontAwesomeIcon
                icon={faTwitter}
                style={{ marginRight: "10px" }}
              />
              <div style={{ fontWeight: "600", color: "#6C7A89" }}>Twitter</div>
            </div>
            <div>
              <a
                href={singleDetails.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#BF55EC" }}
              >
                {singleDetails.twitterUrl}
              </a>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 10 }}
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                style={{ marginRight: "10px" }}
              />
              <div style={{ fontWeight: "600", color: "#6C7A89" }}>
                Linkedin
              </div>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 5 }}
            >
              <a
                href={singleDetails.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#BF55EC", textDecoration: "none" }}
              >
                {singleDetails.linkedinUrl}
              </a>
            </div>
       
          </div>
        </Col>
        <Col md={8} style={{
      border: "1px solid #dee2e6",
      padding: 25,
      borderRadius: "5px",
    }}>
      <div>
        <h5>Screenshot of webpage</h5>
        
        
        <img 
          src={`http://localhost:5000/${singleDetails.screenshotUrl}`} 
          alt="Uploaded Image" 
          className="img-fluid"
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "5px"
          }}
        />
      </div>
    </Col>
      </Row>
    </Container>
  );
};
export default Details;
