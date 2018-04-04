import App from './components/App/App';
import { BSignUp, RSignUp } from './components/SignUp';
import { BLogIn, RLogIn } from './components/LogIn';
import {BloggerProfile, InBloggerProfile, InReaderProfile} from './components/Profile';
import CreatePost from './components/CreatePost/CreatePost'
import { Food, Travel, Tech, Fashion } from './components/Categories';
import Verification from './components/Verification/Verification';
import Post from './components/Post/Post';
        {/* <Route exact path="/" component={App} />
        <Route path="/create" component={CreatePost} />
        <Route path="/post" component={Post} />
        <Route path="/verify/phone" component={Verification}/> */}
const routes = [
    {
        path: '/',
        exact: true,
        component: App
    },
    {
        path: '/blogger/signup',
        component: BSignUp
    },
    {
        path: '/reader/signup',
        component: RSignUp
    },
    {
        path: '/blogger/login',
        component: BLogIn
    },
    {
        path: '/reader/login',
        component: RLogIn
    },
    {
        path: '/in/blogger',
        component: InBloggerProfile
    },
    {
        path: '/in/reader',
        component: InReaderProfile
    },
    {
        path: '/create',
        component: CreatePost
    },
    {
        path: '/post',
        component: Post
    },
    {
        path: '/blogger',
        component: BloggerProfile
    },
    {
        path: '/food',
        component: Food
    },
    {
        path: '/travel',
        component: Travel
    },
    {
        path: '/tech',
        component: Tech
    },
    {
        path: '/fashion',
        component: Fashion
    },
    {
        path: '/verify/phone',
        component: Verification
    }
];

export default routes;