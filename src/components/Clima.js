import React from 'react';
import PropTypes from 'prop-types';

const Clima = ({resultado}) => {
    // extraer los valores
    const {name, main } = resultado;
    if(!name) return null;
    const kelvin = 273.15;
    return (
        <div className="card-panel white col s12">
            <div className="black-text">
                <h2>El clima del {name} es: </h2>
                <p className="tempetratura">
                    {parseFloat(main.temp - kelvin).toFixed(2)} <span>&#x2103;</span>
                </p>
                <p>Temperatura Máxima
                    {parseFloat(main.temp_max - kelvin).toFixed(2)} <span>&#x2103;</span>
                </p>
                <p>Temperatura Miníma
                    {parseFloat(main.temp_min - kelvin).toFixed(2)} <span>&#x2103;</span>
                </p>
            </div>

        </div>
    );
}
Clima.propTypes = {
    resultado : PropTypes.object.isRequired,
}
 
export default Clima;