import App from './components/App/App';
import { BSignUp, RSignUp } from './components/SignUp';
import { BLogIn, RLogIn } from './components/LogIn';
import {BloggerProfile, InBloggerProfile, InReaderProfile} from './components/Profile';
import CreatePost from './components/CreatePost/CreatePost'
import { Food, Travel, Tech, Fashion } from './components/Categories';
import Post from './components/Post/Post';
import { Terms, Disclaimer, Privacy} from './components/Documents';
import SearchBar from './components/SearchBar/SearchBar';

//api
import { fetchPost, getBlogsByCategory } from './api';

const routes = [
    {
        path: '/',
        exact: true,
        component: App
    },
    {
        path: '/search',
        component: SearchBar
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
        title: 'Dashboard - VUZUK',
        required: true,
        redirectURL: "/blogger/login"
    },
    {
        path: '/in/reader',
        component: InReaderProfile,
        title: 'Dashboard - VUZUK',
        required: true,
        redirectURL: '/reader/login'
    },
    {
        path: '/create',
        component: CreatePost,
        title: 'Create Post - VUZUK',
        required: true,
        redirectURL: "/blogger/login"
    },
    {
        path: '/post/:bloggerName/:slug',
        component: Post,
        title: 'Post - VUZUK',
        fetchInitialData: (path) => {            
            const bloggerName = path[2];
            const slug = path[3];            
            return fetchPost(bloggerName, slug);
        }
    },
    {
        path: '/blogger',
        component: BloggerProfile,
        title: 'Blogger Profile - VUZUK'
    },
    {
        path: '/food',
        component: Food,
        title: 'Food - VUZUK',
        fetchInitialData: (path) => {            
            return getBlogsByCategory(1,0,10);
        }
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
        path: '/terms',
        component: Terms,
        title: 'Terms and Conditions - VUZUK'
    },
    {
        path: '/disclaimer',
        component: Disclaimer,
        title: 'Disclaimer - VUZUK'
    },
    {
        path: '/privacy',
        component: Privacy,
        title: 'Privacy - VUZUK'
    }
];

export default routes;