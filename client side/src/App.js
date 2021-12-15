import './App.css';
import {Switch , Route} from 'react-router-dom'
import Join from './components/Join/Join'
import Chat from './components/Chats/Chat'

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Join} />
        <Route path="/chat" component={Chat} />
      </Switch>
    </>
  );
}

export default App;
