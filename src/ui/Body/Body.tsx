import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Converter from '../Converter/Converter';
import CurrencyRate from '../CurrencyRate/CurrencyRate';
import SideBar from '../SideBar/SideBar';
import style from './Body.module.css';

const Body = React.memo(() => {
    return (
        <div className={style.body}>
            <SideBar/>
            <Switch>
                <Route exact path={'/'} render={() => <Converter/>}/>
                <Route path={'/currencies'} render={() => <CurrencyRate/>}/>
            </Switch>
        </div>
    )
});

export default Body;