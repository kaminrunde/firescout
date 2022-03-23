import * as React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [on, setOn] = React.useState(false)
  const [tOn, setTOn] = React.useState(false)
  const [t2On, setT2On] = React.useState(false)
  const [t3On, setT3On] = React.useState(false)

  React.useEffect(() => {
    if(on) setTOn(true)
    else setTOn(false)
  }, [on])


  React.useEffect(() => {
    if(tOn) setT2On(true)
    else setT2On(false)
  }, [tOn])

  React.useEffect(() => {
    if(tOn) Promise.resolve().then(() => setT3On(true))
    else Promise.resolve().then(() => setT3On(false))
  }, [t2On])


  return (
    <article data-cy-ctx='App'>
      <button data-cy-handle='btn' onClick={()=>setOn(!on)}>switch</button>
      <span data-cy-state={on && 'on'}>{on ? 'on' : 'off'}</span>
      <div data-cy-state={tOn && 'ton'}>{tOn ? 'ton' : 'toff'}</div>
      <h1 data-cy-state={t2On && 't2on'}>{t2On ? 't2on' : 't2off'}</h1>
      <h1 data-cy-state={t3On && 't3on'}>{t2On ? 't3on' : 't3off'}</h1>
    </article>
  );
}

export default App;
