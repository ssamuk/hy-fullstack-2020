import React from 'react'
import Country from './Country'
import Button from './Button'

const Countries = ({searchTerm, countries}) => {

    let state = false;
    const handleClick = () => {
        state = true;
        console.log(state);
    }

    const filteredCountries = countries.filter(country =>
        country.name.match(new RegExp(searchTerm, 'i')))
        console.log(filteredCountries);
     
    const filteredLength = Object.keys(filteredCountries).length;

    if(searchTerm === '')
    return(
        <p>Start typing to filter countries list!</p>
    )
    else if (filteredLength > 10){
    return( 
    <h2>Too many countries,be more specific please.</h2>
    )
    }
    else if (filteredLength < 10 && filteredLength > 1) {

    return(
        <div>
            <ul>
                {filteredCountries.map(c =>
                <li>
                {c.name}
                <button onClick = {handleClick}>
                    show details
                </button>
                {state ? <Country country={filteredCountries.map((c) => c)}/> : null}
                </li>)}
                
            </ul>
        </div>
    )
    }
    else {
        console.log('HERE',filteredCountries.map((c) => c));
        return(
           <Country country={filteredCountries.map((c) => c)}/>  
        )   
}
}


export default Countries
