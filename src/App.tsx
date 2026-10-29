import { Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { Credits } from './pages/Credits'
import { Diary, DiaryEntryPage } from './pages/Diary'
import { Experiments } from './pages/Experiments'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Profile } from './pages/Profile'

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profilo" element={<Profile />} />
        <Route path="esperimenti" element={<Experiments />} />
        <Route path="diario" element={<Diary />} />
        <Route path="diario/:slug" element={<DiaryEntryPage />} />
        <Route path="crediti" element={<Credits />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
