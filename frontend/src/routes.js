import React from 'react';
// importando móduto de rotas do react
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// importando pages
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes() {
    return (
        <BrowserRouter>
            {/* switch faz com que apenas 1 rota seja chamada por vez */}
            <Switch>
                {/* propriedade exact para chamar essa rota caso o caminho seja exato */}
                <Route path="/" exact component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/profile" component={Profile}></Route>
                <Route path="/incidents/new" component={NewIncident}></Route>
            </Switch>
        </BrowserRouter>
    );
}
