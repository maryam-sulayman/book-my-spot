import React from "react";
import "../styles/Products.css";

const ProductsAndServices = () => {
  const services = [
    {
      title: "Parking Spot Listing",
      description: "List your available parking spots to earn extra income.",
      icon: "fa-parking",
    },
    {
      title: "Spot Search",
      description: "Find the perfect parking spot near your destination with ease.",
      icon: "fa-search-location",
    },
    {
      title: "Secure Bookings",
      description: "Reserve parking spots securely with instant confirmation.",
      icon: "fa-lock",
    },
    {
      title: "Feedback and Reviews",
      description: "Leave and read reviews to ensure a great parking experience.",
      icon: "fa-star",
    },
    {
      title: "Customer Support",
      description: "Get help when you need it with our 24/7 customer support.",
      icon: "fa-headset",
    },
  ];

  return (
    <div className="products-services-container">
      <h2 className="page-title">Our Products and Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="icon-container">
              <i className={`fas ${service.icon} service-icon`}></i>
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsAndServices;
