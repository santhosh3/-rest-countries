import React from 'react'
import '../App.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {useNavigate,useParams} from 'react-router'

function CountryDetail ({darkMode,countries}) {
  let params = useParams();
  let navigate = useNavigate();

  let name;
  let flagImg;
  let nativeName;
  let population;
  let region;
  let subregion;
  let capital;
  let topLevelDomain;
  let currencies = [];
  let languages = [];
  let borders = [];

  countries.forEach((country) => {
    if(country.alpha3Code == params.countryCode){
      name = country.name;
      flagImg = country.flag;
      nativeName = country.nativeName;
      population = country.population;
      region = country.region;
      subregion = country.subregion;
      capital = country.capital;
      topLevelDomain = country.topLevelDomain;
      country.currencies?.forEach(currency => {
        currencies.push(currency.name);
      });
      country.languages?.forEach(language => {
        languages.push(language.name);
      });
      country.borders?.forEach(border => {
        borders.push(border);
      });
    }
  })
  console.log(currencies)
  const goback = () => {
    navigate('/')
  }
  return (
    <div >
      <div className='country_details'>
        <button onClick={goback} className={`back ${darkMode?'darkMode':''}`}>
            <ArrowBackIcon />
            <p>Go Back</p>
        </button>
        <div className='country-details-body'>
        <div className='image-container'>
            <img src= {flagImg} height={400} width={500} alt=''/>
        </div>
        <div className='info'>
        <h2 className='flag-name'>{name}</h2>
        <div className='info-container'>
            <div className='left_info'>
                <p> Native Name: <span className={`values ${darkMode?'darkMode':''}`}>{nativeName}</span>
                </p>
                <p> Population:{" "} <span className={`values ${darkMode?'darkMode':''}`}>{population}</span>
                </p>
                <p> Region:{" "} <span className={`values ${darkMode?'darkMode':''}`}>{region}</span>
                </p>
                <p> Sub region:{" "} <span className={`values ${darkMode?'darkMode':''}`}>{subregion}</span>
                </p>
                </div>
                <div className='right_info'>
                <p> Capital: {" "}<span className={`values ${darkMode?'darkMode':''}`}>{capital}</span>
                </p> 
                <p> Top-level Domain:{" "} <span className={`values ${darkMode?'darkMode':''}`}>{topLevelDomain}</span>
                </p> 
                <p>Currencies:{" "}<span className={`values ${darkMode?'darkMode':''}`}>{currencies.join(', ')}</span></p>
                <p> Language: <span className={`values ${darkMode?'darkMode':''}`}>{languages.join(', ')}</span>
                </p>
                </div> 
        </div>
        Border Countries:
        {borders.length? (
          borders.map((border) => (
            <div className={`border_country ${darkMode?'darkMode':''}`}>
            {border}
            </div>
          ))
        ):(<div className={`values ${darkMode?'darkMode':''}`}>
            <p>No borders found</p>
        </div>)}
        </div>
      </div>
      </div>
    </div>
  )
}

export default CountryDetail 
