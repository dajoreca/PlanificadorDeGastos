
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Pressable,
  Image,
  Modal



} from 'react-native';
//import deepDiffer from 'react-native/Libraries/Utilities/differ/deepDiffer';

import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto'
import { generarId } from './src/Helpers'
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {

  const [isValidPresupuesto,setIsValidPresupuesto] = useState(false)
  const [presupuesto,setPresupuesto] = useState(0)
  const [gastos, setGastos] = useState([])
  const [modal, setModal] = useState(false)
  const [gasto, setGasto] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])


  //ejemplo de como almacenar datos con async

  //useEffect(() => {
   // const AlmacenarAS = async () => {
    //  const nombre = 'Dani'
     // await AsyncStorage.setItem('prueba_as', nombre)
     //console.log('almacenado')
    //}
  //}, [])
  

    //useEffect(() => {
   // const AlmacenarAS = async () => {
    //  const nombre = 'Dani'
     // await AsyncStorage.setItem('prueba_as', JSON.stringify(nombre))
     //console.log('almacenado')
    //}
  //}, [])

//si quieres almacenar string, tienes que usar JSON.srtingify y para que te vuelva
//a salir como objeto tienes que poner JSON.parse

  useEffect(() => {
    const obtenerPresupuestoStorage = async () => {
      try {
        const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto') ?? 0
       
        if(presupuestoStorage > 0) {
          setPresupuesto(presupuestoStorage)
          setIsValidPresupuesto(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
    obtenerPresupuestoStorage()
  }, [])



  useEffect(() => { 
    if(isValidPresupuesto) {
      const guardarPresupuestoStorage = async () => {
        try {
          await AsyncStorage.setItem('planificador_presupuesto', presupuesto)
        } catch (error) {
          console.log(error)
        }
      }
      guardarPresupuestoStorage()
    }
  }, [isValidPresupuesto])

  useEffect (() => {
    const obtenerGastosStorage = async () => {
      try {
        const gastosStorage = await AsyncStorage.getItem('planificador_gastos') 
        setGastos( gastosStorage ? JSON.parse(gastosStorage): [])
      } catch (error) {
        console.log(error)
      }
    }
    obtenerGastosStorage()
  },[])

  useEffect(() => {
    const guardarGastosStorage = async () => {
      try {
        await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos))
      } catch (error) {
        console.log(error)
      }
    }
    guardarGastosStorage();
  }, [gastos])


  const handleNuevoPresupuesto = (presupuesto) => {
    if (Number(presupuesto) > 0){
      setIsValidPresupuesto(true)
    } else{
        Alert.alert('Error', 'El presupuesto no puede ser 0 o menor', [{ text: "OK" }])
    }
  }


  const handleGasto = gasto => {

      if([ gasto.nombre, gasto.categoria, gasto.cantidad ].includes('') ) {
        Alert.alert(
          "Error",
          "Todos los campos son obligatorios",
          [{text: 'OK'}]
        )
        return
      }

      if(gasto.id) {
        const gastosActualizados = gastos.map(gastoState => gastoState.id 
          === gasto.id ? gasto : gastoState)
          setGastos(gastosActualizados)
      } else {
          //Añadir el nuevo gasto al state
          gasto.id = generarId()
          gasto.fecha = Date.now()
          setGastos([...gastos, gasto])
      }
      setModal(!modal)
  }

  const eliminarGasto = id => {

    //Alert.alert(
      //'¿Desea eliminar este gasto?',
      //'Un gasto eliminado no se puede recuperar',
      //[
       // { text: 'No', style:'cancel'},
        //{ text: 'Si, Eliminar', onPress: () => {
          console.log('gasto principio', gasto)
          const gastosActualizados = gastos.filter( gastoState => 
          gastoState.id !== id )

          setGastos(gastosActualizados)

          setModal(!modal)
          setGasto({})

        //}}
      //]
    //)
  }

  const resetearApp = () => {
    Alert.alert(
      '¿Deseas resetear la app?',
      'Esto eliminarará presupuestos y gastos',
      [
        {text: 'No', style: 'Cancel'},
        {text: 'Si, Eliminar', onPress: async () => {
          try {
            await AsyncStorage.clear()

            setIsValidPresupuesto(false)
            setPresupuesto(0)
            setGastos([])
            
          } catch (error) {
            console.log(error)
          }
        }}
      ]
    )
  }


  return (
      <View style={styles.contenedor}>
        <ScrollView>
          <View style={styles.header}>
              <Header />

              {isValidPresupuesto ? (
                <ControlPresupuesto
                  presupuesto={presupuesto} 
                  gastos={gastos}
                  resetearApp={resetearApp}
                /> 
              ) : (
              
                <NuevoPresupuesto 
                  presupuesto={presupuesto}
                  setPresupuesto={setPresupuesto}
                  handleNuevoPresupuesto={handleNuevoPresupuesto}
              />
              
              )}
              
          </View>

          {isValidPresupuesto && (
            <>
              <Filtro 
                filtro={filtro}
                setFiltro={setFiltro}
                gastos={gastos}
                setGastosFiltrados={setGastosFiltrados}
              />
              <ListadoGastos 
                gastos={gastos}
                setModal={setModal}
                setGasto={setGasto}
                gastosFiltrados={gastosFiltrados}
                filtro={filtro}
              />
            </>
          )}

        </ScrollView>

        {modal && (
              <Modal
                animationType='slide'
                visible={modal}
                onRequestClose={() =>{
                  setModal(!modal)
                }}

              >
                <FormularioGasto 
                  setModal={setModal}
                  handleGasto={handleGasto}
                  gasto={gasto}
                  setGasto={setGasto}
                  eliminarGasto={eliminarGasto}
                />

              </Modal>
            )}

        {isValidPresupuesto && (
          <Pressable
            style={styles.pressable}
            onPress={() => setModal(!modal)}
          >
            
            <Image 
              style={styles.imagen}
              source={require('./src/img/nuevo-gasto.png')}
            />
          </Pressable>

        )}
        
      </View>     
  );
};



const styles = StyleSheet.create({
  contenedor:{
    backgroundColor: '#F5F5F5',
    flex: 1
  },
  header: {
    backgroundColor:'#3B82F6',
    minHeight: 400

  },
  pressable:{
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 40,
    right: 30

  },

  imagen:{
    width: 60,
    height: 60,

  }

});

export default App;
