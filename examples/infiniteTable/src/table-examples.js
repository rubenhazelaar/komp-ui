// Component and content creation classes and functions
import component, {state} from 'kompo';
import {delegate, create} from 'kompo-util';

// Example components with self-explanatory name
import table, {tableActions} from '../../../src/js/table/infiniteTable';

// Create root component
const root = component.construct('div', function({}) {
    const scrollable = create('div', {'class': 'o-Scrollable'}),
        topSpacer = create('div', {'style': 'height: 0'}),
        bottomSpacer = create('div', {'style': 'height: 0'}),
        t1 = table({
            classes: ['o-Table', 'u-mbn'],
            oddRowClass: 'o-Table-row--isOdd',
            evenRowClass: 'o-Table-row--isEven',
            selectedClass: 'selected',
            uniqueKey: 'id',
            on: (table) => {
                delegate(table, 'tr', 'click', function(e) {
                    e.preventDefault();
                    const target = e.target.parentNode,
                        tableProps = table.kompo.props,
                        key = keySelected(tableProps, target);

                    // Remove if already in selected
                    if (tableProps.selected.hasOwnProperty(key)) {
                        target.classList.remove(tableProps.selectedClass);
                        delete tableProps.selected[key];
                        return
                    }

                    tableProps.selected[key] = target;
                    target.classList.add(tableProps.selectedClass);
                });
            },
            minimizeWhitelist: ['firstname'],
            scrollableElement: scrollable,
            topSpacer,
            bottomSpacer
        });
    
    this.appendChild(scrollable);
    scrollable.appendChild(topSpacer);
    component.mount(this, t1);
    scrollable.appendChild(t1);
    scrollable.appendChild(bottomSpacer);
});

function keySelected(tableProps, row) {
    if (!tableProps.selected) {
        tableProps.selected = {};
    }

    const s = component.getState(row);
    return s[tableProps.uniqueKey];
}

// Create instance of root and
// append table to body
document.body.appendChild(state.app(root(), {
    limit: 10,
    minimize: true,
    offset: 0,
    data: [
        {
            id: 1,
            firstname: 'rick',
            lastname: 'deckard',
            movie: 'blade runner 123456789'
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
            movie: 'blade runner 123456789'
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
            movie: 'blade runner 123456789'
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
            movie: 'blade runner 123456789'
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
            movie: 'blade runner 123456789'
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
            movie: 'blade runner 123456789'
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
            movie: 'blade runner 123456789'
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
            movie: 'blade runner 123456789'
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
            movie: 'blade runner 123456789'
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
            movie: 'blade runner 123456789'
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
            movie: 'blade runner 123456789'
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
            movie: 'blade runner 123456789'
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

