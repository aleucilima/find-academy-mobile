import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

import AcademysMap from './pages/AcademysMap'
import AcademyDetails from './pages/AcademyDetails'

import SelectMapPosition from './pages/CreateAcademy/SelectMapPosition'
import AcademyData from './pages/CreateAcademy/AcademyData'
import Header from './components/Header'

export default function Routes() {
    return(
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5'}  }}>
                <Screen 
                    name="AcademysMap" 
                    component={AcademysMap} 
                /> 
                
                <Screen 
                    name="AcademyDetails" 
                    component={AcademyDetails} 
                    options={{ 
                        headerShown: true, 
                        header: () => <Header showCancel={false} title="Academia"/> 
                        }}
                /> 
                
                <Screen 
                    name="SelectMapPosition" 
                    component={SelectMapPosition} 
                    options={{ 
                        headerShown: true, 
                        header: () => <Header title="Selecione no mapa"/> 
                        }}
                /> 
                
                <Screen 
                    name="AcademyData" 
                    component={AcademyData} 
                    options={{ 
                        headerShown: true, 
                        header: () => <Header title="Informe os dados"/> 
                        }}
                /> 
            </Navigator>
        </NavigationContainer>
    )
}