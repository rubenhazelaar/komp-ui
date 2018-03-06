// Component and content creation classes and functions
import component, {state} from 'kompo';
const {construct, mount} = component;

import {create} from 'kompo-util';

import radio, {getKey, getValue, setOption} from '../../../src/js/form/radio';

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
    this.appendChild(rc);

    const a = create('a', {href: '#'});
    a.textContent = 'Set option 2';
    a.addEventListener('click', e => {
        e.preventDefault();
        setOption(rc, 'opt2')
    });
    this.appendChild(a);
});

// Create instance of root and
// append table to body
document.body.appendChild(state.app(root(), {}).start());

