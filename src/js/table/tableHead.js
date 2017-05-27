import component, {state} from 'kompo';
import {empty} from 'kompo-util';

export default component.construct('tr', function({
    defaultClass,
    hasColumnFilter,
    columnFilter
}) {

    if(defaultClass) this.classList.add(defaultClass);

    component.react(this, s => {
        empty(this);
        const data = hasColumnFilter? columnFilter(s): s,
            keys = Object.keys(data);
        for(let i = 0, l = keys.length; i < l; ++i) {
            // if(typeof minimizeWhitelist !== 'undefined') {
            //     const onWhitelist = isObject?
            //     minimizeWhitelist.indexOf(k) === -1:
            //     minimizeWhitelist.indexOf(filtered[k]) === -1;
            //     if(minimize && onWhitelist) {
            //         continue;
            //     }
            // }

            const c = this.appendChild(document.createElement('th'));
            c.textContent = keys[i];
        }
    });


}, {
    defaultClass: ''
});