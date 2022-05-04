import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Gasto from './Gasto'

const ListadoGastos = ({gastos}) => {
  return (
    <View style={styles.contenedor}>
        <Text style={styles.titulo}>Gastos</Text>

        {gastos.length === 0 ? 
            <Text style={styles.noGastos}>No Hay Gastos</Text> : 
            gastos.map(gasto => (
                <Gasto 
                    key={gasto.id}
                    gasto={gasto}
                    
                />
            )
            )}

    </View>
  )
}

const styles = StyleSheet.create({
    contenedor:{
      marginTop: 70,
      marginVertical: 100

    },
    titulo:{
      color: '#64748B',
      fontSize: 30,
      textAlign: 'center',
      fontWeight: '700',
      marginTop: 20

    },
    noGastos:{
      marginVertical: 20,
      textAlign: 'center',
      fontSize: 20

    }

})
export default ListadoGastos