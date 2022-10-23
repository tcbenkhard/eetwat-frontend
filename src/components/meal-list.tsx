import React from 'react';
import {Meal} from "../model/meal";
import MealItem from "./meal-item";
import './meal-list.scss';

interface MealListProps {
    meals: Meal[]
}

const MealList = ({meals}: MealListProps) => {
    return (
        <div id={'meal-list'}>
            {
                meals.map(meal => <MealItem meal={meal} key={meal.id}/>)
            }
        </div>
    )
}

export default MealList;