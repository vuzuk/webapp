import App from './components/App/App';
import { BSignUp, RSignUp } from './components/SignUp';
import { BLogIn, RLogIn } from './components/LogIn';
import {BloggerProfile, InBloggerProfile, InReaderProfile} from './components/Profile';
import CreatePost from './components/CreatePost/CreatePost'
import { Food, Travel, Tech, Fashion } from './components/Categories';
import Verification from './components/Verification/Verification';
import Post from './components/Post/Post';

const routes = [
    {
        path: '/',
        exact: true,
        component: App
    },
    {
        path: '/blogger/signup',
        component: BSignUp,
        title: 'Blogger Sign Up - VUZUK'
    },
    {
        path: '/reader/signup',
        component: RSignUp,
        title: 'Reader Sign Up - VUZUK'
    },
    {
        path: '/blogger/login',
        component: BLogIn,
        title: 'Blogger Login - VUZUK'
    },
    {
        path: '/reader/login',
        component: RLogIn,
        title: 'Reader Login - VUZUK'
    },
    {
        path: '/in/blogger',
        component: InBloggerProfile,
        title: 'Dashboard - VUZUK'
    },
    {
        path: '/in/reader',
        component: InReaderProfile,
        title: 'Dashboard - VUZUK'
    },
    {
        path: '/create',
        component: CreatePost,
        title: 'Create Post - VUZUK'
    },
    {
        path: '/post',
        component: Post,
        title: 'Post - VUZUK'
    },
    {
        path: '/blogger',
        component: BloggerProfile,
        title: 'Blogger Profile - VUZUK'
    },
    {
        path: '/food',
        component: Food,
        title: 'Food - VUZUK'
    },
    {
        path: '/travel',
        component: Travel,
        title: 'Travel - VUZUK'
    },
    {
        path: '/tech',
        component: Tech,
        title: 'Tech - VUZUK'
    },
    {
        path: '/fashion',
        component: Fashion,
        title: 'Fashion - VUZUK'
    },
    {
        path: '/verify/phone',
        component: Verification,
        title: 'Verify Phone - VUZUK'
    }
];

export default routes;