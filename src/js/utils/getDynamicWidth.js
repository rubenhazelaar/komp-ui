/**
 * Excepts an object such as:
 * 
 * {
 *      default: 60,
 *      600: 20
 * }
 * 
 * IMPORTANT default key is obligatory
 * 
 * @param widths Object
 * @returns int 
 */
export default function getDynamicWidth(widths) {
    const keys = Object.keys(widths).sort(),
        cw = document.body.clientWidth;

    for(let i = 0, l = keys.length; i < l; ++i) {
        if(cw < keys[i]) {
            return widths[keys[i]];
        }
    }

    return widths.default;
}
