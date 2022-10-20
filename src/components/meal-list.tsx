import React, {useCallback, useEffect, useState} from 'react';
import {MealClient} from "../client/meal-client";
import {Meal} from "../model/meal";
import MealItem from "./meal-item";
import './meal-list.scss';

const mealClient = new MealClient();

const shuffle = (array: Array<any>) => {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

export default () => {
    const [meals, setMeals] = useState<Meal[]>([]);

    useEffect(() => {
        mealClient.getAll().then((meals) => {
            console.log('Fetched meals', meals);
            shuffle(meals);
            setMeals(meals);
        });}
    , []);

    return (
        <div id={'meal-list'}>
            {
                meals.map(meal => <MealItem meal={meal} key={meal.id}/>)
            }
        </div>
    )
}