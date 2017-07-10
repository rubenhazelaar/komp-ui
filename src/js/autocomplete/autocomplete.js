import component, {state} from 'kompo';
const {construct, react, mount} = component;
const {dispatch, markDirty} = state;

import {create, createFragment, addClasses, throttle, delegate, empty} from 'kompo-util';

import listitem from './listitem';

export default construct('div', function ({
    defaultClass, classes, containerClass,
    inputClass, listClass, noResultsClass, emptyClass,
    throttleDelay, blurDelay,
    immediateRender,
    noResultsInputRender,
    noResultsText,
    placeholder,
    actionClass,
    actionText,
    actionCallback
}) {
    this.classList.add(defaultClass);

    addClasses(this, classes);

    const props = this.kompo.props,
        container = create('div', {'class': containerClass}),
        input = create('input', {
            'class': inputClass,
            placeholder
        }),
        list = create('ul', {'class': listClass}),
        noResults = create('li', {'class': noResultsClass});

    noResults.textContent = noResultsText;
    if(!immediateRender) list.classList.add(emptyClass);

    let render = immediateRender;

    /**
     * Structure
     */
    container.appendChild(input);
    this.appendChild(container);
    this.appendChild(list);

    /**
     * Events & Reactions
     */
    if(actionCallback) {
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
            emptyList(list, emptyClass);
            list.classList.remove(noResultsClass);
            render = false;
        } else {
            render = true;
        }

        dispatch(this, state => {
            markDirty(state);
        });

        props.selected = list.children[0];
    }, throttleDelay));

    input.addEventListener('blur', e => {
        setTimeout(() => {
            emptyList(list, emptyClass);
        }, blurDelay);
    });

    delegate(list, 'li:not(.'+noResultsClass+')', 'click', e => {
        e.preventDefault();
        props.selected = e.target;
        input.value = props.selected.textContent;
        emptyList(list, emptyClass);
    });

    react(this, state => {
        if (!render || !Array.isArray(state)) return;

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

        if (frag.children.length === 0) {
            list.appendChild(noResults);
            list.classList.add(noResultsClass);
        } else {
            list.classList.remove(noResultsClass);
            list.appendChild(frag);
        }

        list.classList.remove(emptyClass);
    })
}, {
    defaultClass: 'o-Autocomplete',
    classes: [],
    containerClass: 'o-Autocomplete-container',
    inputClass: 'o-Autocomplete-input',
    listClass: 'o-Autocomplete-list',
    emptyClass: 'o-Autocomplete-empty',
    noResultsClass: 'o-Autocomplete-noResults',
    filter: undefined,
    throttleDelay: 200,
    blurDelay: 200,
    immediateRender: false,
    noResultsInputRender: false,
    noResultsText: 'No results found',
    placeholder: 'Start typing and select...',
    selected: undefined,
    actionClass: 'o-Autocomplete-action',
    actionText: 'action',
    actionCallback: undefined
});

function emptyList(list, clss) {
    empty(list);
    list.classList.add(clss);
}