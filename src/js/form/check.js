import component from 'kompo';
const {construct} = component;

import {addClasses, create} from 'kompo-util';

export default construct('a', function({
    defaultClass,
    classes,
    checked,
    callback,
    label
}) {
    this.classList.add(defaultClass);
    addClasses(this, classes);
    
    const props = this.kompo.props;
    
    this.textContent = label;

    toggle(props, this);

    this.addEventListener('click', e => {
        e.preventDefault();
        toggle(props, this);
        if (callback) callback(e);
    });
}, {
    defaultClass: 'o-Check',
    classes: [],
    checked: false,
    checkedClass: 'o-Check--checked',
    callback: undefined,
    label: ''
});

function toggle(props, el) {
    if (props.checked) {
        el.classList.add(props.checkedClass);
        props.checked = false;
    } else {
        el.classList.remove(props.checkedClass);
        props.checked = true;
    }
}

export function isChecked(check) {
    return check.kompo.props.checked;
}
