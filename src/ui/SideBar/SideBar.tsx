import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './SideBar.module.css';

const SideBar = React.memo(() => {
	return (
		<div className={style.sideBar}>
			<ul>
				<li>
					<div>
						<NavLink to={'/'}>Converter</NavLink>
					</div>
				</li>
				<li>
					<div>
						<NavLink to={'/currencies'}>Currencies</NavLink>
					</div>
				</li>
			</ul>
		</div>
	)
})

export default SideBar;