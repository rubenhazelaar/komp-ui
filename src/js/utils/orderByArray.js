export default function orderByArray(arr, orderArr) {
    arr.sort(function (a, b) {
        const aIndex = orderArr.indexOf(a),
            bIndex = orderArr.indexOf(b);

        if (aIndex === -1 || bIndex === -1) {
            return 0;
        }
        return aIndex - bIndex;
    });
};