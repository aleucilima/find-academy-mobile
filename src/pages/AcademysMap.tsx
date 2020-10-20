import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import  MapView, { PROVIDER_GOOGLE, Marker, Callout }  from 'react-native-maps'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

import mapMarker from '../images/map-marker.png'
import api from '../services/api'

interface Academy {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}


export default function AcademysMap(){
    const [academys, setAcademys] = useState<Academy[]>([])
    const navigation = useNavigation()

  useFocusEffect(() => {
    api.get('academys').then(response => {
      setAcademys(response.data)
    })
  })

    function handleNavigateToAcademyDetails(id: number){
        navigation.navigate('AcademyDetails', { id })
    }

    function handleNavigateToCreateAcademy() {
        navigation.navigate('SelectMapPosition')
    }
    return (
        <View style={styles.container}>
            <MapView 
                provider={PROVIDER_GOOGLE}
                style={styles.map} 
                initialRegion={{
                    latitude: -10.3408389,
                    longitude: -48.2976554,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                }}
            >
              {academys.map(academy => {
                return (
                  <Marker
                      key={academy.id}
                      icon={mapMarker}
                      calloutAnchor={{
                          x: 2.4,
                          y: 0.8,
                      }}
                      coordinate={{
                          latitude: academy.latitude,
                          longitude: academy.longitude,
                      }}
                  >
                  <Callout tooltip onPress={() => handleNavigateToAcademyDetails(academy.id)}>
                      <View style={styles.calloutContainer}>
                        <Text style={styles.calloutText}>{academy.name}</Text>
                      </View>
                  </Callout>
                  </Marker>
                )
              })}
            </MapView>
      
            <View style={styles.footer}>
                <Text style={styles.footerText}>{academys.length} academias encontradas</Text>
            
                <RectButton style={styles.createAcademyButton} onPress={handleNavigateToCreateAcademy}>
                    <Feather name="plus" size={20} color="#fff"/>
                </RectButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  
    calloutContainer:{
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
      elevation: 5,
    },
  
    calloutText:{
      color: '#0a0a0a',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold'
    },
  
    footer:{
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#fff',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 5,
    },
  
    footerText:{
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3'
    },
    
    createAcademyButton: {
      width: 56,
      height: 56,
      backgroundColor: '#0a0a0a',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
)