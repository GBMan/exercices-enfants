import React, {useState} from 'react'
import '../scss/app.scss'
import ComplementTen from './exercices/ComplementTen'
import Multiplication from './exercices/Multiplication'

const LEVEL_CP = "cp"
const LEVEL_CE2 = "ce2"

function App() {
  const [level, setLevel] = useState(LEVEL_CP)

  function handleClickCP(event) {
    setLevel(LEVEL_CP)
  }

  function handleClickCE2(event) {
    setLevel(LEVEL_CE2)
  }

  return (
    <div className="app">
      <header className="app--header">
        <button className="btn app--header-btn" onClick={handleClickCP}>CP</button>
        <button className="btn app--header-btn" onClick={handleClickCE2}>CE2</button>
      </header>
      <main className="app--main">
        {level === LEVEL_CP && <ComplementTen />}
        {level === LEVEL_CE2 && <Multiplication />}
      </main>
      <footer className="app--footer">
        Développé par Charles
      </footer>
    </div>
  );
}

export default App;
