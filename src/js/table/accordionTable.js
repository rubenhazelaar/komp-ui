import component, {state} from 'kompo';
import {merge, delegate} from 'kompo-util';

import table from './table';
import tableRow from './tableRow';
import accordionTableRow from './accordionTableRow';

export default component.compose(table, {
    rowSlot(c, filtered, raw) {},
    appendRow(
        table,
        frag,
        key,
        props
    ) {
        const tr = tableRow(props),
            contentTr = accordionTableRow(props),
            selector = s => {
                return table.kompo.selector?
                    table.kompo.selector(s).data[key]:
                    s.data[key];
            };

        
        component.mount(table, frag, tr, selector);
        component.mount(table, frag, contentTr, selector);
    },
    on(table) {
        const tableProps = component.getProps(table),
            selector = 'tr';

        delegate(table, selector, 'click', function(e) {
            e.preventDefault();
            const next = this.nextSibling,
                props = component.getProps(table);
        });
    },
    rowClass: '',
    showOne: true
});