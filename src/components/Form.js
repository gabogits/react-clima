import React, {useState} from 'react';
import Error from './Error'
import PropTypes from 'prop-types';

const Form = ({busqueda, guardarbusqueda, guardarConsultar}) => {
    // state del formulario
  
    const [error, guardarError] = useState(false);

    // extraer ciudad y pais
    const {ciudad, pais} = busqueda;
    // funcion que coloca los elementos en el state
    const  handleChange = e => {
        // actualizar el state
        guardarbusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }

        const handleSubmit = e => {
            e.preventDefault();

            //validar
            if(ciudad.trim() === '' || ciudad.trim() === '') {
                guardarError(true);
                return;
            }
            guardarError(false);
            //pasarlo al componente principal
            guardarConsultar(true)

        }
    return (
        <form onSubmit={handleSubmit} >
            {error ?<Error mensaje="Todos los campos son obligatorio" /> : null}
            <div className="input-field col s12">
                <input type="text" name="ciudad" id="ciudad" value={ciudad} onChange={handleChange} />
                <label htmlFor="ciudad">Ciudad:</label>
            </div>
            <div className="input-field col s12">
               <select name="pais" value={pais}  onChange={handleChange} >
                    <option value="">--seleccione un pais---</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
               </select>
               <label htmlFor="pais">Pais:</label>
            </div>
            <div className="input-field col s12">
                <input type="submit" value="Buscar clima" className="waves-effect waves-light btn-large btn-block yellow accent-4" />
            </div>
        </form>
    )
}
Form.propTypes = {
    
    busqueda : PropTypes.object.isRequired,
    guardarbusqueda :  PropTypes.func.isRequired,
    guardarConsultar :  PropTypes.func.isRequired,
    
}
export default Form;