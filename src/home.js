import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Input, Button, Spin, message, Popconfirm, Modal } from "antd";
import { saveAs } from "file-saver";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import { BASE_URL } from "./baseUrl";
const Home = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const handleChange = (event) => {
    setUrl(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/scrape`, {
        url,
      });
      fetchCompanies();
      message.success(response.data.message);
    } catch (error) {
      console.error(error);
      message.error("Failed to scrape and save");
    } finally {
      setLoading(false);
      setUrl("");
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/companies`);
      setCompanies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const onDeleteSelected = async () => {
    if (selectedRowKeys.length === 0) {
      message.error("Select rows to delete selected companies");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.delete(`${BASE_URL}/companies`, {
        data: { ids: selectedRowKeys },
      });
      message.success(response.data.message);
      fetchCompanies();
    } catch (error) {
      console.error(error);
      message.error("Select row to delete selected companies");
    } finally {
      setLoading(false);
      setSelectedRowKeys([]);
    }
  };


  const columns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      width: 100,
    },
    {
      title: "Company Logo",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.logoUrl}
            alt="Company Logo"
            height="20"
            style={{ marginRight: "10px" }}
          />
          {name}
        </div>
      ),
      width: 150,
    },
    {
      title: "Social Profiles",
      key: "socialMedia",
      render: (text, record) => (
        <div>
          {record.facebookUrl && (
            <a
              href={record.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="../assets/facebook.png"
                alt="Facebook"
                style={{ marginRight: "5px", height: "20px" }}
              />
            </a>
          )}
          {record.twitterUrl && (
            <a
              href={record.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="../assets/twitter.jpg"
                alt="Twitter"
                style={{ marginRight: "5px", height: "20px" }}
              />
            </a>
          )}
          {record.instagramUrl && (
            <a
              href={record.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="../assets/insta.jpg"
                alt="Instagram"
                style={{ height: "20px" }}
              />
            </a>
          )}
          {record.linkedinUrl && (
            <a
              href={record.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="../assets/linkedin.jpg"
                alt="LinkedIn"
                style={{ height: "20px" }}
              />
            </a>
          )}
        </div>
      ),
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 150,
    },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    //   width: 150,
    // },
    // {
    //   title: "Phone Number",
    //   dataIndex: "phoneNumber",
    //   key: "phoneNumber",
    //   width: 150,
    // },
    // {
    //   title: "Email",
    //   dataIndex: "email",
    //   key: "email",
    //   width: 150,
    // },
    {
        title: "Actions",
        key: "actions",
        render: (text, record) => (
            <Link to={`/details/${record._id}`}>
            <Button style={{background:'#e1fbfd'}}>View</Button>
          </Link>
        ),
        width: 100,
        align: "center",
      },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const downloadCSV = () => {
    const header = Object.keys(companies[0]);
    const csvData = [
      header.join(","),
      ...companies.map((company) =>
        header.map((fieldName) => company[fieldName]).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "companies.csv");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="mt-4">
        <label style={{ fontFamily: 'Helvetica, sans-serif'}}>
          Enter domain name:
          <Input
            type="text"
            value={url}
            onChange={handleChange}
            placeholder="Enter domain name"
          />
        </label>
        <Button
          type="default"
          htmlType="submit"
          
          style={{ marginLeft: 10, background: "#e1fbfd" }}
        >
          Fetch & save details
        </Button>
      </form>

    
          <div className="mt-4">
            <button
              type="submit"
              className="btn btn-default btn-sm"
              style={{ background: "#e1fbfd", marginRight: 10 }}
              onClick={onDeleteSelected}
            >
              Delete Selected
            </button>
            <button
              type="submit"
              className="btn btn-default btn-sm"
              onClick={downloadCSV}
              style={{ marginLeft: 10, background: "#e1fbfd" }}
            >
             
              Export as CSV
            </button>
          </div>
          <div className="mt-4">
          {loading ? (
        <div className="text-center mt-4">
          <Spin size="large" />
        </div>
      ) : (
        <>
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={companies}
              rowKey="_id"
              scroll={{ x: "max-content" }}
            />
                </>
      )}
          </div>
        
    
    </div>
  );
};

export default Home;
