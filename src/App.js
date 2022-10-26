import React,{useState,useEffect} from 'react'
import Header from './Container/Header'
import './App.css'
import SearchIcon from '@mui/icons-material/Search'
import Country from './Container/Country'
import { Routes, Route} from 'react-router-dom'
import CountryDetail from './Container/CountryDetail '
import {useNavigate} from 'react-router-dom'

function App() {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false);

  const switchMode = () => {
    setDarkMode((prevState) => !prevState);
  }


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


  const showDetails = (name) => {
     navigate(`${name}`)
  }

  return (
    <div className={`app ${darkMode ? 'darkMode' : ''}`}>
     <Header onClick={switchMode} darkMode={darkMode}/>
    
     <Routes>
      <Route path="/" element={
        <div className='app_body'>
        <div className='inputs'>
          <div className={`search_input ${darkMode ? 'darkMode' : ''}`}>
            <SearchIcon />
            <input type="text" placeholder='search for a country...'  onChange={(e) => searchCountries(e)}/>
          </div>
          <div className={`select_region ${darkMode ? 'darkMode' : ''}`}>
          <select onChange={(e) => selectRegion(e)}>
             <option>All</option>
            {
              countriesList.map((name) => {
                return (
                  <option key={name.numericCode} value={name}>{name}</option>
                )
              })
            }
          </select>
          </div>
        </div>
        <div className='countries'>
          {
             FilteredCountries.length>0 ? (FilteredCountries.map((country) => (
              <Country darkMode={darkMode}
              key = {country.alpha3Code}
              code = {country.alpha3Code}
              name = {country.name}
              capital = {country.capital}
              population = {country.population}
              region = {country.region}
              flag = {country.flags.png}
              showDetails = {showDetails}
              />
            ))) : (<p>No countries found...</p>)
          }
        </div>
       </div>
      }/>
     <Route path='/:countryCode' element={<CountryDetail darkMode={darkMode}/>} />
     </Routes>
    
    </div>
  )
}

export default App