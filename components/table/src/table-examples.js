// Component and content creation classes and functions
import component, {state} from 'kompo';
import {capitalize, delegate} from 'kompo-util';

// Example components with self-explanatory name
import table from './table';
import accordionTable from './accordionTable'
import selectTable from './selectTable';

const doc = document;

// Create root component
const root = component.construct('div', function({}) {
    const add = doc.createElement('a'),
        sub = doc.createElement('a'),
        t1 = table({
            classes: ['o-Table', 'u-mtm'],
            oddRowClass: 'o-Table-row--isOdd',
            evenRowClass: 'o-Table-row--isEven',
            on: (table) => {
                delegate(table, 'tr', 'click', function(e) {
                    console.log(this);
                    console.log(table.kompo.props.rows);
                });
            }
        }),
        t2 = selectTable({
            columnFilter(data) {
                return {
                    Firstname: capitalize(data.firstname),
                    Lastname: capitalize(data.lastname)
                }
            },
            selectedClass: 'selected'
        }),
        t3 = accordionTable({
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

    add.textContent = 'Add 1 to limit';
    add.addEventListener('click', e => {
        e.preventDefault();
        state.dispatch(this, st => {
            st.limit = st.limit + 1;
        })
    });

    sub.textContent = 'Subtract 1 of limit';
    sub.addEventListener('click', e => {
        e.preventDefault();
        state.dispatch(this, st => {
            st.limit = st.limit - 1;
        })
    });

    this.appendChild(add);
    this.appendChild(sub);
    component.mount(this, [t1, t2, t3]);
});

// Create instance of root and
// append table to body
document.body.appendChild(state.app(root(), {

    limit: 2,
    offset: 0,
    data: [
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
    ]
}).start());

