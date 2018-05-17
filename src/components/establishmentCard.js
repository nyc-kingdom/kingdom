import React from 'react'
import { Link } from 'react-router-dom'
import {markersImages} from '../Assets'

const establishmentCard = props => (
    <div className="establishmentCard">
        <h3>{props.establishmentName}</h3>
        <Link to={`/profile/establishments/${props.establishmentId}`}> Details </Link>
        <br />
        <div>
            {
                props.allegiance
                    ? props.allegiance + " Kingdom"
                    : props.origin 
            }
        </div>
        <br />
        <img    style={{ width: '5vw', height: 'auto', padding: '5px' }}    src={markersImages[props.allegianceDisplay]}/>
        <br />
        <button
            className='powerButtonEst'
            onClick={props.handleClick}
        >
            Check in here!
        </button>
        <br />
        <button
            className='escape'
            onClick={() => { props.changeSelection(props.establishmentId) }}
        >
            X
        </button>
    </div>
)

export default establishmentCard