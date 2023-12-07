import { Country, City } from 'country-state-city';
import  $ from "jquery"

export const  getAllCountriesAsOptions = () => {
  const allCountries = Country.getAllCountries();
  const countryOptions = allCountries.map(country => {
    // Assuming flag images are stored in a 'flags' directory and the file names are based on ISO codes (e.g., 'US.png' for the United States)
    const flagImageSrc = `flags/${country.isoCode.toLowerCase()}.png`;
    return `<option value="${country.isoCode}-${country.name}-${country.phonecode}" data-icon="${flagImageSrc}">${country.name}</option>`;
  });

  return countryOptions.join('');
};

export const getAllCitiesOfCountryAsOptions =  (countryCode) => {
  const allCities = City.getCitiesOfCountry(countryCode);
  const cityOptions = allCities.map(city => {
    return `<option value="${city.name}">${city.name}</option>`;
  });

  return cityOptions.join('');
};



export const formatCountry=(option)=> {
  const flagImage = $(option.element).data('icon');
  if (!flagImage) {
    return option.text;
  }
  return $(`<div style="width:100%; display:flex ;gap :15px"><img style="width:40px" src="${flagImage}" /> <span> ${option.text}</span></div>`);
  
}





// retun as array of country value 

export const  getAllCountriesArray = () => {
  const allCountries = Country.getAllCountries();
 const arraycountry= []
 allCountries.map((country,index)=>{
        arraycountry.push(country.isoCode+"-"+country.name+"-"+country.phonecode)
 })

  return allCountries;
};


// retun as array of country value 

export const  getAllcitiesArray = () => {
  const allCities = City.getAllCities();
 // const arraycoun
 

  return allCities;
};
