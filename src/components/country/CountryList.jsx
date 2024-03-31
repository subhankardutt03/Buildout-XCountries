import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./countrylist.module.css";

const CountryList = () => {
  const [countryList, setCountryList] = useState([]);
  const fetchAPI = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      if (response.status === 200) {
        setCountryList(response.data);
      } else {
        console.error("Failed to fetch data", response.status);
      }
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

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
