import Login from '../pages/Login';
import Register from '../pages/Register';
import Page404 from '../pages/Page404';
import Home from '../pages/Home';
import Album from '../pages/Album';
import Artist from '../pages/Artist';
import Chart from '../pages/Chart';
import Track from '../pages/Track';
import Profile from '../pages/Profile';
import TagPage from '../pages/TagPage';
import Details from '../pages/Details';

export const routesData = [
    {
        route: '/',
        component: <Home/>,
        componentAlt: <Login/>
    },
    {
        route: '/Register',
        component: <Register/>
    },
    {
        route: '/404',
        component: <Page404/>
    },
    {
        route: '/Album',
        component: <Album/>
    },
    {
        route: '/Artist',
        component: <Artist/>
    },
    {
        route: '/Chart',
        component: <Chart/>
    },
    {
        route: '/Track',
        component: <Track/>
    },
    {
        route: '/Details/:detailsName',
        component: <Details/>
    },
    {
        route: '/Profile/:profileName',
        component: <Profile/>
    },
    {
        route: '/Tag/:tagName',
        component: <TagPage/>
    }
]