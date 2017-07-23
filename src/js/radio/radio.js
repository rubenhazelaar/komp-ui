import component from 'kompo';
const {construct} = component;

import {addClasses, create} from 'kompo-util';

export default construct('div', function({
    defaultClass,
    classes,
    defaultOptionIndex,
    options,
    optionClass,
    callback
}) {
    this.classList.add(defaultClass);
    addClasses(this, classes);
    
    const props = this.kompo.props,
        keys = Object.keys(options);
    
    for(let i = 0, l = keys.length; i < l; ++i) {
        const key = keys[i],
            value = options[key],
            a = create('a', {'class': optionClass, href: '#'+key});
        
        a.textContent = value;

        if (defaultOptionIndex === i) {
            setSelected(props, a, key, value);
        }
        
        a.addEventListener('click', e => {
            e.preventDefault();
            
            if (props.selected === a) return;

            setSelected(props, a, key, value);
            if (callback) callback(e, key, value);
        });

        this.appendChild(a);
    }
}, {
    defaultClass: 'o-Radio',
    classes: [],
    defaultOptionIndex: undefined,
    optionClass: 'o-Radio-option',
    selectedOptionClass: 'o-Radio-option--selected',
    options: {},
    selected: undefined,
    selectedKey: undefined,
    selectedValue: undefined,
    callback: undefined
});

function setSelected(props, el, key, value) {
    if (props.selected) props.selected.classList.remove(props.selectedOptionClass);
    el.classList.add(props.selectedOptionClass);
    props.selected = el;
    props.selectedKey = key;
    props.selectedValue = value;
}

export function getKey(radio) {
    return radio.kompo.selectedKey;
}

export function getValue(radio) {
    return radio.kompo.selectedValue;
}