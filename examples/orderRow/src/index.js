// Component and content creation classes and functions
import component, {state} from 'kompo';
const {construct, mount} = component;

import orderGrid from '../../../src/js/orderRow/orderRow';

// Create root component
const root = construct('div', function({}) {
    const og = orderGrid({});
    mount(this, og, state => state.grid);
    this.appendChild(og);
});

// Create instance of root and
// append table to body
document.body.appendChild(state.app(root(), {
    grid:[
        [{}], // Row 1
        [{},{}], // Row 2
        [{},{}, {}] // Row 3
    ]
}).start());

