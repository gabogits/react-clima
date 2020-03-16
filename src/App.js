import React,  {Fragment,useState, useEffect} from 'react';
import Header from './components/Header'
import Form from './components/Form'
import Clima from './components/Clima'
import Error from './components/Error'


function App() {
  const [busqueda, guardarbusqueda] = useState({
    ciudad: '',
    pais:''
  });
  
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);


  const {ciudad, pais} = busqueda;
  
  useEffect(() => {

    const consultarAPI = async () => {
      if(consultar) {
        const appId = '8006b422150ebab40dee3ada5536bba5';
        const url =  `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
       guardarResultado(resultado)
       guardarConsultar(false)
        //http://api.openweathermap.org/data/2.5/weather?q=guadalajara,mexico&appid=c11a5e2033f0f29d1b7944c7a5563668

        //detecta si hubo resultados correctos en la consulta
          
        if(resultado.cod === "404"){
          guardarError(true)
        }else {
          guardarError(false)
        }
      }
    }
    consultarAPI();
    //para evitar los errores de dependencias cuando tienes ya usada las varibles importantes
    //eslint-disable-next-line 
  }, [consultar])
  let componente;

  if(error) {
    componente = <Error mensaje="No hay resultados" />
  }else {
    componente = <Clima resultado={resultado} />
  }

  return (
   <Fragment>
     <Header titulo="Clima React App" />
     <div className="contenedor-form">
       <div className="container">
        <div className="row">
              <div className="col m6 s12">
            <Form  busqueda={busqueda} guardarbusqueda= {guardarbusqueda} guardarConsultar={guardarConsultar} />
            </div>
            <div className="col m6 s12">
              {componente} 
            </div>
          </div>
       </div>
     </div>
   </Fragment>
  );
}

export default App;
