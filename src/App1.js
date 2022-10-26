import React,{useState,useEffect} from 'react'
import Header from './Container/Header'
import './App.css'
import { Routes, Route} from 'react-router-dom'
import CountryDetail from './Container/CountryDetail '
import HomePage from './App2'

function App1() {
  const [countries, setCountries] = useState([]);
  const [FilteredCountries, setFilteredCountries] = useState([]);
  const [countriesList, setCountriesList] = useState([]);

  let url = 'https:restcountries.com/v2/all'

  const fetchAPIData = async() => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
      let obj = {}
      data.forEach((country) => {
        if(!obj[country.region]){
            obj[country.region] = [country.region]
        }
      });
      setCountriesList(Object.keys(obj));
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAPIData();
  },[])

  const searchCountries = (e) => {
    let {value} = e.target
    const newCountry = countries.filter((country) => {
      let countryName = country.name.toLowerCase()
      if(countryName.includes(value.toLowerCase())){
         return country
      }
    })
    setFilteredCountries([...newCountry])
  }


  const selectRegion = (e) => {
    let {value} = e.target
    if(value == 'All'){
       setFilteredCountries([...countries])
    }else{
      let {value} = e.target
      let newCountry = countries.filter((country) => {
      let regionName = country.region
      if(regionName.includes(value)){
         return country
      }
    })
    setFilteredCountries([...newCountry])
    }
  }

  return (
    <div>
     <Header/>
     <Routes>
      <Route path="/" element={<HomePage selectRegion={selectRegion} searchCountries={searchCountries} countriesList={countriesList} FilteredCountries={FilteredCountries}/>}/>
      <Route path='/:countryCode' element={<CountryDetail/>} />
     </Routes>
    </div>
  )
}

export default App1