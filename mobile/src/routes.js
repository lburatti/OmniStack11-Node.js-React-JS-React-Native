import React from 'react';
// importando módulo de estrutura para acesso as rotas (idem: BrowserRouter do frontend)
import { NavigationContainer } from '@react-navigation/native';
// importando Stack Navigator
import { createStackNavigator } from '@react-navigation/stack';

// criando nosso App mobile
const AppStack = createStackNavigator();

// importando pages
import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

export default function Routes() {
    return (
        <NavigationContainer>
            {/* propriedade screenOptions -> headerShown:false -> p/ não usar cabeçalho padrão */}
            <AppStack.Navigator screenOptions={{ headerShown: false }}>

                {/* 1 AppStack.Screen para cada rota. Ele recebe os componentes */}
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Detail" component={Detail} />

            </AppStack.Navigator>

        </NavigationContainer>
    );
}
