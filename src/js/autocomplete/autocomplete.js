import component from 'kompo';
const {construct, react, mount, getState} = component;

import {create, createFragment, addClasses, throttle, delegate, empty, isObject} from 'kompo-util';

import listitem from './listitem';

export default construct('div', function ({
    defaultClass, classes, containerClass,
    inputClass, listClass, noResultsClass, emptyClass,
    throttleDelay, blurDelay,
    noResultsInputRender,
    noResultsText,
    showNoResults,
    placeholder,
    actionClass,
    actionText,
    actionCallback,
    name,
    required,
    disabled
}) {
    if (!name) {
        throw new Error('A name is required');
    }

    this.classList.add(defaultClass);
    this.classList.add(emptyClass);
    addClasses(this, classes);

    const props = this.kompo.props,
        container = create('div', {'class': containerClass}),
        input = create('input', {
            'class': inputClass,
            placeholder
        }),
        list = create('ul', {'class': listClass}),
        noResults = create('li', {'class': noResultsClass});

    if (required) {
        this.setAttribute('required', required);
        input.setAttribute('required', required);
    }

    if (disabled) {
        this.setAttribute('disabled', disabled);
        input.setAttribute('disabled', disabled);
    }

    noResults.textContent = noResultsText;


    /**
     * Structure
     */
    container.appendChild(input);
    this.appendChild(container);
    this.appendChild(list);

    /**
     * Events & Reactions
     */
    if (actionCallback) {
        const action = create('a', {'class': actionClass, href: '#'});
        action.textContent = actionText;
        container.appendChild(action);

        action.addEventListener('click', e => {
            e.preventDefault();
            if (props.selected && props.selected.hasOwnProperty('kompo')) {
                actionCallback(props.selected, input.value);
            }
        });
    }

    input.addEventListener('keyup', throttle(e => {
        if (!noResultsInputRender && input.value == '') {
            emptyList(this, list, emptyClass);
            this.classList.remove(noResultsClass);
        } else {
            reactFn(true)(getState(this));
        }
        
        this.setAttribute('value', input.value);

        props.selected = list.children[0];
    }, throttleDelay));

    input.addEventListener('blur', e => {
        setTimeout(() => {
            emptyList(this, list, emptyClass);
        }, blurDelay);
    });

    delegate(list, 'li:not(.' + noResultsClass + ')', 'click', e => {
        e.preventDefault();
        props.selected = e.target;
        input.value = props.selected.textContent;
        this.setAttribute('value', input.value);
        emptyList(this, list, emptyClass);
    });

    const reactFn = (usedInput) => {
        return (state) => {
            if (isObject(state) && !Array.isArray(state)) {
                if (!usedInput) {
                    const v = state.values[name] || '';
                    input.value = v;
                    this.setAttribute('value', v);
                }
                state = state.data;
            }

            if (!Array.isArray(state)) return;

            const frag = createFragment(),
                filter = props.filter;

            for (let i = 0, l = state.length; i < l; ++i) {
                const value = filter ? filter(state[i], input.value) : state[i];

                if (value === false) continue;

                const li = listitem();
                li.textContent = value;
                mount(this, frag, li, () => state[i]);
            }

            empty(list);

            switch (true) {
                case showNoResults && frag.children.length === 0:
                    this.classList.add(noResultsClass);
                    list.appendChild(noResults);
                case frag.children.length === 0 || props.skipInitialListRender:
                    this.classList.add(emptyClass);
                    props.skipInitialListRender = false;
                    break;
                case usedInput:
                    this.classList.remove(noResultsClass);
                    this.classList.remove(emptyClass);
                    list.appendChild(frag);
                    break;
            }
        };
    };

    react(this, reactFn(false));
}, {
    defaultClass: 'o-Autocomplete',
    classes: [],
    containerClass: 'o-Autocomplete-container',
    inputClass: 'o-Autocomplete-input',
    listClass: 'o-Autocomplete-list',
    emptyClass: 'o-Autocomplete--isEmpty',
    noResultsClass: 'o-Autocomplete--noResults',
    filter: undefined,
    throttleDelay: 200,
    blurDelay: 200,
    skipInitialListRender: true,
    noResultsInputRender: false,
    noResultsText: 'No results found',
    showNoResults: true,
    placeholder: 'Start typing and select...',
    selected: undefined,
    actionClass: 'o-Autocomplete-action',
    actionText: 'action',
    actionCallback: undefined
});

function emptyList(ac, list, clss) {
    empty(list);
    ac.classList.add(clss);
}