import component, {state} from 'kompo';
const {construct, react, getState} = component;
const {dispatch} = state;

import {create, delegate, empty, addClasses, isFunction} from 'kompo-util';

import fecha from 'fecha';
import {compare} from '../utils/dateUtils';

export default construct('table', function ({
    dayNames, defaultClass, classes,
    previousClass, previousDisabledClass, nextClass, nextDisabledClass, previousText, nextText,
    selectedClass,
    notCurrentMonthClass,
    currentClass,
    workingFormat,
    labelFormat,
    outputFormat,
    key,
    setDate,
    getDate,
    dispatchOnSelect,
    selectCallback,
    showRange
}) {
    this.classList.add(defaultClass);
    addClasses(this, classes);

    const previous = create('a', {
            'class': previousClass,
            href: '#previous'
        }),
        next = create('a', {
            'class': nextClass,
            href: '#next'
        }),
        thead = create('thead'),
        headRow = create('tr'),
        headPrevious = create('td'),
        headLabel = create('td', {colspan: 5}),
        headNext = create('td'),
        dayRow = create('tr'),
        tbody = create('tbody'),
        props = this.kompo.props;

    let currentDate = new Date(),
        selectedEl = undefined,
        workingDate = undefined,
        hasNoFuture = false,
        hasNoPast = false;

    currentDate.setHours(0, 0, 0, 0);

    /**
     * Structure elements
     */
    previous.textContent = previousText;
    next.textContent = nextText;

    headPrevious.appendChild(previous);
    headNext.appendChild(next);
    headRow.appendChild(headPrevious);
    headRow.appendChild(headLabel);
    headRow.appendChild(headNext);
    thead.appendChild(headRow);
    this.appendChild(thead);

    for (let i = 0, l = dayNames.length; i < l; ++i) {
        const c = create('th');
        c.textContent = dayNames[i];
        dayRow.appendChild(c);
    }

    // Add tr with dayNames in thead
    thead.appendChild(dayRow);
    this.appendChild(thead);
    this.appendChild(tbody);

    /**
     * Events & reactions
     */
    previous.addEventListener('click', e => {
        e.preventDefault();

        if (hasNoPast) return;

        workingDate.setMonth(workingDate.getMonth() - 1);
        isolatedReact(this);
    });

    next.addEventListener('click', e => {
        e.preventDefault();

        if (hasNoFuture) return;

        workingDate.setMonth(workingDate.getMonth() + 1);
        isolatedReact(this);
    });

    delegate(tbody, 'a', 'click', e => {
        e.preventDefault();

        if (selectedEl) {
            selectedEl.classList.remove(selectedClass);
        }

        selectedEl = e.target;
        selectedEl.classList.add(selectedClass);

        const dateStr = selectedEl.getAttribute('data-date');
        props.selectedDate = fecha.parse(dateStr, workingFormat);

        if (selectCallback) {
            selectCallback(e);
        }

        if (dispatchOnSelect) {
            dispatch(this, state => {
                if (isFunction(setDate)) {
                    setDate(state, key, fecha.format(props.selectedDate, outputFormat));
                } else {
                    state[key] = fecha.format(props.selectedDate, outputFormat);
                }
            });
        }
    });

    props.reactFn = state => {
        if (!props.selectedDate) {
            props.selectedDate = isFunction(getDate)? getDate(state, key): state[key] || new Date(currentDate.getTime());

            if (typeof props.selectedDate === 'string') {
                props.selectedDate = new Date(props.selectedDate);
            }

            props.selectedDate.setHours(0, 0, 0, 0);
        }

        if (!workingDate || props.resetWorkingDate) {
            workingDate = new Date(props.selectedDate.getTime()) || new Date(currentDate.getTime());
            props.resetWorkingDate = false;
        } else {
            workingDate.setHours(0, 0, 0, 0);
        }

        if (props.notBefore) {
            props.notBefore = new Date(props.notBefore);
            props.notBefore.setHours(0, 0, 0, 0)
        }

        if (props.notAfter) {
            props.notAfter = new Date(props.notAfter);
            props.notAfter.setHours(0, 0, 0, 0)
        }

        headLabel.textContent = fecha.format(
            workingDate,
            labelFormat
        );

        empty(tbody);
        hasNoPast = false;
        hasNoFuture = false;
        previous.classList.remove(previousDisabledClass);
        next.classList.remove(nextDisabledClass);

        const days = new Date(workingDate.getFullYear(), workingDate.getMonth() + 1, 0).getDate(),
            start = new Date(workingDate.getFullYear(), workingDate.getMonth(), 0).getDay();

        let tr = create('tr'),
            currentIncrement;
        tbody.appendChild(tr);

        for (let i = 1 - start, l = 42 - start; i <= l; ++i) {
            const dayDate = new Date(workingDate.getFullYear(), workingDate.getMonth(), i),
                formattedDate = fecha.format(
                    dayDate,
                    workingFormat
                ),
                td = create('td');

            let a,
                notBeforeCompared,
                notAfterCompared;

            if (props.notBefore) {
                notBeforeCompared = compare(dayDate, props.notBefore);
            }

            if (props.notAfter) {
                notAfterCompared = compare(dayDate, props.notAfter);
            }

            dayDate.setHours(0, 0, 0, 0);
            const compared = compare(dayDate, currentDate);
            switch (true) {
                case compared === -1 && props.noPast || notBeforeCompared === -1:
                    a = create('span');
                    hasNoPast = true;
                    previous.classList.add(previousDisabledClass);
                    break;
                case compared === 1 && props.noFuture || notAfterCompared === 1:
                    a = create('span');
                    hasNoFuture = true;
                    next.classList.add(nextDisabledClass);
                    break;
                default:
                    a = create('a', {
                        href: '#' + formattedDate,
                        'data-date': formattedDate
                    });

                    if (showRange) {
                        const selectedCompared = compare(dayDate, props.selectedDate);

                        if (props.notBefore && notBeforeCompared >= 0 && selectedCompared <= 0) {
                            a.classList.add('o-DatePicker-d--inRange');
                        }

                        if (props.notAfter && notAfterCompared <= 0 && selectedCompared >= 0) {
                            a.classList.add('o-DatePicker-d--inRange');
                        }
                    }

                    break;
            }

            if (compared === 0) {
                a.classList.add(currentClass);
                currentIncrement = i;
            }

            if (i < 1 || i > days) {
                a.classList.add(notCurrentMonthClass)
            }

            if (props.selectedDate !== null && compare(dayDate, props.selectedDate) === 0) {
                a.classList.add(selectedClass);
                selectedEl = a;
            }

            a.textContent = dayDate.getDate();
            td.appendChild(a);
            tr.appendChild(td);

            if (i < l && (i + start) % 7 === 0) {
                tbody.appendChild(tr);
                tr = create('tr');
            }
        }

        tbody.appendChild(tr); // Don't forget to append last row
    };
    react(this, props.reactFn);
}, {
    dayNames: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    defaultClass: 'o-DatePicker',
    classes: [],
    workingFormat: 'DD/MM/YYYY',
    outputFormat: 'YYYY-MM-DD HH:mm:ss',
    labelFormat: 'MMM YYYY',
    previousClass: 'o-DatePicker-prev',
    previousDisabledClass: 'o-DatePicker-prev--disabled',
    previousText: '<',
    nextClass: 'o-DatePicker-next',
    nextDisabledClass: 'o-DatePicker-next--disabled',
    nextText: '>',
    selectedClass: 'o-DatePicker-d--isSelected',
    notCurrentMonthClass: 'o-DatePicker-d--isNotCurrentMonth',
    currentClass: 'o-DatePicker-d--isCurrent',
    selectedDate: undefined,
    key: 'date',
    setDate: undefined,
    getDate: undefined,
    dispatchOnSelect: false,
    noPast: false,
    noFuture: false,
    notBefore: undefined,
    notAfter: undefined,
    showRange: false,
    selectCallback: undefined,
    resetWorkingDate: false
});

export function outputSelectedDate(datePicker, alternativeFormat) {
    const props = datePicker.kompo.props;
    return fecha.format(props.selectedDate, alternativeFormat || props.outputFormat);
}

export function setSelectedDate(datePicker, date) {
    const props = datePicker.kompo.props;
    
    if (typeof date === 'string') {
        props.selectedDate = new Date(date)   
    } else {
        props.selectedDate = date;
    }

    props.selectedDate.setHours(0,0,0,0);
    props.resetWorkingDate = true;
    isolatedReact(datePicker);
}

export function isolatedReact(datePicker) {
    const state = getState(datePicker);
    datePicker.kompo.props.reactFn(state);
}