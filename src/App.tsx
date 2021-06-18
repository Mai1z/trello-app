import React from 'react';
import { Column } from './components/Column'
import { Card } from './components/Card'
import { AddNewItem } from './components/AddNewItem'
import { AppContainer } from './styles'

function App() {
  return (
      <AppContainer>
          <Column text='To do'>
              <Card text='Generate App'/>
          </Column>
          <Column text='In progress'>
              <Card text='Learn TS'/>
          </Column>
          <Column text='Done'>
              <Card text='Begin to use static typing'/>
          </Column>
          <AddNewItem onAdd={ console.log } toggleButtonText='+ Add list'/>
      </AppContainer>
  );
}

export default App;
