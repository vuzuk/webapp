import App from './components/App/App';
import { BSignUp, RSignUp } from './components/SignUp';
import { BLogIn, RLogIn } from './components/LogIn';
import {BloggerProfile, InBloggerProfile, InReaderProfile} from './components/Profile';
import CreatePost from './components/CreatePost/CreatePost'
import { Food, Travel, Tech, Fashion } from './components/Categories';
import Post from './components/Post/Post';
import { Terms, Disclaimer, Privacy, About, Contact} from './components/Documents';
import SearchBar from './components/SearchBar/SearchBar';
import { Forget, Reset } from './components/Account'
import { SearchByTag, SearchByQuery } from './components/SearchBy';
import Referral from './components/Referral/Referral'
//api
import { fetchPost, getBlogsByCategory, getBlogger, getHomepage, getPostsByTag, getPostsByQuery, getSearch } from './api';

const routes = [
    {
        path: '/',
        exact: true,
        component: App,
        fetchInitialData: () => {
            return getHomepage();
        },
        meta: {
            title: "Vuzuk - Your Lifestyle Guidebook for Fashion, Food, Tech, Travel",
            description: "Check out trending hashtags and latest tips or articles on food, technology, fashion, and travel by the top or budding bloggers and market influencers in India. Get expert advice through industry experts. Write and share your own experience. And Bloggers, get free reach and brand collaborations.",
            keywords: "top bloggers in india, fashion, tech, travel, food, Vuzuk, latest fashion trend, food outlet near me, best place to go on weekend, top fashion blogger, top food blogger"
        }
    },
    {
        path: '/search',
        component: SearchBar,
        exact: true,
        fetchInitialData: () => {
            return getSearch();
        },
        meta: {
            title: "Vuzuk - Your Lifestyle Guidebook for fashion, food, tech, travel",
            description: "Check out trending hashtags and latest tips or articles on food, technology, fashion, and travel by the top or budding bloggers and market influencers in India. Get expert advice through industry experts. Write and share your own experience. And Bloggers, get free reach and brand collaborations.",
            keywords: "top bloggers in india, fashion, tech, travel, food, Vuzuk, latest fashion trend, food outlet near me, best place to go on weekend, top fashion blogger, top food blogger"
        }
    },
    {
        path: '/blogger/signup',
        component: BSignUp,
        title: 'Blogger Sign Up - VUZUK',
        meta: {
            title: "INDIA'S LARGEST INFLUENCER MARKETING PLATFORM | Vuzuk",
            description: "The perfect blogging platform to get free reach for your blog, tips, tutorial, and a place to showcase your blogging talent. Vuzuk stands for bloggers, brands and digital media influencers to connect and produce the most awesome campaigns!",
            keywords: "blogging platform, blogging tips, blogging tutorial, blog submit directory, bloggers, digital influencers, digital campaigns, blogging sites, blogging meaning, Vuzuk"
        }
    },
    {
        path: '/reader/signup',
        component: RSignUp,
        title: 'Reader Sign Up - VUZUK',
        meta: {
            title: "Get updates on latest food, tech, travel fashion trends | Vuzuk",
            description: "A reader always loves to read variety. Hence, Vuzuk will provide variations of writing, helping you make strong opinions and to make you confident.",
            keywords: "top bloggers in india, fashion, tech, travel, food, Vuzuk, latest fashion trend, food outlet near me, best place to go on weekend, top fashion blogger, top food blogger"
        }
    },
    {
        path: '/blogger/login',
        component: BLogIn,
        title: 'Blogger Login - VUZUK',
        meta: {
            title: "INDIA'S LARGEST INFLUENCER MARKETING PLATFORM | Vuzuk",
            description: "Vuzuk act as a bridge that connects the bloggers and the readers effortlessly. It is a blogging platform which will cover the Food, Tech, Fashion, Travel and many more aspects of your lifestyle. Vuzuk is a reliable friend and a reliable platform to connect to the readers.",
            keywords: "blogging platform, blogging tips, blogging tutorial, blog submit directory, bloggers, digital influencers, digital campaigns, blogging sites, blogging meaning, Vuzuk"
        }
    },
    {
        path: '/reader/login',
        component: RLogIn,
        title: 'Reader Login - VUZUK',
        meta: {
            title: "Get updates on latest food, tech, travel fashion trends | Vuzuk",
            description: "Vuzuk brings all the blogs and bloggers under one roof. It is a lifestyle guidebook where reading enthusiasts can unveil blogs, articles and reviews by a variety of bloggers from around the world. Mainly in Food, Fashion, Tech & Travel.",
            keywords: "top bloggers in india, fashion, tech, travel, food, Vuzuk, latest fashion trend, food outlet near me, best place to go on weekend, top fashion blogger, top food blogger"
        }
    },
    {
        path: '/refer/signup/:ref_username/:ref_blogger',
        component: Referral,
        title: 'Sign Up - VUZUK'
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
        path: '/edit-post/:bloggerName/:slug',
        component: CreatePost,
        title: 'Edit Post - VUZUK',
        required: true,
        fetchInitialData: (path) => {
            const bloggerName = path[2];
            const slug = path[3];
            return fetchPost(bloggerName, slug);
        }
    },
    {
        path: '/blogger/:username',
        component: BloggerProfile,
        title: 'Blogger Profile - VUZUK',
        fetchInitialData: (path) => {
            const username = path[2];
            return getBlogger(username);
        }
    },
    {
        path: '/food',
        component: Food,
        title: 'Food - VUZUK',
        fetchInitialData: (path) => {
            return getBlogsByCategory(1,0,20);
        },
        meta: {
            title: "Food blogs or articles by India's top food bloggers | Vuzuk",
            description: "Vuzuk has a massive collection of food bloggers, articles, recipes, reviews, posts and more that are submitted by top food blogger. From international cuisines to quick and easy meal ideas, Vuzuk is where you can find out what will satisfy your craving and also suggest you what will suit your hungry tummy and mood.",
            keywords: "food blogging, top 10 food blogger, food blogs, international cuisines, quick meal, food hashtags, food near me, healthy food, fast food, food recipe, food shows, Vuzuk"
        }
    },
    {
        path: '/travel',
        component: Travel,
        title: 'Travel - VUZUK',
        fetchInitialData: (path) => {
            return getBlogsByCategory(3,0,20);
        },
        meta: {
            title: "Travel reviews and blogs by India's top travel bloggers | Vuzuk",
            description: "Check-out the best travel blogs from the top travel bloggers in India & become a traveler not a tourist. Get the guides to the world's best destinations, tricks for booking hotel rooms, tips for finding the best things to do wherever you go, and travel hacks.",
            keywords: "best travel blogs, top travel bloggers in India, become a traveler, tourist, travel guide, worlds best destinations, hotel booking tricks, travel tips, hotel hacks, Vuzuk"
        }
    },
    {
        path: '/tech',
        component: Tech,
        title: 'Tech - VUZUK',
        fetchInitialData: (path) => {
            return getBlogsByCategory(4,0,20);
        }
    },
    {
        path: '/fashion',
        component: Fashion,
        title: 'Fashion - VUZUK',
        fetchInitialData: (path) => {
            return getBlogsByCategory(2,0,20);
        },
        meta: {
            title: "Latest fashion trends by India's top fashion bloggers | Vuzuk",
            description: "Get the latest fashion trends, blogs from India's top fashion bloggers. Fashion experts also give you behind the scene style tips, ideas, dress suggestions for parties, dates, weddings or family get together. Also learn all the how to’s of this season under one roof.",
            keywords: "latest fashion trends, fashion blogs, India's top 10 fashion bloggers, fashion experts, style tips & ideas, wedding dress, fashion articles, fashion accessories, Vuzuk"
        }
    },
    {
        path: '/tag/:tag',
        component: SearchByTag,
        title: 'Search By Tag - VUZUK',
        fetchInitialData: (path) => {
            const tag = path[2];
            return getPostsByTag(tag);
        }
    },
    {
        path: '/search/:tag',
        component: SearchByQuery,
        title: 'Search Result - VUZUK',
        fetchInitialData: (path) => {
            const query = path[2];
            return getPostsByQuery(query);
        }
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
    },
    {
        path: '/about',
        component: About,
        title: 'About - VUZUK',
        meta: {
            title: "Vuzuk brings all blogs reviews articles for you and your bloggers",
            description: "A friend who always tells you what suits you the most according to your personality & habits. We answer all your queries, from what to wear? Where to eat and what to buy? And from your shopping companion to your fashion mentor, by knowing you better, Vuzuk will make your life effortless.",
            keywords: "friend, personality, habit, what to wear, where to eat, what to buy, shopping companion, fashion mentor, effortless, blogger, influencer marketing platform, latest trend"
        }
    },
    {
        path: '/contact',
        component: Contact,
        title: 'Contact - VUZUK',
        meta: {
            title: "Contact Vuzuk for any Food, fashion, lifestyle, blogging tips",
            description: "Check out trending hashtags and latest tips or articles on food, technology, fashion, and travel by the top or budding bloggers and market influencers in India. Get expert advice through industry experts. Write and share your own experience. And Bloggers, get free reach and brand collaborations.",
            keywords: "top bloggers in india, fashion, tech, travel, food, Vuzuk, latest fashion trend, food outlet near me, best place to go on weekend, top fashion blogger, top food blogger"
        }
    },
    {
        path: '/forgot-password',
        component: Forget,
        title: 'Forgot Password - VUZUK'
    },
    {
        path: '/reset-password',
        component: Reset,
        title: 'Reset Password - VUZUK'
    }
];

export default routes;