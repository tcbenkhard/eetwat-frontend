import {Meal} from "../model/meal";
import './meal-item.scss';
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface MealItemProps {
    meal: Meal
}

const MealItem = ({meal}: MealItemProps) => {
    return (
        <div className={'meal-item'}>
            <span className={'meal-item-icon'}><img alt="placeholder" src={'https://via.placeholder.com/150'}></img></span>
            <span className={'meal-item-body'}>
                <span className={'meal-item-body-title'}>{meal.name}</span>
                <span className={'meal-item-body-specs'}><FontAwesomeIcon icon={faClock} color={'green'}></FontAwesomeIcon> {meal.durationInMinutes} min</span>
                <span className={'meal-item-body-tags'}>{meal.tags.map(tag => <span key={tag} className={'tag'}>{tag}</span>)}</span>
            </span>
        </div>
    );
}

export default MealItem;