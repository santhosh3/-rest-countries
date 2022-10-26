
import React from 'react'
import '../App.css'

function Country({darkMode, name, capital, population, region, flag,code,showDetails}) {
  const showDetailsHandler = () => {
    showDetails(code)
  }
  return (
    <div className={`country ${darkMode?'darkMode':''}`} onClick={showDetailsHandler}>
        <div className='flag_container'>
            <img src= {flag} alt="flags" />
        </div>
        <div className='details'>
            <h2 className={`values ${darkMode ? 'darkMode':''}`}>{name}</h2>
            <p>Population:{" "}
             <span className={`values ${darkMode ? 'darkMode':''}`}>{population}</span>
            </p>
            <p>Region:{" "}
             <span className={`values ${darkMode ? 'darkMode':''}`}>{region}</span>
            </p>
            <p>Capital:{" "}
             <span className={`values ${darkMode ? 'darkMode':''}`}>{capital}</span>
            </p>
        </div>
    </div>
  )
}

export default Country


