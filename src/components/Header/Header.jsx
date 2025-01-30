import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import "./Header.scss";
import background from "/car3.jpg";
import { useNavigate } from "react-router-dom";

const Header = ({ setSearchedLocation, setSelectedDates }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBratEQnFGYAXlCSqtCq6kRtGTMMAhirac", 
  });

  const [language, setLanguage] = useState("en");
  const [location, setLocation] = useState({ lat: 41.0082, lng: 28.9784 });
  const [nearbyOffices, setNearbyOffices] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [mapLoading, setMapLoading] = useState(true); 
  const navigate = useNavigate();

  const translations = {
    en: {
      greeting:"Hello",
      title: "Let’s Find the Best Car for You!",
      pickupLocation: "Pick-Up Location",
      pickupDate: "Pick-Up Date",
      returnDate: "Return Date",
      pickupTime: "Pick-Up Time",
      returnTime: "Return Time",
      search: "Search",
  
    },
    tr: {
      greeting:"Merhaba",
      title: "Sizin İçin En İyi Arabayı Bulalım!",
      pickupLocation: "Alış Konumu",
      pickupDate: "Alma Tarihi",
      returnDate: "İade Tarihi",
      pickupTime: "Alış Saati",
      returnTime: "İade Saati",
      search: "Ara",
    },
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoading(false); 
    }, 4000); 


    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchCarLocations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cars");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.cars || !Array.isArray(data.cars)) {
          throw new Error("Invalid data format received from server");
        }

        const offices = data.cars
          .filter(car => car.location_latitude && car.location_longitude)
          .map((car, index) => ({
            id: index,
            name: car.name,
            lat: parseFloat(car.location_latitude),
            lng: parseFloat(car.location_longitude),
          }));

        setNearbyOffices(offices);
      } catch (error) {
        console.error("Error fetching car locations:", error);
        alert("An error occurred while fetching car locations.");
      }
    };

    fetchCarLocations();
  }, []);

  useEffect(() => {
    const defaultLocation = { lat: 41.0082, lng: 28.9784 };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setLocation({ lat: latitude, lng: longitude });
        },
        () => {
          setLocation(defaultLocation);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLocation(defaultLocation);
    }
  }, []);

  const handleSearch = () => {
    navigate("/search");
  }

  const user =   JSON.parse(localStorage.getItem("user"));
  
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setUserName(user.name);  
    } else {
      setUserName("Guest");   
    }
  }, []);

  return (
    <div className="header-container">
      <div className="header-background-container">
        <img src={background} alt="" className="header-background" />
      </div>

      <div className="header-content-container">
        <div className="language-switcher">
          <button
            className={`language-button ${language === "en" ? "active" : ""}`}
            onClick={() => handleLanguageChange("en")}
          >
            EN
          </button>
          <button
            className={`language-button ${language === "tr" ? "active" : ""}`}
            onClick={() => handleLanguageChange("tr")}
          >
            TR
          </button>
        </div>


        <div className="header-text-container">
          <h1 className="header-title">  {translations[language].greeting} {userName} </h1>
          <h2 className="header-title">{translations[language].title}  </h2>
        </div>
        <div className="header-search-container">
          <div className="header-input-container">
            <p className="header-input-title">{translations[language].pickupLocation}</p>
            <input type="text" onChange={(e) => setSearchedLocation(e.target.value)} className="header-search-input" />
          </div>
          <div className="header-input-container">
            <p className="header-input-title">{translations[language].pickupDate}</p>
            <input type="date" onChange={(e) => setSelectedDates({ startDate: e.target.value })} className="header-search-input header-search-date-input" />
          </div>
          <div className="header-input-container">
            <p className="header-input-title">{translations[language].returnDate}</p>
            <input type="date" onChange={(e) => setSelectedDates((prev) => ({ ...prev, returnDate: e.target.value }))} className="header-search-input header-search-date-input" />
          </div>

          <button className="header-search-button" onClick={() => handleSearch()}>{translations[language].search}</button>
        </div>
      </div>


      {mapLoading ? (
        <div className="loading-map">Map Loading...</div>
      ) : (
        <div className="google-map-container">
          <GoogleMap
            center={location}
            zoom={12}
            mapContainerStyle={{ width: "100%", height: "100%" }}
          >
            {userLocation && <Marker position={userLocation} title="Your Location" />}
            {nearbyOffices.map((office) => (
              <Marker
                key={office.id}
                position={{ lat: office.lat, lng: office.lng }}
                title={office.name}
              />
            ))}
          </GoogleMap>
        </div>
      )}
    </div>
  );
};

export default Header;
