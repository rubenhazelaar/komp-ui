import component, {state} from 'kompo';
import {empty} from 'kompo-util';

export default component.construct('tr', function({
    defaultClass,
    selectedClass,
    hasColumnFilter,
    columnFilter
}) {

    if(defaultClass) this.classList.add(defaultClass);

    component.react(this, s => {
        if(selectedClass) {
            if (s.selected) {
                this.classList.add(selectedClass);
            } else {
                this.classList.remove(selectedClass);
            }    
        }

        empty(this);
        const data = hasColumnFilter? columnFilter(s): s,
            keys = Object.keys(data);
        for(let i = 0, l = keys.length; i < l; ++i) {
            const k = keys[i],
                v = data[k];

            // if(typeof minimizeWhitelist !== 'undefined') {
            //     const onWhitelist = isObject?
            //     minimizeWhitelist.indexOf(k) === -1:
            //     minimizeWhitelist.indexOf(filtered[k]) === -1;
            //     if(minimize && onWhitelist) {
            //         continue;
            //     }
            // }

            const c = this.appendChild(document.createElement('td'));
            if(typeof v === 'string') {
                c.textContent = v;    
            } else {
                c.appendChild(v);
            }
        }
    });


}, {
    defaultClass: ''
});