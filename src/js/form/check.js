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
    this.href = '#';
    this.classList.add(defaultClass);
    addClasses(this, classes);
    
    const props = this.kompo.props;
    
    this.textContent = label;

    setCheck(this, checked);

    this.addEventListener('click', e => {
        e.preventDefault();
        toggle(props, this);
        if (callback) callback(e, props.checked);
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
        el.classList.remove(props.checkedClass);
        props.checked = false;
    } else {
        el.classList.add(props.checkedClass);
        props.checked = true;
    }
}

export function setCheck(check, b) {
    const props = check.kompo.props;

    if (b === true) {
        check.classList.add(props.checkedClass);
        props.checked = true;
    } else {
        check.classList.remove(props.checkedClass);
        props.checked = false;
    }

}

export function isChecked(check) {
    return check.kompo.props.checked;
}
