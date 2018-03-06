// Component and content creation classes and functions
import component, {state} from 'kompo';
const {construct, mount} = component;

import orderList from '../../../src/js/orderList/orderList';

// Create root component
const root = construct('div', function({}) {
    const ol = orderList({
        available: ['phone', 'name', 'id', 'address']
    });
    mount(this, ol);
    this.appendChild(ol);
});

// Create instance of root and
// append table to body
document.body.appendChild(state.app(root(), {
    want: ['id', 'name', 'address'], 
    mapping: {
        id: 'Code',
        name: 'Full name'
    }
}).start());

