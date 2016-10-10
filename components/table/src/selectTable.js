import component, {state} from 'kompo';
import {merge, delegate} from 'kompo-util';

import table from './table';
import tableRow from './tableRow';
import accordionTableRow from './accordionTableRow';

export default component.compose(table, {
    on(table) {
        const tableProps = component.getProps(table),
            selector = tableProps.rowClass?
                '.' + tableProps.rowClass:
                'tr[data-key]',
            selectedClass = tableProps.selectedClass,
            // Set a new array for maintaining selected rows based on their key
            selectedRows = tableProps.selectedRows = [];

        delegate(table, selector, 'click', function(e) {
            e.preventDefault();
            const key = parseInt(this.getAttribute('data-key')),
                index = selectedRows.indexOf(key);

            if(index === -1) {
                selectedRows.push(key);
                if(selectedClass) this.classList.add(selectedClass);
            } else {
                selectedRows.splice(index, 1);
                if(selectedClass) this.classList.remove(selectedClass);
            }
        });
    },
    rowClass: '',
    selectedClass: '',
    selectOne: false
});