import component, {state} from 'kompo';
const {construct, react, mount, unmountAll, getState, debugLifeCycle} = component;
const {triggerUpdate, dispatch} = state;

import {addClasses, create, empty, delegate, throttle} from 'kompo-util';

import arrayMove from '../utils/arrayMove';
import orderByArray from '../utils/orderByArray';

const item = construct('li', function ({
    defaultClass,
    classes,
    name, alias,
    disabled, disabledClass,
    checkClass,
    wrapperClass,
    placeholder
}) {
    this.classList.add(defaultClass);
    addClasses(this, classes);

    const check = create('a', {'class': checkClass, href: '#activateOrDisable'}),
        wrapper = create('div', {'class': wrapperClass}),
        nameEl = create('span'),
        aliasEl = create('input', {placeholder});

    nameEl.textContent = name;
    if (alias) aliasEl.value = alias;

    wrapper.appendChild(nameEl);
    wrapper.appendChild(aliasEl);
    this.appendChild(check);
    this.appendChild(wrapper);

    if (disabled) {
        this.classList.add(disabledClass);
    }

    /**
     * Events
     */
    aliasEl.addEventListener('keyup', throttle(e => {
        const state = getState(this);
        state.mapping[name] = aliasEl.value;
    }, 100));
}, {
    defaultClass: 'o-OrderList-item',
    classes: [],
    name: 'N/A',
    alias: '',
    index: undefined,
    disabled: false,
    disabledClass: 'o-OrderList-item--disabled',
    checkClass: 'o-OrderList-item-check',
    wrapperClass: 'o-OrderList-item-wrapper',
    placeholder: 'Provide an alias for this column...'
});

export default construct('div', function ({
    defaultClass,
    classes,
    upText,
    downText,
    available,
    disabledClass,
    wrapperClass,
    upClass,
    downClass,
    listClass,
    itemClass,
    itemWrapperClass,
    itemCheckClass,
    itemPlaceholder,
    itemDisabledClass
}) {
    this.classList.add(defaultClass);
    addClasses(this, classes);

    const orderList = this,
        props = this.kompo.props,
        wrapper = create('div', {'class': wrapperClass}),
        up = create('a', {'class': upClass, href: '#up'}),
        down = create('a', {'class': downClass, href: '#down'}),
        list = create('ol', {'class': listClass});

    up.textContent = upText;
    down.textContent = downText;
    wrapper.appendChild(up);
    wrapper.appendChild(down);
    this.appendChild(wrapper);
    this.appendChild(list);

    /**
     * Eventhandlers
     */
    const reorderFn = im => {
        return e => {
            e.preventDefault();

            if (!props.selectedItem) return;

            const name = props.selectedItem.kompo.props.name,
                ai = available.indexOf(name),
                aim = ai + im;

            arrayMove(available, ai, aim >= available.length ? 0 : aim);
            dispatch(orderList, state => {
                orderByArray(state.want, available);
            });
        };
    };
    up.addEventListener('click', reorderFn(-1));
    down.addEventListener('click', reorderFn(1));

    delegate(this, 'li', 'click', function (e) {
        e.preventDefault();

        if (e.target.tagName === 'A') {
            dispatch(orderList, state => {
                toggleItem(this, state);
            });
        } else if (this.kompo.props.disabled === false) {
            setSelected(orderList, this);
        }
    });

    let ordered = false;

    /**
     * Reactions
     */
    const reactFn = state => {
        console.log('REACY');
        unmountAll(this);
        empty(list);

        const want = state.want || [],
            mapping = state.mapping || {},
            ics = [],
            selectedItem = props.selectedItem,
            selectedName = selectedItem ? selectedItem.kompo.props.name : undefined;

        if (!ordered) {
            orderByArray(available, want);
            ordered = true;
        }

        for (let i = 0, l = available.length; i < l; ++i) {
            const name = available[i],
                hasMapping = mapping.hasOwnProperty(name),
                ic = item({
                    name: name,
                    alias: hasMapping ? mapping[name] : undefined,
                    index: i,
                    defaultClass: itemClass,
                    wrapperClass: itemWrapperClass,
                    checkClass: itemCheckClass,
                    placeholder: itemPlaceholder,
                    disabledClass: itemDisabledClass
                });

            if (want.indexOf(name) === -1) {
                ic.classList.add(disabledClass);
                ic.kompo.props.disabled = true;
            } else {
                ic.classList.remove(disabledClass);
                ic.kompo.props.disabled = false;
            }

            if (selectedItem && selectedName === name) {
                setSelected(orderList, ic);
            }

            ics.push(ic);
            list.appendChild(ic);
        }

        mount(this, ics, this.kompo.selector);
        this.appendChild(list);
    };
    react(this, reactFn);
}, {
    defaultClass: 'o-OrderList',
    classes: [],
    upText: 'Up',
    downText: 'Down',
    available: [],
    selectedItem: undefined,
    selectedClass: 'o-OrderList-item--selected',
    disabledClass: 'o-OrderList-item--disabled',
    wrapperClass: 'o-OrderList-wrapper',
    upClass: 'o-OrderList-up',
    downClass: 'o-OrderList-down',
    listClass: 'o-OrderList-list',
    itemClass: 'o-OrderList-item',
    itemDisabledClass: 'o-OrderList-item--disabled',
    itemWrapperClass: 'o-OrderList-item-wrapper',
    itemCheckClass: 'o-OrderList-item-check',
    itemPlaceholder: 'Provide an alias for this column...'
});

function setSelected(orderList, item) {
    const props = orderList.kompo.props,
        selectedItem = props.selectedItem;

    if (selectedItem === item) return;

    if (selectedItem) {
        selectedItem.classList.remove(props.selectedClass);
    }

    item.classList.add(props.selectedClass);
    props.selectedItem = item;
}

function toggleItem(item, state) {
    const props = item.kompo.props,
        name = props.name,
        disabledClass = props.disabledClass;

    if (props.disabled) {
        item.classList.remove(disabledClass);
        props.disabled = false;
        state.want.splice(state.want.indexOf(name), 0, name);
    } else {
        item.classList.add(disabledClass);
        props.disabled = true;
        state.want.splice(state.want.indexOf(name), 1);
    }
}