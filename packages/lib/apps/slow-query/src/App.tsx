import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { List } from './pages/List'
import { Detail } from './pages/Detail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </Router>
  )
}

export default App
