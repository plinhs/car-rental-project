import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Search.scss";

const Search = ({ location,dates }) => {

    const [cars, setCars] = useState([]);

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

                console.log(location)
                const searchedCars = data.cars
                .filter(car => car.location_name.replace(/\s+/g, "").toLowerCase().includes(location.replace(/\s+/g, "").toLowerCase()))
                .map((car, index) => ({
                    id: index,
                    name: car.name,
                    transmission: car.transmission,
                    deposit: car.deposit,
                    mileage: car.mileage,
                    age: car.age,
                    rental_cost: car.rental_cost,
                    photo_url: car.photo_url,
                    location_name: car.location_name,
                }));
           
           
                console.log(searchedCars);
                setCars(searchedCars);
            } catch (error) {
                console.error("Error fetching car locations:", error);
                alert("An error occurred while fetching car locations.");
            }
        };

        fetchCarLocations();
    }, []);

    return (
        <div className="search">
            <div className="search__container">
                <div className="search__container__title">
                    <h1>Search Results</h1>
                </div>
                <div className="search__container__content">
                    {cars.map((car) => (
                        <div className="search__container__content__card" key={car.id}>
                            <div className="search__container__content__card__image">
                                <img src={car.photo_url} alt={car.name} />
                            </div>
                            <div className="search__container__content__card__info">
                                <h3>{car.name}</h3>
                                <p>Transmission: {car.transmission}</p>
                                <p>Deposit: {car.deposit}</p>
                                <p>Mileage: {car.mileage}</p>
                                <p>Age: {car.age}</p>
                                <p>Rental Cost: {car.rental_cost}</p>
                                <p>Location: {car.location_name}</p>
                                <p>Pickup Dates: {dates.startDate}</p>
                                <p>Return Dates: {dates.returnDate}</p>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Search;
