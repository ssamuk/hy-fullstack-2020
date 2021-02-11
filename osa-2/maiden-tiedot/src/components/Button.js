import React from 'react'
import Country from './Country'


const Button = ({text, country}) => {

    const showDetails = () => {
        console.log('Im at function', country);
        let arr = [];
        arr.push(country)
        console.log('arr', arr);
        return (
            <div>
                <Country country={arr}/>
            </div>
        )
    }

    return(
        <button
            onClick = {() => showDetails()}>
            {text}
        </button>
    )
}


export default Button