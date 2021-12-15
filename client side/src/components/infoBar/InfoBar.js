import React from 'react'
import './Infobar.css'
import ContactlessIcon from '@material-ui/icons/Contactless';
import CancelIcon from '@material-ui/icons/Cancel';
import {NavLink} from 'react-router-dom'

const InfoBar = ({room}) => {
    return (
        <>
            <div className="infoBar">
                <div className="leftInnerContainer">
                    <ContactlessIcon/>
                    <h3>{room}</h3>
                </div>

                <div className="RightInnerContainer">
                <NavLink to="/">
                    <CancelIcon />
                </NavLink>
                </div>
            </div>
        </>
    )
}

export default InfoBar
