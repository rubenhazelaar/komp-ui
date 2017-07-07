import component from 'kompo';
const {construct, mount, children} = component;

import {create} from 'kompo-util';

import datePicker, {outputSelectedDate, isolatedReact} from './datePicker';
import multiPanel, {slideTo} from  '../multiPanel/multiPanel';
import panel from '../multiPanel/panel';

import {compare} from '../utils/dateUtils';

export default construct('div', function ({
    defaultClass, selectedClass, navClass, fromClass, toClass, applyContainerClass, applyClass,
    applyFormat, applyCallback
}) {
    this.classList.add(defaultClass);

    const nav = create('nav', {'class': navClass}),
        from = create('a', {'class': fromClass, href: '#from'}),
        to = create('a', {'class': toClass, href: '#to'}),
        fromDatePicker = datePicker({
            key: 'from',
            selectCallback: e => {
                slideTo(mp, panels, 1);
                toggleToTo(from, to, selectedClass);

                const fromProps = fromDatePicker.kompo.props,
                    toProps = toDatePicker.kompo.props;

                toProps.notBefore = outputSelectedDate(fromDatePicker);

                // If from > to then set selected of toDatePicker to same day
                if (compare(fromProps.selectedDate, toProps.selectedDate) === 1) {
                    toProps.selectedDate = fromProps.selectedDate;
                }

                formatApply(applyTextDate, fromDatePicker, toDatePicker);

                // Only rerenders toDatePicker
                isolatedReact(toDatePicker);
            },
            outputFormat: applyFormat
        }),
        toDatePicker = datePicker({
            key: 'to',
            selectCallback: () => {
                formatApply(applyTextDate, fromDatePicker, toDatePicker);
            },
            outputFormat: applyFormat
        }),
        mp = multiPanel(),
        fromPanel = panel({component: fromDatePicker}),
        toPanel = panel({component: toDatePicker}),
        panels = [fromPanel, toPanel],
        applyContainer = create('div', {'class': applyContainerClass}),
        apply = create('a', {'class': applyClass, href: '#apply'}),
        applyText = create('span'),
        applyTextDate = create('span');

    from.textContent = 'From';
    to.textContent = 'To';
    applyText.textContent = 'Apply';

    /**
     * Structure
     */
    nav.appendChild(from);
    nav.appendChild(to);
    this.appendChild(nav);

    children(mp, [fromPanel, toPanel]);
    mount(this, mp);

    apply.appendChild(applyText);
    apply.appendChild(applyTextDate);
    applyContainer.appendChild(apply);
    this.appendChild(applyContainer);
    formatApply(applyTextDate, fromDatePicker, toDatePicker);

    /**
     * Events & Reactions
     */
    slideTo(mp, panels, 0);
    from.classList.add(selectedClass);

    from.addEventListener('click', e => {
        e.preventDefault();
        slideTo(mp, panels, 0);
        toggleToFrom(from, to, selectedClass);
    });

    to.addEventListener('click', e => {
        e.preventDefault();
        slideTo(mp, panels, 1);
        toggleToTo(from, to, selectedClass);
        toDatePicker.kompo.props.notBefore = outputSelectedDate(fromDatePicker);
    });

    apply.addEventListener('click', e => {
        e.preventDefault();

        if (applyCallback) {
            applyCallback(this, fromDatePicker, toDatePicker);
        }
    })
}, {
    defaultClass: 'o-DateRange',
    selectedClass: 'o-DateRange-nav--selected',
    navClass: 'o-DateRange-nav',
    fromClass: 'o-DateRange-from',
    toClass: 'o-DateRange-to',
    applyContainerClass: 'o-DateRange-applyContainer',
    applyClass: 'o-DateRange-apply',
    applyFormat: 'YYYY-MM-DD',
    applyCallback: undefined
});

function toggleToFrom(from, to, clss) {
    from.classList.add(clss);
    to.classList.remove(clss);
}

function toggleToTo(from, to, clss) {
    from.classList.remove(clss);
    to.classList.add(clss);
}

function formatApply(el, fromDatePicker, toDatePicker) {
    el.textContent = outputSelectedDate(fromDatePicker) + ' / ' + outputSelectedDate(toDatePicker);
}