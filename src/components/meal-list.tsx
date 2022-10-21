import React, {useCallback, useEffect, useState} from 'react';
import {MealClient} from "../client/meal-client";
import {Meal} from "../model/meal";
import MealItem from "./meal-item";
import './meal-list.scss';
import ActionButton from "./action-button";
import {faRefresh} from "@fortawesome/free-solid-svg-icons";

const mealClient = new MealClient();

const shuffle = (array: Array<any>) => {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

const MealList = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const reload = () => {
        setIsLoading(true);
        mealClient.getAll().then((meals) => {
            console.log('Fetched meals', meals);
            shuffle(meals);
            setMeals(meals);
        }).finally(() => setIsLoading(false));
    }

    useEffect(reload, []);

    return (
        <>
            <div className={'action-buttons'}>
                <ActionButton icon={faRefresh} onClickHandler={ reload } active={isLoading}/>
            </div>
            <div id={'meal-list'}>
                {
                    meals.map(meal => <MealItem meal={meal} key={meal.id}/>)
                }
            </div>
        </>
    )
}

export default MealList;