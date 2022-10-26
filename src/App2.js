import React,{useState,useEffect} from 'react'
import './App.css'
import SearchIcon from '@mui/icons-material/Search'
import Country from './Container/Country'
import {useNavigate} from 'react-router-dom'

function App2({FilteredCountries,searchCountries,selectRegion,countriesList}) {
  const navigate = useNavigate()

  const showDetails = (name) => {
     navigate(`${name}`)
  }

  return (
    <div className={`app`}>
     <div className='app_body'>
        <div className='inputs'>
          <div className={`search_input`}>
            <SearchIcon />
            <input type="text" placeholder='search for a country...'  onChange={(e) => searchCountries(e)}/>
          </div>
          <div className={`select_region`}>
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
              <Country
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
    </div>
  )
}

export default App2