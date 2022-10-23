import MealList from "../components/meal-list";
import {useEffect, useState} from "react";
import {Meal} from "../model/meal";
import {MealClient} from "../client/meal-client";
import Controls from "../components/controls";
import ActionButton from "../components/action-button";
import {faRefresh, faSignIn} from "@fortawesome/free-solid-svg-icons";
import './overview.scss';
import LoginModal from "../components/login-modal";

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

const mealClient = new MealClient();

const OverviewPage = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const showLoginModal = () => {
        console.log('Sign in button pressed.');
        setModalVisible(true);
    }

    const signIn = (username: string, password: string) => console.log(`Login clicked: ${username}:${password}`);

    const closeModal = () => {
        console.log('Cancel clicked.')
        setModalVisible(false);
    }

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
        <div id={'overview'}>
            <LoginModal visible={modalVisible} onCancelClicked={closeModal} onLoginClicked={signIn}/>
            <Controls>
                <ActionButton icon={faRefresh} onClickHandler={ reload } active={isLoading} />
                <ActionButton icon={faSignIn} onClickHandler={ showLoginModal } />
            </Controls>
            <MealList meals={meals}/>
        </div>
    )
}

export default OverviewPage;