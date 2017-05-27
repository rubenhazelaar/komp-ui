import component, {state} from 'kompo';
import {merge, delegate} from 'kompo-util';

import table from './table';
import tableRow from './tableRow';
import accordionTableRow from './accordionTableRow';

export default component.compose(table, {
    rowSlot(c, filtered, raw) {},
    appendRow(table, parent, props) {
        const tableProps = component.getProps(table);

        props.defaultClass = tableProps.rowClass;

        component.append(parent, tableRow(props));

        if(typeof props.index !== 'undefined') {
            component.append(parent, accordionTableRow(
                merge(props, tableProps)
            ));
        }
    },
    on(table) {
        const tableProps = component.getProps(table),
            selector = tableProps.rowClass?
                '.' + tableProps.rowClass:
                'tr[data-key]';

        delegate(table, selector, 'click', function(e) {
            e.preventDefault();
            const next = this.nextSibling,
                props = component.getProps(table),
                currentKey = this.getAttribute('data-key');

            if(next) {
                next.style.display = next.style.display === 'none'?
                    null: 'none';
            }

            if(props.showOne && props.key && props.key !== currentKey) {
                const tr = props.rows[props.key-1].nextSibling;
                tr.style.display = 'none';
            }

            props.key = currentKey;
        });
    },
    rowClass: '',
    showOne: true
});