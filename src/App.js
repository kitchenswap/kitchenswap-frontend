import { Switch, Route, NavLink, useHistory } from 'react-router-dom';
import Tilt from './Tilt';

const AccountButton = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/connect');
  }

  return (
    <button
      className='accountbutton primary'
      onClick={handleClick}
    >
      Connect
    </button>
  )
}

const Home = () => {
  return (
    <Tilt className="tilt" max={5} scale={1.03}>
      <div className="logo-white">
        <b>kitchen</b>swap
      </div>
    </Tilt>
  );
};

const NoMatch = () => {
  return (
    <>Nothing found!</>
  );
};

const Earn = () => {
  return (
    <>Earn</>
  );
};

const Exchange = () => {
  return (
    <>Exchange</>
  );
};

const App = () => {
  return (
    <div className='app'>
      <header>        
        <div className='header-logo-nav-account'>
          <div className='navlogo left'>
            <NavLink to='/'>  
              <img src='/logo192.png' alt='kitchenswap' />
              <b>kitchen</b>swap
            </NavLink>
          </div>
          <div className='center'>
            <nav>
              <div>
                <NavLink to='/earn'>
                  Earn
                </NavLink>
                <NavLink to='/exchange'>
                  Exchange
                </NavLink>
              </div>
            </nav>
          </div>
          <div className='right'>
            <AccountButton />
          </div>
        </div>
      </header>

      <section className='main'>
        <div>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/earn'>
              <Earn />
            </Route>
            <Route path='/exchange'>
              <Exchange />
            </Route>
            <Route>
              <NoMatch />
            </Route>
        </Switch>
        </div>
      </section>
      <footer>
        <div className="copyrights">
          <NavLink to='/'>  
            <img src='/logo192.png' alt='kitchenswap' />
            <b>kitchen</b>swap
          </NavLink>
          <NavLink to='/earn'>Earn</NavLink>
          <NavLink to='/exchange'>Exchange</NavLink>
          <NavLink to='/account'>Account</NavLink>
          <a href='https://twitter.com/kitchen_swap' target='_blank' rel='noopener noreferrer'>Twitter</a>
          <a href='https://medium.com/@kitchenswap' target='_blank' rel='noopener noreferrer'>Medium</a>
          <a href='https://github.com/kitchenswap' target='_blank' rel='noopener noreferrer'>Github</a>
          <a href='https://kitchenswap-finance.gitbook.io/kitchenswap/contracts' target='_blank' rel='noopener noreferrer'>Contracts</a>
          <a href='https://kitchenswap-finance.gitbook.io/kitchenswap/' target='_blank' rel='noopener noreferrer'>Docs</a>
          <a href='https://kitchenswap-finance.gitbook.io/kitchenswap/roadmap' target='_blank' rel='noopener noreferrer'>Roadmap</a>
          <a href='javascript:alert("Coming soon!")'>Audit</a>{/* eslint-disable-line jsx-a11y/anchor-is-valid, no-script-url*/}
        </div>
        
      </footer>
    </div>
  );
}

export default App;
