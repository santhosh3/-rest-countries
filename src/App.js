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
  const noCountries = countries.status || countries.message
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error)
    }
  },[]);

  const fetchData = async() => {
    const response = await fetch("https://restcountries.com/v2/all");
    const resp = await response.json();

    if(resp.status === 404){
      setCountries([]);
      return;
    }

    setCountries(resp)
  }
  

  const searchCountries = (e) => {
    let {value} = e.target
    if(value.trim()){
      const fetchSearch = async() => {
        const response = await fetch(`https://restcountries.com/v2/name/${value}`)
        let data = await response.json();
         setCountries(data);
      };
      try {
        fetchSearch();
      } catch (error) {
        console.log(error)
      }
    } else {
      fetchData();
    }
  };

  const selectRegion = (e) => {
     let {value} = e.target
     if(value){
        const fetchSelect = async() => {
          const response = await fetch(`https://restcountries.com/v2/region/${value}`);
          console.log(value)
          const data = await response.json();
          if(value == "All"){
            try {
              fetchData()
            } catch (error) {
              console.log(error)
            }
            return;
          }
          setCountries(data);
        };
        try {
          fetchSelect()
        } catch (error) {
          console.log(error)
        }
     }
  }

  const showDetails = (code) => {
     navigate(`${code}`)
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
             <option>Africa</option>
             <option>Americas</option>
             <option>Asia</option>
             <option>Europe</option>
             <option>Oceania</option>
          </select>
          </div>
        </div>
        <div className='countries'>
          {
            !noCountries ? (countries.map((country) => (
              <Country darkMode={darkMode}
              key = {country.alpha3Code}
              code = {country.alpha3Code}
              name = {country.name}
              capital = {country.capital}
              population = {country.population}
              region = {country.region}
              flag = {country.flag}
              showDetails = {showDetails}
              />
            ))) : (<p>No countries found...</p>)
          }
        </div>
       </div>
      }/>
     <Route path='/:countryCode' element={<CountryDetail darkMode={darkMode} countries={countries}/>} />
     </Routes>
    
    </div>
  )
}

export default App