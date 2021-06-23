import React from 'react';
import { Column } from './components/Column'
import { AddNewItem } from './components/AddNewItem'
import { AppContainer } from './styles'
import { useAppState } from './app-state/AppStateContext'

const App = () => {
    const { state, dispatch } = useAppState()

    return (
      <AppContainer>
          { state.lists.map( (list, i) => (
              <Column id={ list.id } text={ list.text } key={ list.id } index={ i }/>
          ))}
          <AddNewItem
              onAdd={ text => dispatch({ type: "ADD_LIST", payload: text}) }
              toggleButtonText="+ Add list"
          />
      </AppContainer>
    );
}

export default App;
