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
            if (this.kompo.props.selected) {
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
            if(v instanceof Node) {
                c.appendChild(v);    
            } else {
                c.textContent = v;
            }
        }
    });


}, {
    defaultClass: ''
});