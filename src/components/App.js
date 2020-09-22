import React, {useState} from 'react'
import '../scss/app.scss'
import ComplementTen from './exercices/ComplementTen'
import Multiplication from './exercices/Multiplication'
import Invariables from './exercices/Invariables'
import Double from './exercices/Double'

const LEVEL_CP = "cp"
const LEVEL_CP_DOUBLE = "cpdouble"
const LEVEL_CE2_MULTIPLICATION = "ce2m"
const LEVEL_CE2_INVARIABLES = "ce2i"

function App() {
  const [level, setLevel] = useState(LEVEL_CE2_MULTIPLICATION)

  function handleClickChoice(level) {
    setLevel(level)
  }

  return (
    <div className="app">
      <header className="app--header">
        <button className="btn app--header-btn" onClick={(event) => handleClickChoice(LEVEL_CP)}>CP - Complément à 10</button>
        <button className="btn app--header-btn" onClick={(event) => handleClickChoice(LEVEL_CP_DOUBLE)}>CP - Double</button>
        <button className="btn app--header-btn" onClick={(event) => handleClickChoice(LEVEL_CE2_INVARIABLES)}>CE2 - Mots invariables</button>
        <button className="btn app--header-btn" onClick={(event) => handleClickChoice(LEVEL_CE2_MULTIPLICATION)}>CE2 - Multiplication</button>
      </header>
      <main className="app--main">
        {level === LEVEL_CP && <ComplementTen />}
        {level === LEVEL_CP_DOUBLE && <Double />}
        {level === LEVEL_CE2_INVARIABLES && <Invariables />}
        {level === LEVEL_CE2_MULTIPLICATION && <Multiplication />}
      </main>
      <footer className="app--footer">
        Développé par <a href="https://sablons.fr" className="app--footer-link" target="_blank">Charles</a>
      </footer>
    </div>
  );
}

export default App;
