import component from 'kompo';

export default component.construct('tr', function({
    defaultClass, filtered, columnElement, key, rows, selectedClass, selectedRows, minimize, minimizeWhitelist
}) {
    let arr,
        isObject = false;
    if(!Array.isArray(filtered)) {
        arr = Object.keys(filtered);
        isObject = true;
    } else {
        arr = filtered;
    }

    if(defaultClass) this.classList.add(defaultClass);

    if(rows) {
        rows.push(this);
    }

    if(key) {
        this.setAttribute('data-key', key);

        if(typeof selectedRows !== 'undefined' && selectedRows.indexOf(key) > -1) {
            if(selectedClass) this.classList.add(selectedClass);
        }
    }

    for(let i = 0, l = arr.length; i < l; ++i) {
        const k = isObject? arr[i]: i;

        if(typeof minimizeWhitelist !== 'undefined') {
            const onWhitelist = isObject?
                minimizeWhitelist.indexOf(k) === -1:
                minimizeWhitelist.indexOf(filtered[k]) === -1;
            if(minimize && onWhitelist) {
                continue;
            }
        }

        const c = this.appendChild(document.createElement(columnElement));
        c.textContent = filtered[k];
    }
}, {
    key: '',
    defaultClass: '',
    filtered: [],
    raw: [],
    columnElement: 'td',
    index: undefined
});