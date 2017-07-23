// Component and content creation classes and functions
import component, {state} from 'kompo';
const {construct, mount} = component;

import radio, {getKey, getValue} from '../../../src/js/radio/radio';

// Create root component
const root = construct('div', function({}) {
    const rc = radio({
        defaultOptionIndex: 2,
        options: {
            opt1: 'Option 1',
            opt2: 'Option 2',
            opt3: 'Option 3'
        }
    });

    mount(this, rc);
});

// Create instance of root and
// append table to body
document.body.appendChild(state.app(root(), {}).start());

