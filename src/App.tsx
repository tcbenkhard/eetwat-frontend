import React from 'react';
import './App.scss';
import MealList from "./components/meal-list";

const App = () => {
  return (
      <div id={'content'}>
        <MealList />
      </div>
  )
}

export default App;