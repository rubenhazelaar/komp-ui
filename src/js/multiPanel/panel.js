import component, {state} from 'kompo';
const {dispatch} = state;
const {getProps, mount} = component;

import {create, isObject} from 'kompo-util';

import getDynamicWidth from '../utils/getDynamicWidth';

export default component.construct('div', function({
    classNames, basis, unit, component, overlay, index, slideTo, slideToUrl, multiPanelProps
}){
    const percentage = isObject(basis)?
        getDynamicWidth(basis)/100*multiPanelProps.totalWidthPercentage:
        basis/100*multiPanelProps.totalWidthPercentage;

    classNames.push('o-MultiPanel-panel');
    this.classList.add(...classNames);
    this.style.flexBasis = percentage + unit;

    if(overlay) {
        const o = create('div', {'class': 'o-MultiPanel-panel-overlay'});
        this.appendChild(o);
        o.addEventListener('click', e => {
            // TODO Does not work as expected?
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
    slideToUrl: undefined,
    multiPanelProps: undefined
});