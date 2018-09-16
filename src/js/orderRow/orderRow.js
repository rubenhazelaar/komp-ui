import component, {state} from 'kompo';
const {construct, react, mount, unmountAll, getState} = component;
const {dispatch, markDirty} = state;

import {create, createFragment,empty} from 'kompo-util';

import  '../../css/orderRow.css';

export default construct('div', function ({
    defaultClass,
    classes
}) {
    classes.push(defaultClass);
    this.classList.add(...classes);

    react(this, state => {
        console.log(state);
        if (!state || !Array.isArray(state)) return;

        empty(this); // Always reset
        const frag = createFragment();

        for(let i = 0, l = state.length; i < l; ++i) {
            const row = state[i],
                rowElement = create('div', {'class': 'o-OrderRow-row'});

            for(let ri = 0, rl = row.length; ri < rl; ++ri) {
                const columnElement = create('div', {'class': 'o-OrderRow-column'});

                columnElement.textContent = i + '.' + ri;
                rowElement.appendChild(columnElement);
            }

            frag.appendChild(rowElement);
        }

        this.appendChild(frag);
    });
}, {
    defaultClass: 'o-OrderRow',
    classes: []
})

