import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./countrylist.module.css";

const CountryList = () => {
  const [countryList, setCountryList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const cachedCountries = localStorage.getItem("countryDetails");
        if (cachedCountries) {
          setCountryList(JSON.parse(cachedCountries));
        } else {
          const response = await axios.get(
            "https://restcountries.com/v3.1/all"
          );
          if (response.status === 200 && response.statusText === "OK") {
            localStorage.setItem(
              "countryDetails",
              JSON.stringify(response.data)
            );
            setCountryList(response.data);
          } else {
            console.error("Response Data Not Found!");
          }
        }
      } catch (error) {
        console.error("Error fetching countries: ", error);
        setError(error); // Set error state if API request fails
      }
    };
    fetchAPI();
  }, []);

  if (error) {
    return <div>Error fetching countries: {error.message}</div>;
  }

  return (
    <div className="container mt-3">
      <div className="row">
        {countryList.map((value, index) => (
          <div className="col" key={index}>
            <div className={styles.card_wrapper}>
              <img
                src={value.flags.png}
                alt={value.flags.alt}
                className={styles.card_image}
              />
              <p className={styles.card_para}>{value.name.common}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
