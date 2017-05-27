import component, {state} from 'kompo';
import {merge, delegate} from 'kompo-util';

import table from './table';

export default component.compose(table, {
    on(table) {
        const tableProps = component.getProps(table),
            selector = tableProps.rowClass?
                '.' + tableProps.rowClass:
                'tr[data-key]';

        delegate(table, selector, 'click', function(e) {
            state.dispatch(table, s => {
                const selectedRows = s.selectedRows = Array.isArray(s.selectedRows)?
                    s.selectedRows: [],
                    key = parseInt(this.getAttribute('data-key')),
                    index = selectedRows.indexOf(key);

                if(index === -1) {
                    selectedRows.push(key);
                } else {
                    selectedRows.splice(index, 1);
                }

                // Force rerender
                s.selectedRowsLength = selectedRows.length;
            });
        });
    },
    rowClass: '',
    selectedClass: '',
    selectOne: false
});