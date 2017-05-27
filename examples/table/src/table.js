import component, {state} from 'kompo';
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
            props = component.getProps(this),
            selectedRows = state.selectedRows,
            minimize = state.minimize;

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
            columnElement: 'th',
            minimize,
            minimizeWhitelist: props.minimizeWhitelist
        });
        
        const dataLength = data.length;
        let os = offset && offset <= dataLength? offset: 0;
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
                selectedRows,
                minimize,
                minimizeWhitelist: props.minimizeWhitelist
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
    minimizeWhitelist: undefined,
    appendRow(table, parent, props) {
        const tr = tableRow(props);
        component.mount(table, parent, tr, table.kompo.selector);
    }
});

export const tableActions = {
    addLimit(Element, add) {
        state.dispatch(Element, s => {
            s.limit = s.limit + add > s.data.length?
                s.data.length:
                s.limit + add;
        });
    },
    subLimit(Element, sub) {
        state.dispatch(Element, s => {
            s.limit = s.limit - sub <= 0?
                0:
                s.limit - sub;
        });
    },
    setLimit(Element, limit) {
        state.dispatch(Element, s => {
            if(limit <= 0) {
                s.limit = 0;
                return
            }

            if(limit > s.data.length) {
                s.limit = s.data.length;
                return
            }
            
            s.limit = limit;
        });
    },
    addOffset(Element, add) {
        state.dispatch(Element, s => {
            s.offset = s.offset + add >= s.data.length?
                s.data.length:
                s.offset + add;
        });
    },
    subOffset(Element, sub) {
        state.dispatch(Element, s => {
            s.offset = s.offset - sub <= 0?
                0:
                s.offset - sub;
        });
    },
    setOffset(Element, offset) {
        state.dispatch(Element, s => {
            if(offset <= 0) {
                s.offset = 0;
                return
            }

            if(offset > s.data.length) {
                s.offset = s.data.length;
                return
            }

            s.offset = offset;
        });
    },
    minimize(Element) {
        state.dispatch(Element, s => {
            s.minimize = true;  
        });
    },
    maximize(Element) {
        state.dispatch(Element, s => {
            s.minimize = false;
        });
    }
};