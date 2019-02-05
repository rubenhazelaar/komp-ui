import component, {state} from 'kompo';
const {dispatch} = state;
const {mount, getRouter} = component;

import {create, isObject} from 'kompo-util';

import getDynamicWidth from '../utils/getDynamicWidth';

export default component.construct('div', function({
    classNames, basis, unit, component, overlay, index, slideTo, slideToUrl, slideBack, multiPanelProps
}){
    const percentage = isObject(basis)?
        getDynamicWidth(basis)/100*multiPanelProps.totalWidthPercentage:
        basis/100*multiPanelProps.totalWidthPercentage,
        pu = percentage + unit;

    classNames.push('o-MultiPanel-panel');
    this.classList.add(...classNames);
    this.style.width = pu;

    if(overlay) {
        const o = create('div', {'class': 'o-MultiPanel-panel-overlay'});
        this.appendChild(o);
        o.addEventListener('click', e => {
            if(slideBack) {
                history.back();
            } else if(slideToUrl) {
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

    mount(this, component, this.kompo.selector);
    this.appendChild(component);
}, {
    classNames: [],
    basis: 100,
    unit: '%',
    component: undefined,
    overlay: true,
    index: undefined,
    slideTo: undefined,
    slideToUrl: undefined,
    multiPanelProps: undefined,
    slideBack: false
});