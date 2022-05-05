
import {Text, View, Image, StyleSheet} from  'react-native'
import React, {useState, useEffect} from 'react'
import globalStyles from '../Styles'
import { formatearCantidad } from '../Helpers'
import CircularProgress from 'react-native-circular-progress-indicator'
const ControlPresupuesto = ({presupuesto, gastos}) => {
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => Number(gasto.cantidad ) + total, 0 )
        const totalDisponible = presupuesto - totalGastado

        setGastado(totalGastado)
        setDisponible(totalDisponible)
    }, [gastos])

  return (
    <View style={styles.contenedor}>
        <View style={styles.centrarGrafica}>
            <CircularProgress 
                value={50}
            
            />

        </View>
        <View style={styles.contenedorTexto}>
            <Text style={styles.valor}>
                <Text style={styles.label}>Presupuesto: € </Text>

                    {formatearCantidad(presupuesto)}
            </Text>

            <Text style={styles.valor}>
                <Text style={styles.label}>Disponible: € </Text>

                    {formatearCantidad(disponible)}
            </Text>

            <Text style={styles.valor}>
                <Text style={styles.label}>Gastado: € </Text>

                    {formatearCantidad(gastado)}
            </Text>

        </View>

    </View>
    
    )
}

const styles = StyleSheet.create({
    contenedor:{
       ...globalStyles.contenedor
    },
    centrarGrafica:{
        alignItems:'center'

    },
    imagen:{
        width: 250,
        height: 250

    },
    contenedorTexto:{
        marginTop: 40

    },
    valor:{
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 2
    },
    label:{
         fontWeight: '700',
         color: '#3B82F6'

    },


})

export default ControlPresupuesto