import {Routes, Route, Navigate} from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'
import {AuthPage} from './pages/AuthPage'

export const useRoutes = isAuth => {
    if (isAuth)
        return (
            <Routes>
                <Route path="/links" element={<LinksPage/>} exact/>
                <Route path="/create" element={<CreatePage/>} exact/>
                <Route path="/detail/:id" element={<DetailPage/>}/>
                <Route path="*" element={<Navigate to="/create" replace/>}/>
            </Routes>
        )

    return (
        <Routes>
            <Route path="/" exact element={<AuthPage/>}/>
            <Route path="*" exact element={<Navigate to="/" replace/>}/>
        </Routes>
    )
}
