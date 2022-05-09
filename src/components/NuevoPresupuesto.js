import React from 'react'
import { View, Text, TextInput, Pressable, StyleSheet} from 'react-native'
import globalStyles from '../Styles'

const NuevoPresupuesto = ({
    presupuesto, 
    setPresupuesto,
    handleNuevoPresupuesto
}) => {
    
    //useEffect(() => {
    //    const obtenerAS = async () => {
     //       try {
      //          const valor = await AsyncStorage.getItem('prueba_as')
      //          console.log(valor)
      //      } catch (error) {
     //               console.log(error)
      //      }
      //  }
    //}, [])
    //para recibir y mostrar lo que este guardado en AsyncStorage


//Si pones JSON.parse, lo reconoce como objeto y no como string.

   
    //useEffect(() => {
    //    const obtenerAS = async () => {
     //       try {
      //          const valor = await AsyncStorage.getItem('prueba_as')
      //          console.log ( JSON.parse(valor))
      //      } catch (error) {
     //               console.log(error)
      //      }
      //  }
    //}, [])

    //si quieres mostrar solo un objeto de la lista pones:
    //console.log ( JSON.parse(valor /[aqui el numero de posicion en el array]))


  return (
      <View style={styles.contenedor}>
        <Text style={styles.label}>Definir Presupuesto</Text>

        <TextInput 
          keyboardType='numeric' 
          placeholder='Agrega tu presupuesto:
          Ej. 300'
          style={styles.input}   
          value={presupuesto.toString() } //toString, para convertirlo en string.
          onChangeText={setPresupuesto}
        />


        <Pressable 
            style={styles.boton}
            onPress={() => 
            handleNuevoPresupuesto(presupuesto)}
        >
            <Text style={styles.botonTexto}>Agregar Presupuesto</Text>

        </Pressable>
      </View>
    )
}

const styles = StyleSheet.create ({
    contenedor:{
       ...globalStyles.contenedor
    },
    label:{
        textAlign:'center',
        fontSize: 24,
        color:'#3B82F6'

    },
    input:{
        backgroundColor: '#F5F5F5',
        padding:10,
        borderRadius: 10,
        textAlign:'center',
        marginTop: 30

    },
    boton:{
        marginTop:30,
        backgroundColor:'#1048A4',
        padding:10,
        borderRadius: 10

    },
    botonTexto:{
        color:'#FFF',
        textAlign:'center',
        textTransform:'uppercase',
        fontWeight: 'bold'

    },

})
export default NuevoPresupuesto