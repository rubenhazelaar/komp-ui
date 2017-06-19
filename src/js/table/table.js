import component, {state} from 'kompo';
import {empty, isFunction, addClasses} from 'kompo-util';

import tableRow from './tableRow';
import tableHead from './tableHead';

export default component.construct('table', function({
    appendRow,
    rowFilter,
    columnFilter,
    on,
    classes,
    oddRowClass,
    evenRowClass,
    selectedClass,
    appendHead,
    headRowClass
}) {
    const head = document.createElement('thead'),
        body = document.createElement('tbody'),
        props = component.getProps(this),
        frag = document.createDocumentFragment();
    
    if(isFunction(on)) on(this);

    addClasses(this, classes);

    props.rows = [];

    component.react(this, state => {
        const data = state.data,
            offset = state.offset,
            limit = state.limit,
            minimize = state.minimize,
            rowFilter = props.rowFilter,
            columnFilter = props.columnFilter;

        if(!Array.isArray(data) || data.length < 1) return;

        const hasRowFilter = isFunction(rowFilter),
            hasColumnFilter = isFunction(columnFilter);

        appendHead(
            this,
            head,
            props,
            {
                defaultClass: headRowClass,
                minimizeWhitelist: props.minimizeWhitelist,
                hasColumnFilter,
                columnFilter
            }
        );

        const dataLength = data.length;
        let os = offset && offset <= dataLength? offset: 0;
        const l = typeof limit !== 'undefined' && os+limit < dataLength? limit: dataLength;

        for(os; os < l; ++os) {
            if (hasRowFilter && !rowFilter(data[os])) continue;
            appendRow(
                this,
                frag,
                props.rows,
                os,
                {
                    defaultClass: os % 2 == 0? evenRowClass: oddRowClass,
                    selectedClass: selectedClass,
                    hasColumnFilter,
                    columnFilter
                }
            );
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
    headRowClass: '',
    minimizeWhitelist: undefined,
    appendRow(
        table,
        frag,
        rows,
        key,
        props
    ) {
        if(rows[key]) {
            frag.appendChild(rows[key]);
            return;
        }

        const tr = tableRow(props);
        rows[key] = tr;
        component.mount(table, frag, tr, s => {
            return table.kompo.selector?
                table.kompo.selector(s).data[key]:
                s.data[key];
        });
    },
    appendHead(
        table,
        head,
        tableProps,
        props
    ) {
        if(tableProps.headRow) return;

        const tr = tableHead(props);
        tableProps.headRow = tr;
        component.mount(table, head, tr, s => {
            return table.kompo.selector?
                table.kompo.selector(s).data[0]:
                s.data[0];
        });
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