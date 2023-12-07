import Select from "react-select";
import React from "react";
import { Country,City } from "country-state-city";

export const getallcountries =()=>{
    const allcountries=Country.getAllCountries()
    const optionscountries =[];
    allcountries.forEach(country => {
        optionscountries.push({ value: country.name+"_"+country.isoCode+"_"+country.flag, label: country.name })
        });
        return optionscountries;
}


export const getallcities =(countrycode)=>{
    const allcities=City.getCitiesOfCountry(countrycode);
    const optionscities =[];
    allcities.forEach(city => {
        optionscities.push({ value: city.name, label: city.name })
        });
        return optionscities;
}


