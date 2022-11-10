import MealList from "../components/meal-list";
import {useEffect, useState} from "react";
import {Meal} from "../model/meal";
import {MealClient, MealClientContext} from "../client/meal-client";
import Controls from "../components/controls";
import ActionButton from "../components/action-button";
import {faPlus, faRefresh, faSignIn, faSignOut} from "@fortawesome/free-solid-svg-icons";
import './overview.scss';
import LoginModal from "../components/login-modal";
import {Auth} from 'aws-amplify';
import CreationModal, {CreateMealRequest} from "../components/creation-modal";

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
    const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);
    const [creationModalVisible, setCreationModalVisible] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [user, setUser] = useState();

    useEffect(() => {
        Auth.currentUserPoolUser().then(currentUser => {
            console.log('current user', currentUser);
            setUser(currentUser);
        }).catch(() => setUser(undefined));
    }, []);

    const signIn = (username: string, password: string) => {
        console.log(`Login clicked: ${username}:${password}`);
        Auth.signIn(username, password)
            .then(user => {
                console.log('Sign in processed', user)
                setLoginModalVisible(false);
                setUser(user);
            })
            .catch(error => {
                console.error('Sign in failed', error);
                setError(error.message);
            });
    }

    const onSuccess = () => {
        setCreationModalVisible(false);
        reload();
    }

    const signOut = () => {
        Auth.signOut({ global: true }).then(() => console.log('Signed out.'));
        setUser(undefined);
    }

    const closeLoginModal = () => {
        setLoginModalVisible(false);
        setError(undefined);
    }

    const closeCreationModal = () => {
        setCreationModalVisible(false);
        setError(undefined);
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
        <MealClientContext.Provider value={mealClient}>
            <div id={'overview'}>
                <LoginModal visible={loginModalVisible} close={closeLoginModal} loginClicked={signIn} error={error}/>
                <CreationModal visible={creationModalVisible} close={closeCreationModal} onSuccess={onSuccess}/>
                <Controls>
                    <ActionButton icon={faRefresh} onClickHandler={ reload } active={isLoading} />
                    { user ? <ActionButton icon={faPlus} onClickHandler={() => setCreationModalVisible(true) } /> : '' }
                    { user ?
                        <ActionButton icon={faSignOut} onClickHandler={ signOut } /> :
                        <ActionButton icon={faSignIn} onClickHandler={ () => setLoginModalVisible(true) } />
                    }
                </Controls>
                <MealList meals={meals}/>
            </div>
        </MealClientContext.Provider>
    )
}

export default OverviewPage;