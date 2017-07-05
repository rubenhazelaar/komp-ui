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
    scrollThrottle
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
                    selectedClass: selectedClass,
                    hasColumnFilter,
                    columnFilter
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
            return table.kompo.selector?
                table.kompo.selector(s).data[key]:
                s.data[key];
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
    scrollThrottle: 10
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