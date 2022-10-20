import axios from 'axios';
import {Meal} from "../model/meal";

export class MealClient {

    getAll = async (): Promise<Meal[]> => {
        console.log('Fetching from', process.env.REACT_APP_MEALS_API_ENDPOINT);
        const response = await axios.get(`${process.env.REACT_APP_MEALS_API_ENDPOINT}/meals`);
        return response.data as Meal[]
    }
}