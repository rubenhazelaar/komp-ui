// Component and content creation classes and functions
import component, {state} from 'kompo';
import {capitalize, delegate} from 'kompo-util';

// Example components with self-explanatory name
import table, {tableActions} from '../../../src/js/table/table';
import accordionTable from '../../../src/js/table/accordionTable'
import selectTable from '../../../src/js/table/selectTable';

const doc = document;

// Create root component
const root = component.construct('div', function({}) {
    const addLimit = doc.createElement('a'),
        subLimit = doc.createElement('a'),
        addOffset = doc.createElement('a'),
        subOffset = doc.createElement('a'),
        minimize = doc.createElement('a'),
        maximize = doc.createElement('a'),
        addState = doc.createElement('a'),
        t1 = table({
            classes: ['o-Table', 'u-mtm'],
            oddRowClass: 'o-Table-row--isOdd',
            evenRowClass: 'o-Table-row--isEven',
            on: (table) => {
                delegate(table, 'tr', 'click', function(e) {
                    console.log(table.kompo.props.rows);
                });
            },
            minimizeWhitelist: ['firstname']
        })
        ,
        t2 = selectTable({
            columnFilter(data) {
                return {
                    Firstname: capitalize(data.firstname),
                    Lastname: capitalize(data.lastname)
                }
            },
            rowFilter(data) {
                if(data.firstname === 'rocky') {
                    return false;
                }

                return true;
            },
            selectedClass: 'selected'
        }),
        t3 = accordionTable({
            showOne: false,
            columnFilter(data) {
                return {
                    Firstname: capitalize(data.firstname),
                    Lastname: capitalize(data.lastname)
                }
            },
            rowSlot(columnElement, filtered, raw) {
                const h1 = doc.createElement('h1');
                h1.textContent = capitalize(raw.movie);
                columnElement.appendChild(h1)
            }
        });

    addLimit.textContent = 'Add 1 to limit';
    addLimit.addEventListener('click', e => {
        e.preventDefault();
        tableActions.addLimit(this, 1);
    });

    subLimit.textContent = 'Subtract 1 of limit';
    subLimit.addEventListener('click', e => {
        e.preventDefault();
        tableActions.subLimit(this, 1);
    });

    addOffset.textContent = 'Add 1 to offset';
    addOffset.addEventListener('click', e => {
        e.preventDefault();
        tableActions.addOffset(this, 1);
    });

    subOffset.textContent = 'Subtract 1 of offset';
    subOffset.addEventListener('click', e => {
        e.preventDefault();
        tableActions.subOffset(this, 1);
    });

    minimize.textContent = 'Minimize';
    minimize.addEventListener('click', e => {
        e.preventDefault();
        tableActions.minimize(this);
    });

    maximize.textContent = 'Maximize';
    maximize.addEventListener('click', e => {
        e.preventDefault();
        tableActions.maximize(this);
    });

    addState.textContent = 'addState';
    addState.addEventListener('click', e => {
        e.preventDefault();
        state.dispatch(this, state => {
            state.data = [
                {
                    firstname: 'rick',
                    lastname: 'deckard',
                    movie: 'blade runner'
                }, {
                    firstname: 'mia',
                    lastname: 'wallace',
                    movie: 'pulp fiction'
                },{
                    firstname: 'rocky',
                    lastname: 'balboa',
                    movie: 'rocky'
                }
            ];
        })
    });

    this.appendChild(addLimit);
    this.appendChild(subLimit);
    this.appendChild(addOffset);
    this.appendChild(subOffset);
    this.appendChild(minimize);
    this.appendChild(maximize);
    this.appendChild(addState);
    component.mount(this, [t1, t2, t3]);
});

// Create instance of root and
// append table to body
document.body.appendChild(state.app(root(), {
    limit: 2,
    minimize: true,
    offset: 0,
    data: [
        // {
        //     firstname: 'rick',
        //     lastname: 'deckard',
        //     movie: 'blade runner'
        // }, {
        //     firstname: 'mia',
        //     lastname: 'wallace',
        //     movie: 'pulp fiction'
        // },{
        //     firstname: 'rocky',
        //     lastname: 'balboa',
        //     movie: 'rocky'
        // }
    ]
}).start());

