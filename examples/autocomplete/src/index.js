// Component and content creation classes and functions
import component, {state} from 'kompo';
const {construct, mount, getState} = component;

import autocomplete from '../../../src/js/autocomplete/autocomplete';

// Create root component
const root = construct('div', function({}) {
    const ac = autocomplete({
        filter(raw, value) {
            if(!raw.movie.match(new RegExp(value,'gi')) || raw.movie === false) {
                return false;
            }

            return raw.movie;
        },
        actionCallback(selected, value) {
            console.log(getState(selected));
        }
    });

    mount(this, ac, state => state.data);
});

// Create instance of root and
// append table to body
document.body.appendChild(state.app(root(), {
    data: [
        {
            id: 1,
            firstname: 'rick',
            lastname: 'deckard',
            movie: 'blade runner'
        },{
            id: 2,
            firstname: 'mia',
            lastname: 'wallace',
            movie: 'pulp fiction'
        },{
            id: 3,
            firstname: 'rocky',
            lastname: 'balboa',
            movie: 'rocky'
        },{
            id: 4,
            firstname: 'rick',
            lastname: 'deckard',
            movie: 'blade runner'
        },{
            id: 5,
            firstname: 'mia',
            lastname: 'wallace',
            movie: 'pulp fiction'
        },{
            id: 6,
            firstname: 'rocky',
            lastname: 'balboa',
            movie: 'rocky'
        },{
            id: 7,
            firstname: 'rick',
            lastname: 'deckard',
            movie: 'blade runner'
        },{
            id: 8,
            firstname: 'mia',
            lastname: 'wallace',
            movie: 'pulp fiction'
        },{
            id: 9,
            firstname: 'rocky',
            lastname: 'balboa',
            movie: 'rocky'
        },{
            id: 10,
            firstname: 'rick',
            lastname: 'deckard',
            movie: 'blade runner'
        },{
            id: 11,
            firstname: 'mia',
            lastname: 'wallace',
            movie: 'pulp fiction'
        },{
            id: 12,
            firstname: 'rocky',
            lastname: 'balboa',
            movie: 'rocky'
        },{
            id: 13,
            firstname: 'rick',
            lastname: 'deckard',
            movie: 'blade runner'
        },{
            id: 14,
            firstname: 'mia',
            lastname: 'wallace',
            movie: 'pulp fiction'
        },{
            id: 15,
            firstname: 'rocky',
            lastname: 'balboa',
            movie: 'rocky'
        },{
            id: 16,
            firstname: 'rick',
            lastname: 'deckard',
            movie: 'blade runner'
        },{
            id: 17,
            firstname: 'mia',
            lastname: 'wallace',
            movie: 'pulp fiction'
        },{
            id: 18,
            firstname: 'rocky',
            lastname: 'balboa',
            movie: 'rocky'
        },
        {
            id: 19,
            firstname: 'rick',
            lastname: 'deckard',
            movie: 'blade runner'
        },{
            id: 20,
            firstname: 'mia',
            lastname: 'wallace',
            movie: 'pulp fiction'
        },{
            id: 21,
            firstname: 'rocky',
            lastname: 'balboa',
            movie: 'rocky'
        },{
            id: 22,
            firstname: 'rick',
            lastname: 'deckard',
            movie: 'blade runner'
        },{
            id: 23,
            firstname: 'mia',
            lastname: 'wallace',
            movie: 'pulp fiction'
        },{
            id: 24,
            firstname: 'rocky',
            lastname: 'balboa',
            movie: 'rocky'
        },{
            id: 25,
            firstname: 'rick',
            lastname: 'deckard',
            movie: 'blade runner'
        },{
            id: 26,
            firstname: 'mia',
            lastname: 'wallace',
            movie: 'pulp fiction'
        },{
            id: 27,
            firstname: 'rocky',
            lastname: 'balboa',
            movie: 'rocky'
        },{
            id: 28,
            firstname: 'rick',
            lastname: 'deckard',
            movie: 'blade runner'
        },{
            id: 29,
            firstname: 'mia',
            lastname: 'wallace',
            movie: 'pulp fiction'
        },{
            id: 30,
            firstname: 'rocky',
            lastname: 'balboa',
            movie: 'rocky'
        },{
            id: 31,
            firstname: 'rick',
            lastname: 'deckard',
            movie: 'blade runner'
        },{
            id: 32,
            firstname: 'mia',
            lastname: 'wallace',
            movie: 'pulp fiction'
        },{
            id: 33,
            firstname: 'rocky',
            lastname: 'balboa',
            movie: 'rocky'
        },{
            id: 34,
            firstname: 'rick',
            lastname: 'deckard',
            movie: 'blade runner'
        },{
            id: 35,
            firstname: 'mia',
            lastname: 'wallace',
            movie: 'pulp fiction'
        },{
            id: 36,
            firstname: 'rocky',
            lastname: 'balboa',
            movie: 'rocky'
        }
    ]
}).start());

