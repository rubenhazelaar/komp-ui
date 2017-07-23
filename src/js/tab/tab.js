import component, {util} from 'kompo';
const {construct, mount} = component;
const {merge} = util;

import {addClasses, create} from 'kompo-util';

export default construct('div', function({
    defaultClass,
    classes,
    tabs,
    defaultTabIndex,
    tabWrapperClass,
    tabClass,
    contentWrapperClass,
    contentClass,
    selectedTabClass,
    selectedContentClass
}){
    this.classList.add(defaultClass);
    addClasses(this, classes);

    const tabWrapper = create('div', {'class': tabWrapperClass}),
        contentWrapper = create('div', {'class': contentWrapperClass});
    this.appendChild(tabWrapper);
    this.appendChild(contentWrapper);

    let selectedTab,
        selectedContent;

    for(let i = 0, l = tabs.length; i < l; ++i) {
        const ti = tabs[i],
            t = create('a', {'class': tabClass, href: '#' + ti.getName()}),
            c = create('div', {'class': contentClass});

        t.textContent = ti.getHumanName();
        tabWrapper.appendChild(t);

        if(defaultTabIndex === i) {
            t.classList.add(selectedTabClass);
            selectedTab = t;
            c.classList.add(selectedContentClass);
            selectedContent = c;
        }

        t.addEventListener('click', e => {
            e.preventDefault();

            if(selectedTab === t) return;

            if (selectedTab) selectedTab.classList.remove(selectedTabClass);
            t.classList.add(selectedTabClass);
            selectedTab = t;

            if (selectedContent) selectedContent.classList.remove(selectedContentClass);
            c.classList.add(selectedContentClass);
            selectedContent = c;
        });

        // Append different types of content to append
        append(this, c, ti.getContent());
        contentWrapper.appendChild(c);
    }
}, {
    defaultClass: 'o-Tab',
    classes: [],
    tabs: [],
    defaultTabIndex: 0,
    tabWrapperClass: 'o-Tab-tabWrapper',
    tabClass: 'o-Tab-tab',
    contentWrapperClass: 'o-Tab-contentWrapper',
    contentClass: 'o-Tab-content',
    selectedTabClass: 'o-Tab-tab--selected',
    selectedContentClass: 'o-Tab-content--selected'
});

function append(component, parent, child) {
    if(Array.isArray(child)) {
        for(let i = 0, l = child.length; i < l; ++i) {
            _append(component, parent, child[i])
        }

        return
    }

    _append(component, parent, child);
}


function _append(component, parent, child) {
    if (typeof child === 'string') {
        parent.textContent = child;
    } else if (child.hasOwnProperty('kompo')) {
        mount(component, parent, child, component.kompo.selector, false);
    } else if (child instanceof Node) {
        this.appendChild(child);
    } else {
        throw new Error('Child should be a string, KompoElement or a Node');
    }
}

export class Tab {
    constructor(options) {
        this.options = merge({
            name: '',
            humanName: '',
            content: undefined
        }, options);
    }

    getName() {
        return this.options.name;
    }

    getHumanName() {
        return this.options.humanName? this.options.humanName: this.options.name;
    }

    getContent() {
        return this.options.content;
    }
}