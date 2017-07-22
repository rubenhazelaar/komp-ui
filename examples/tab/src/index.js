// Component and content creation classes and functions
import component, {state} from 'kompo';
const {construct, mount} = component;

import tab, {Tab} from '../../../src/js/tab/tab';

// Create root component
const root = construct('div', function({}) {
    const tc = tab({
        tabs: [
            new Tab({name: 'tab 1', content: 'tab 1'}),
            new Tab({name: 'tab 2', content: 'tab 2'}),
            new Tab({name: 'tab 3', content: 'tab 3'})
        ]
    });

    mount(this, tc);
});

// Create instance of root and
// append table to body
document.body.appendChild(state.app(root(), {}).start());

