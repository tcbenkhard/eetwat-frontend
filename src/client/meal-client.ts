import axios from 'axios';
import {Meal} from "../model/meal";

export class MealClient {

    getAll = async (): Promise<Meal[]> => {
        console.log('Fetching from', process.env.REACT_APP_MEALS_API_ENDPOINT);
        const response = await axios.get(`${process.env.REACT_APP_MEALS_API_ENDPOINT}/meals`);
        return response.data as Meal[]
    }

    create = async (meal: Meal): Promise<Meal> => {
        // const currentSession = await Auth.currentSession();
        // const token = currentSession.getAccessToken().getJwtToken();

        const result = await axios.post(`${process.env.REACT_APP_MEALS_API_ENDPOINT}/meals`, meal);
        return result.data as Meal;
    }
}