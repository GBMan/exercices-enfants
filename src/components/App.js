import React, {useState} from 'react'
import '../scss/app.scss'
import ComplementTen from './exercices/ComplementTen'
import Multiplication from './exercices/Multiplication'
import Invariables from './exercices/Invariables'

const LEVEL_CP = "cp"
const LEVEL_CE2 = "ce2"
const LEVEL_CE2_INVARIABLES = "ce2i"

function App() {
  const [level, setLevel] = useState(LEVEL_CE2_INVARIABLES)

  function handleClickCP(event) {
    setLevel(LEVEL_CP)
  }

  function handleClickCE2(event) {
    setLevel(LEVEL_CE2)
  }

  function handleClickCE2Invariables(event) {
    setLevel(LEVEL_CE2_INVARIABLES)
  }

  return (
    <div className="app">
      <header className="app--header">
        <button className="btn app--header-btn" onClick={handleClickCP}>CP - Complément à 10</button>
        <button className="btn app--header-btn" onClick={handleClickCE2}>CE2 - Multiplication</button>
        <button className="btn app--header-btn" onClick={handleClickCE2Invariables}>CE2 - Mots invariables</button>
      </header>
      <main className="app--main">
        {level === LEVEL_CP && <ComplementTen />}
        {level === LEVEL_CE2 && <Multiplication />}
        {level === LEVEL_CE2_INVARIABLES && <Invariables />}
      </main>
      <footer className="app--footer">
        Développé par <a href="https://sablons.fr" className="app--footer-link" target="_blank">Charles</a>
      </footer>
    </div>
  );
}

export default App;
