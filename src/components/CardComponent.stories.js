import CardComponent from './CardComponent.vue';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Case/Teaser Card Component',
    component: CardComponent,
};

const Template = (args) => ({
    components: { CardComponent },
    setup() {
        return { args };
    },
    template: '<card-component v-bind="args" @action_media="actionMedia" @action_content="actionContent" />',
    methods: {
        actionMedia: action('action_media'),
        actionContent: action('action_content')
    }
});

export const HorizontalCard = Template.bind({});
HorizontalCard.args = {
    id: 1,
    title: 'Card Title longer than 30 characters',
    ingress: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: 'https://www.fjordtravel.no/wp-content/uploads/2013/08/Amazing-Geirangerfjord-by-Pixabay.jpg',
    tags: ['Tag1', 'Tag2'],
    cardType: 'horizontalCard',
};
export const VerticalCard = Template.bind({});
VerticalCard.args = {
    id: 2,
    title: 'Card Title longer than 30 characters',
    ingress: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: 'https://www.fjordtravel.no/wp-content/uploads/2013/08/Amazing-Geirangerfjord-by-Pixabay.jpg',
    tags: ['Tag1', 'Tag2'],
    cardType: 'verticalCard',
};
export const BasicCard = Template.bind({});
BasicCard.args = {
    id: 3,
    title: 'Card Title longer than 30 characters',
    ingress: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tags: ['Tag1', 'Tag2'],
    cardType: 'basicCard',
};
export const DetailedCard = Template.bind({});
DetailedCard.args = {
    id: 4,
    title: 'Card Title longer than 30 characters',
    ingress: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    badge: 'Badge',
    image: 'https://www.fjordtravel.no/wp-content/uploads/2013/08/Amazing-Geirangerfjord-by-Pixabay.jpg',
    tags: ['Tag1', 'Tag2'],
    cardType: 'detailedCard',
};