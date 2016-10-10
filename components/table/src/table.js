import component from 'kompo';
import {empty, isFunction, addClasses} from 'kompo-util';

import tableRow from './tableRow';

export default component.construct('table', function({
    appendRow,
    rowFilter,
    columnFilter,
    on,
    classes,
    oddRowClass,
    evenRowClass
}) {
    const head = document.createElement('thead'),
        body = document.createElement('tbody'),
        frag = document.createDocumentFragment();
    
    if(isFunction(on)) on(this);

    addClasses(this, classes);

    component.react(this, state => {
        const data = state.data,
            offset = state.offset,
            limit = state.limit,
            props = component.getProps(this);

        if(!Array.isArray(data) || data.length < 1) return;

        props.rows = [];

        const hasRowFilter = isFunction(rowFilter),
            hasColumnFilter = isFunction(columnFilter),
            keys = Object.keys(hasColumnFilter? columnFilter(data[0]): data[0]);

        // First empty out head and then refresh
        empty(head);
        appendRow(this, head, {
            filtered: keys,
            raw: data[0],
            columnElement: 'th'
        });
        
        const dataLength = data.length;
        let os = offset && offset < dataLength? offset: 0;
        const l = typeof limit !== 'undefined' && os+limit < dataLength? limit: dataLength;
        
        for(os; os < l; ++os) {
            const offsetData = data[os];
            if (hasRowFilter && !rowFilter(offsetData)) continue;
            appendRow(this, frag, {
                filtered: hasColumnFilter? columnFilter(offsetData): offsetData,
                raw: offsetData,
                index: os,
                defaultClass: os % 2 == 0? evenRowClass: oddRowClass,
                key: os + 1,
                rows: props.rows,
                selectedClass: props.selectedClass,
                selectedRows: props.selectedRows
            });
        }

        empty(body);
        body.appendChild(frag);
    });

    this.appendChild(head);
    this.appendChild(body);
}, {
    classes: [],
    oddRowClass: '',
    evenRowClass: '',
    appendRow(table, parent, props) {
        const tr = tableRow(props);
        component.mount(table, parent, tr, table.kompo.selector);
    }
});
