import component from 'kompo';
const {construct,getRouter, react} = component;

import {slide} from '../../../../src/js/multiPanel/multiPanel';


export default construct('div', function ({heading}) {
    this.setAttribute('data-type', 'Branch');
    
    // Create Elements
    const h2 = document.createElement('h2');
    h2.textContent = heading;

    // Append children
    this.appendChild(h2);

    const s = slide(this, getRouter(this));
    react(this, () => {
        console.log("LEVEL TWO MULTIPANEL");
        s.do();
    });
}, {
    heading: 'Branch construct'
});
