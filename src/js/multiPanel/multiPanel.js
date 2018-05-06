import component from 'kompo';
const {getProps, mount} = component;

import {create, isObject, throttle} from 'kompo-util';

import getDynamicWidth from '../utils/getDynamicWidth';

import '../../css/multiPanel.css';

const multiPanel = component.construct('div', function({
    classNames, overlay, unit, transitionDuration, easingFunction, children, setChildWidth
}){
    const wrapper = create('div'),
        props = getProps(this);

    window.addEventListener('resize', throttle(e => {
        const index = children.indexOf(props.activePanel);

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
                    basis/100*props.totalWidthPercentage,
                pu = percentage + unit;

            child.style.flexBasis = pu;
            if(setChildWidth) {
                child.style.width = pu;
            }
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
        wrapper.appendChild(child); 
    }

    props.totalWidthPercentage = 100 / props.totalWidth * 100;

    wrapper.style.width = props.totalWidth + unit;
    requestAnimationFrame(() => {
        wrapper.style.transition = 'transform ' + transitionDuration + 'ms ' + easingFunction;
    });

    props.wrapper = wrapper;

    // Pass on selector
    mount(this, children, this.kompo.selector);
    this.appendChild(wrapper);
}, {
    classNames: [],
    unit: '%',
    transitionDuration: 500,
    totalWidth: 0,
    wrapper: undefined,
    overlay: true,
    easingFunction: 'ease',
    children: [],
    setChildWidth: false
});

export default multiPanel;

export function slideTo(multiPanel, panels, index, initial = false) {
    let translateTo = 0,
        totalPercentage = 0;

    const props = getProps(multiPanel);

    for(let i = 0, l = panels.length; i < l  ;++i) {
        const panel = panels[i];

        if (i < index) {
            translateTo = translateTo + getFlexBasis(panel);
        }

        if(!initial && !panel.classList.contains('o-MultiPanel-panel--withOverlayTransition')) {
            panel.classList.add('o-MultiPanel-panel--withOverlayTransition');
        }

        if(i === index) {
            panel.classList.add('o-MultiPanel-panel--selected');
            props.activePanel = panel;
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


export function slide(component:KompoElement, router:router, element:Element, multiPanelProps = {}):void {
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

                // TODO This does not work as expected
                // when the component of this panel
                // contains child routes. Only goes back to
                // original path, not the child routes
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

            let initial = false;
            if (!routed) {
                multiPanelProps.children = panels;
                mp = multiPanel(multiPanelProps);
                mount(component, mp);
                el.appendChild(mp);
                initial = true;
            }

            slideTo(mp, panels, index, initial);
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