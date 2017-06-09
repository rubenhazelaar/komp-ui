import component, {state} from 'kompo'; 
const {getProps, mount, children, getRouter} = component;

import {create, isObject, throttle} from 'kompo-util';

import getDynamicWidth from '../utils/getDynamicWidth';

import '../../css/multiPanel.css';

const multiPanel = component.construct('div', function({
    classNames, overlay, unit, transitionDuration
}){
    const wrapper = create('div'),
        children = this.kompo.children,
        props = getProps(this),
        router = getRouter(this);

    window.addEventListener('resize', throttle(e => {
        const c = router.get(component, undefined, true),
            cc = c.component,
            index = children.indexOf(cc);

        // No component is routed abort all work
        if(index < 0) return;

        // Reset totalWidth
        const changedChildren = [];
        props.totalWidth = 0;

        for(let i = 0, l = children.length; i < l; ++i) {
            const child = children[i],
                childProps = getProps(child),
                basis = childProps.basis;
            
            if(isObject(basis)) {
                const changedTo = getDynamicWidth(basis);
                if(changedTo === childProps.activeWidth) {
                    props.totalWidth = props.totalWidth + childProps.activeWidth;
                } else {
                    props.totalWidth = props.totalWidth + changedTo;
                    childProps.activeWidth = changedTo;
                    changedChildren.push(true);
                }
            } else {
                props.totalWidth = props.totalWidth + childProps.basis;
            }
        }

        // If no children have changed don't change anything
        if (changedChildren.length === 0) return;

        props.totalWidthPercentage = 100 / props.totalWidth * 100;

        for(let i = 0, l = children.length; i < l; ++i) {
            const child = children[i],
                childProps = getProps(child),
                basis = childProps.basis,
                percentage = isObject(basis)?
                    childProps.activeWidth/100*props.totalWidthPercentage:
                    basis/100*props.totalWidthPercentage;

            child.style.flexBasis = percentage + unit;
        }

        // Use double request animation frames to make sure
        // the panels do not animate on resize
        wrapper.style.transition = 'none';
        requestAnimationFrame(() => {
            slideTo(this, children, index);
            requestAnimationFrame(() => {
                wrapper.style.transition = 'transform ' + transitionDuration + 'ms';
            });
        });
    }, 200));

    classNames.push('o-MultiPanel');
    if (overlay) classNames.push('o-MultiPanel--withOverlay');
    this.classList.add(...classNames);

    for(let i = 0, l = children.length; i < l; ++i) {
        const child = children[i],
            childProps = getProps(child);

        childProps.index = i;
        childProps.slideTo = (index) => {
            return slideTo(this, children, index);
        };

        if(isObject(childProps.basis)) {
            const dw = getDynamicWidth(childProps.basis);
            props.totalWidth = props.totalWidth + dw;
            childProps.activeWidth = dw
        } else {
            props.totalWidth = props.totalWidth + childProps.basis;
        }

        childProps.multiPanelProps = props;
    }

    props.totalWidthPercentage = 100 / props.totalWidth * 100;

    wrapper.style.transition = 'transform ' + transitionDuration + 'ms';
    wrapper.style.width = props.totalWidth + unit;

    props.wrapper = wrapper;

    mount(this, wrapper, children);
    this.appendChild(wrapper);
}, {
    classNames: [],
    unit: '%',
    transitionDuration: 500,
    totalWidth: 0,
    wrapper: undefined,
    overlay: true
});

export default multiPanel;

export function slideTo(multiPanel, panels, index) {
    let translateTo = 0,
        totalPercentage = 0;

    const props = getProps(multiPanel);

    for(let i = 0, l = panels.length; i < l  ;++i) {
        const panel = panels[i];

        if (i < index) {
            translateTo = translateTo + getFlexBasis(panel);
        }

        if(i === index) {
            panel.classList.add('o-MultiPanel-panel--selected');
        } else {
            panel.classList.remove('o-MultiPanel-panel--selected');
        }

        totalPercentage = totalPercentage + getFlexBasis(panel);
    }

    if(index == panels.length-1) {
        const lastPanel = panels[panels.length-1],
            basis = lastPanel.kompo.props.basis,
            lastBasis = isObject(basis)? basis.active : basis;

          translateTo = translateTo - (100 - lastBasis)/100*props.totalWidthPercentage;
    }

    const unit = props.unit;
    props.wrapper.style.width = props.totalWidth + unit;
    props.wrapper.style.transform = 'translateX(-' + translateTo + unit + ')';
}


export function slide(component:KompoElement, router:router, element:Element):void {
    let mp;

    return {
        do() {
            let c = router.get(component, undefined, true);

            const panels = [],
                routes = c.siblings;

            var keys = Object.keys(routes);
            for(let i = 0, l = keys.length; i < l; ++i) {
                const route = routes[i],
                    co = route.component;

                // TODO this does not work as expected
                co.kompo.props.slideToUrl = () => {
                    router.goTo(route.path);
                    return route.path;
                };

                panels.push(co);
            }

            const cc = c.component,
                routed = component.kompo.routed;

            if (cc === routed) return;

            const index = panels.indexOf(cc),
                el = element? element: component;

            if (!routed) {
                mp = multiPanel();
                children(mp, panels);
                mount(component, el, mp);
            }

            slideTo(mp, panels, index);
            component.kompo.routed = cc;
        }
    };
}

function getFlexBasis(el) {
    let fb = parseFloat(window.getComputedStyle(el).flexBasis);

    if(isNaN(fb)) {
       fb = parseFloat(el.style.flexBasis);
    }

    return fb;
}