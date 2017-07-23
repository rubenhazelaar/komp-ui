// Component and content creation classes and functions
import component, {state} from 'kompo';
const {construct, mount} = component;

import check, {isChecked} from '../../../src/js/form/check';

// Create root component
const root = construct('div', function({}) {
    const cc = check({
        checked: true,
        label: 'With columns names'
    });

    mount(this, cc);
});

// Create instance of root and
// append table to body
document.body.appendChild(state.app(root(), {}).start());

