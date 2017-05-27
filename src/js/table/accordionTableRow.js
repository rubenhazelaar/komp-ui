import component from 'kompo';
import {empty} from 'kompo-util';

export default component.construct('tr', function({
    defaultClass,
    rowSlot
}) {
    if(defaultClass) this.classList.add(defaultClass);

    const c = this.appendChild(document.createElement('td'));
    
    rowSlot(this, c);
    
    component.react(this, s => {
        empty(this);
        const l = Object.keys(s).length;

        c.setAttribute('colspan', l);
        
    });
}, {
    defaultClass: '',
    rowSlot(tr, c) {}
});