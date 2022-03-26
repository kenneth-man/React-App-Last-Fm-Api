import HomeIcon from '@mui/icons-material/Home';
import AlbumIcon from '@mui/icons-material/Album';
import MicIcon from '@mui/icons-material/Mic';
import BarChartIcon from '@mui/icons-material/BarChart';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import PersonIcon from '@mui/icons-material/Person';

export const navbarData = [
    {
        route: '/',
        icon: <HomeIcon/>,
        text: 'Home'
    },
    {
        route: '/Album',
        icon: <AlbumIcon/>,
        text: 'Album'
    },
    {
        route: '/Artist',
        icon: <MicIcon/>,
        text: 'Artist'
    },
    {
        route: '/Chart',      
        icon: <BarChartIcon/>,
        text: 'Chart'
    },
    {
        route: '/Track',
        icon: <AudiotrackIcon/>,
        text: 'Track'
    },
    {
        route: '/Profile/:profileName',
        icon: <PersonIcon/>,
        text: 'Profile'
    },
]