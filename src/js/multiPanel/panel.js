import component, {state} from 'kompo';
const {dispatch} = state;
const {getProps, mount} = component;

import {create} from 'kompo-util';

export default component.construct('div', function({
    classNames, basis, unit, component, overlay, index, slideTo, slideToUrl
}){
    classNames.push('o-MultiPanel-panel');
    this.classList.add(...classNames);
    
    this.style.flexBasis = basis + unit; 

    if(overlay) {
        const o = create('div', {'class': 'o-MultiPanel-panel-overlay'});
        this.appendChild(o);
        o.addEventListener('click', e => {
            if(slideToUrl) {
                dispatch(this, state => {
                    state.url = slideToUrl()
                })
            } else if (typeof index !== 'undefined' && slideTo) {
                slideTo(index);
            }
        });
    }

    // Pass on level to component for further routing
    component.kompo.level = this.kompo.level;

    mount(this, component)
}, {
    classNames: [],
    basis: 100,
    unit: '%',
    component: undefined,
    overlay: true,
    index: undefined,
    slideTo: undefined,
    slideToUrl: undefined
});