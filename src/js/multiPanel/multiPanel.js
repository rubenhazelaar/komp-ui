import component, {state} from 'kompo'; 
const {getProps,mount, children} = component;

import {create} from 'kompo-util';

import '../../css/multiPanel.css';

// TODO defaultPanel behavior
const multiPanel = component.construct('div', function({
    classNames, overlay, defaultPanel, unit, transitionDuration
}){
    classNames.push('o-MultiPanel');
    if (overlay) classNames.push('o-MultiPanel--withOverlay');
    this.classList.add(...classNames);

    const wrapper = create('div'),
        children = this.kompo.children;
        
    for(let i = 0, l = children.length; i < l; ++i) {
        const child = children[i],
            props = getProps(child);
        
        props.index = i;
        props.slideTo = (index) => {
            return slideTo(this, children, index);
        };
        
        this.kompo.props.totalWidth = this.kompo.props.totalWidth + props.basis;
    }

    wrapper.style.transition = 'transform ' + transitionDuration + 'ms';
    wrapper.style.width = this.kompo.props.totalWidth + unit;
    this.kompo.props.wrapper = wrapper;

    mount(this, wrapper, children);
    this.appendChild(wrapper);
}, {
    classNames: [],
    defaultPanel: 0,
    unit: '%',
    transitionDuration: 500,
    totalWidth: 0,
    wrapper: undefined,
    overlay: true
});

export default multiPanel;

export function slideTo(multiPanel, panels, index) {
    let translateToAbsolute = 0;

    const mpProps = getProps(multiPanel);

    for(let i = 0, l = index; i < l  ;++i) {
        const panel = panels[i],
            next = panels[i+1],
            props = getProps(panel);

        if(next) {
            const nProps = getProps(next);
            if (nProps.basis < 100) {
                translateToAbsolute = translateToAbsolute - (100 - nProps.basis);
            }
        }

        translateToAbsolute = translateToAbsolute + props.basis
    }

    for(let i = 0, l = panels.length; i < l  ;++i) {
        if(i === index) {
            panels[i].classList.add('o-MultiPanel-panel--selected');
        } else {
            panels[i].classList.remove('o-MultiPanel-panel--selected');
        }
    }

    // Factor into percentages
    const translateTo = translateToAbsolute / mpProps.totalWidth * 100;
    mpProps.wrapper.style.transform = 'translateX(-' + translateTo + mpProps.unit + ')';
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