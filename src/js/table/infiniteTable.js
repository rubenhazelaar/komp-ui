import component, {state} from 'kompo';
import {empty, isFunction, addClasses, throttle} from 'kompo-util';

import tableRow from './tableRow';
import tableHead from './tableHead';


export default component.construct('table', function({
    appendRow,
    on,
    classes,
    oddRowClass,
    evenRowClass,
    selectedClass,
    appendHead,
    headRowClass,
    emptyNotice,
    emptyClass,
    scrollableElement,
    topSpacer,
    bottomSpacer,
    rowHeight,
    blockSize,
    scrollThrottle,
    uniqueKey
}) {
    const head = document.createElement('thead'),
        body = document.createElement('tbody'),
        props = component.getProps(this),
        frag = document.createDocumentFragment();

    if(isFunction(on)) on(this);

    addClasses(this, classes);

    let wasEmpty = false;

    scrollableElement = isFunction(scrollableElement)? scrollableElement(): scrollableElement;

    if(scrollableElement) {
        scrollableElement.style.overflowAnchor = 'none'; // Prevent weird Chrome 56+ behavior
        scrollableElement.addEventListener('scroll', throttle(e => {
            const state = component.getState(this),
                dataLength = state.data.length,
                scrollPosition = scrollableElement.scrollTop,
                // TODO clientHeight could be troublesome
                reqPerBody = (Math.ceil((scrollableElement.clientHeight / rowHeight) / blockSize) + 2) * blockSize,
                visibleStart = Math.floor(scrollPosition / rowHeight),
                renderStart = Math.max((Math.floor(visibleStart / blockSize) - 1) * blockSize, 0),
                visibleEnd = Math.min(renderStart + reqPerBody, dataLength);

            if(state.offset !== renderStart || state.limit !== visibleEnd - renderStart) {
                state.offset = renderStart;
                state.limit = visibleEnd - renderStart;
                reactFn(state);
            }
        },scrollThrottle));
    }

    const reactFn = state => {
        const data = state.data,
            offset = state.offset,
            limit = state.limit,
            minimize = state.minimize,
            rowFilter = props.rowFilter,
            columnFilter = props.columnFilter;

        if(!Array.isArray(data)) return;

        // Empty out before append
        empty(head);

        // When empty...
        if(data.length == 0) {
            // ... render empty notice
            const tr = document.createElement('tr'),
                td = document.createElement('td');

            td.textContent = emptyNotice;
            tr.appendChild(td);
            head.appendChild(tr);
            this.classList.add(emptyClass);
            wasEmpty = true;
            empty(body);
            return;
        } else if(wasEmpty)  {
            // Remove empty notice
            this.classList.remove(emptyClass);
            wasEmpty = false;
        }

        const hasRowFilter = isFunction(rowFilter),
            hasColumnFilter = isFunction(columnFilter);

        appendHead(
            this,
            head,
            {
                defaultClass: headRowClass,
                minimizeWhitelist: props.minimizeWhitelist,
                hasColumnFilter,
                columnFilter
            }
        );

        const dataLength = data.length;
        let os = offset && offset <= dataLength? offset: 0;
        const l = typeof limit !== 'undefined' && os+limit < dataLength? os+limit: dataLength;

        // Set spacer heights
        bottomSpacer.style.height = (rowHeight * ((dataLength) - (offset+limit)) + 'px');
        topSpacer.style.height = ((rowHeight * offset) + 'px');

        for(os; os < l; ++os) {
            if (hasRowFilter && !rowFilter(data[os])) continue;
            appendRow(
                this,
                frag,
                os,
                {
                    defaultClass: os % 2 == 0? evenRowClass: oddRowClass,
                    selectedClass,
                    hasColumnFilter,
                    columnFilter,
                    selected: props.selected,
                    uniqueKey
                }
            );
        }



        empty(body);
        body.appendChild(frag);
    };

    component.react(this, reactFn);

    this.appendChild(head);
    this.appendChild(body);
}, {
    classes: [],
    oddRowClass: '',
    evenRowClass: '',
    headRowClass: '',
    minimizeWhitelist: undefined,
    emptyNotice: 'No data found',
    emptyClass: 'empty',
    appendRow(
        table,
        frag,
        key,
        props
    ) {
        const tr = tableRow(props);
        component.mount(table, frag, tr, s => {
            const ns = table.kompo.selector?
                table.kompo.selector(s).data[key]:
                s.data[key];

            if (props.selected && ns.hasOwnProperty(props.uniqueKey)) {
                ns.selected = props.selected.hasOwnProperty(ns[props.uniqueKey]);
            }

            return ns;
        });
    },
    appendHead(
        table,
        head,
        props
    ) {
        const tr = tableHead(props);
        component.mount(table, head, tr, s => {
            return table.kompo.selector?
                table.kompo.selector(s).data[0]:
                s.data[0];
        });
    },
    scrollableElement: undefined,
    topSpacer: undefined,
    bottomSpacer: undefined,
    rowHeight: 20,
    blockSize: 5,
    scrollThrottle: 10,
    uniqueKey: 'id'
});

export function resetSpacers(infiniteTable) {
    const props = infiniteTable.kompo.props;
    props.topSpacer.style.height = 0;
    props.bottomSpacer.style.height = 0;
}

export function multiSelect(table, e) {
    const target = e.target.parentNode,
        tableProps = table.kompo.props,
        key = keySelected(tableProps, target);

    // Remove if already in selected
    if (tableProps.selected.hasOwnProperty(key)) {
        target.classList.remove(tableProps.selectedClass);
        delete tableProps.selected[key];
        return
    }

    tableProps.selected[key] = target;
    target.classList.add(tableProps.selectedClass);
}

function keySelected(tableProps, row) {
    if (!tableProps.selected) {
        tableProps.selected = {};
    }

    const s = component.getState(row);
    return s[tableProps.uniqueKey];
}