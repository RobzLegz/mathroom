import React from 'react'
import { useSelector } from 'react-redux';
import { selectAdmin } from '../../../../redux/slices/adminSlice';

interface Level{
    instruction: string;
    correctValue: number;
    accepted: boolean;
    _id: string;
    difficulty: number;
    question: string;
    author: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

function AdminLevelContainer() {
    const adminInfo = useSelector(selectAdmin);

    if(!adminInfo.levels){
        return (
            <div className="communityPage__container__levels__body">
                <div className="communityPage__container__levels__body__message">
                    <strong>Loading community levels</strong>
                </div>
            </div>
        )
    }else if(adminInfo.levels.length === 0){
        return (
            <div className="communityPage__container__levels__body">
                <div className="communityPage__container__levels__body__message">
                    <strong>Searching for levels...</strong>
                    <p>You can create Your own level</p>
                </div>
            </div>
        )
    }

    return (
        <div className="communityPage__container__levels__body">
            {adminInfo.levels.map((level: Level) => {

            })}
        </div>
    )
}

export default AdminLevelContainer
