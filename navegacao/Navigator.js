import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import TelaInicial from '../telas/TelaInicial';
import TelaResultadoBusca from '../telas/TelaResultadoBusca';
import TelaMapa from '../telas/TelaMapa';

const Navigator = createStackNavigator({

    Inicial: TelaInicial,
    Resultado: TelaResultadoBusca,
    Mapa: TelaMapa

});

export default createAppContainer(Navigator);