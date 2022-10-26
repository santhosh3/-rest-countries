
import React,{useEffect,useState}from 'react'
import '../App.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {useNavigate,useParams} from 'react-router'
import { Link } from 'react-router-dom'

function CountryDetail () {

  let params = useParams();
  let navigate = useNavigate();

  const [country, setCountry] = useState([]);

  useEffect(() => {
    const getSingleCountry = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v2/alpha/${params.countryCode}`);
        const data = await res.json();
        setCountry(data);
      } catch (error) {
        console.error(error);
      }
    };
    getSingleCountry();
  }, []);

  
  const goback = () => {
    navigate('/')
  }

     let languages = []
      country.languages?.forEach(element => {
         languages.push(element.name)
     });
   

     let borders = []
     console.log(country.borders)
     country.borders?.forEach((element) => {
       borders.push(element)
     })
     
     console.log(borders);

    const changeCountry = (border) => {
      navigate(`../${border}`)
    }

  return (
    <>
       <button onClick={goback} className={`back`}>
       <ArrowBackIcon />
       <p>Go Back</p>
        </button>
       <section className='country_details'>
        <div className='country-details-body'>
          <div className='image-container'>
            <img src={country.flag} alt={country.name} />
          </div>
          <div className='info'>
            <h2 className='flag-name'>{country.name}</h2>
            <div className='info-container'>
              <div className='left-info'>
              <p> Native Name: <span className={`values`}>{country.nativeName}</span>
              </p>
              <p> Population:{" "} <span className={`values`}>{country.population}</span>
              </p>
              <p> Region:{" "} <span className={`values`}>{country.region}</span>
            </p>
            <p> Sub region:{" "} <span className={`values`}>{country.subregion}</span>
            </p>
              </div>
              <div className='right_info'>
              <p> Capital: {" "}<span className={`values`}>{country.capital}</span>
              </p> 
              <p> Top-level Domain:{" "} <span className={`values`}>{country.topLevelDomain}</span>
              </p> 
              <p>Currencies:{" "}<span className={`values`}>{country.demonym}</span></p>
              <p> Language: <span className={`values`}>
                {
                 languages.join(', ')
                }
              </span>
             </p>
              </div>
            </div>
            Border Countries:
            {borders.length? (
             country.borders?.map((border) => (
              <div className={`border_country`}>
              <button className='btn' onClick={changeCountry(border)}>{border}</button>
              </div>
             ))
             ):(<div className={`values`}>
            <p>No borders found</p>
            </div>)}
           
          </div>
        </div>
       </section>
    </>
  );
}

export default CountryDetail 
