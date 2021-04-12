import {FuseNavigation} from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'project',
                title: 'Statistics',
                type: 'item',
                icon: 'dashboard',
                url: '/apps/dashboards/project'
            },

            {
                id: 'profile',
                title: 'Profile',
                type: 'item',
                icon: 'person',
                url: '/pages/profile'
            },

            {
                id: 'categories',
                title: 'Categories',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/categories'
            },
            {
                id: 'categories-news',
                title: 'Categories Of News',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/categories-news'
            },

            {
                id: 'types',
                title: 'Types',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/types'
            },
            {
                id: 'countries',
                title: 'Countries',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/countries'
            },
            {
                id: 'unites',
                title: 'Unites',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/unites'
            },
            {
                id: 'durations',
                title: 'Durations',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/durations'
            },
            {
                id: 'users',
                title: 'Users',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/users'
            },
            {
                id: 'users',
                title: 'New Celebrity',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/new-user/0'
            },
            {
                id: 'news',
                title: 'News',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/news'
            },
            {
                id: 'content',
                title: 'Content',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/content'
            },
            {
                id: 'feedback',
                title: 'Feedbacks',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/feedbacks'
            },
        ]
    }
];





