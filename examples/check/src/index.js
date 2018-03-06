// Component and content creation classes and functions
import component, {state} from 'kompo';
const {construct, mount} = component;

import {create} from 'kompo-util';

import check, {isChecked, setCheck} from '../../../src/js/form/check';

// Create root component
const root = construct('div', function({}) {
    const cc = check({
        checked: true,
        label: 'With columns names'
    });

    mount(this, cc);
    this.appendChild(cc);

    const a = create('a', {href: '#'});
    a.textContent = 'Toggle check';
    a.addEventListener('click', e => {
        e.preventDefault();

        console.log(isChecked(cc));
        
        setCheck(cc, !isChecked(cc))
    });
    this.appendChild(a);
});

// Create instance of root and
// append table to body
document.body.appendChild(state.app(root(), {}).start());

