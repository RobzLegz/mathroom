import React from 'react'
import { useSelector } from 'react-redux';
import { selectRooms } from '../redux/slices/roomSlice';

function DisplayMultiplayertask() {
    const roomInfo = useSelector(selectRooms);

    return (
        <div>
            
        </div>
    )
}

export default DisplayMultiplayertask
