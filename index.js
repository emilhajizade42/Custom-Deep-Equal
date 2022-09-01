function deepEquals(obj1, obj2) {
    if (obj1 === obj2) return true;

    if (
        typeof obj1 !== typeof obj2 ||
        obj1 instanceof Array !== obj2 instanceof Array ||
        obj1 == null ||
        obj2 == null
    ) {
        return false;
    }
   
    const keysA = Object.keys(obj1);
    const keysB = Object.keys(obj2);

    if (keysA.length !== keysB.length) {
        return false;
    }

    let result = true;

    keysA.forEach((key) => {
        if (!keysB.includes(key)) {
            result = false;
        }

        if (
            typeof obj1[key] === 'function' ||
            typeof obj2[key] === 'function'
        ) {
            if (obj1[key].toString() !== obj2[key].toString()) {
                result = false;
            }
        }

        if (!deepEquals(obj1[key], obj2[key])) {
            result = false;
        }
    });

    return result;
}

deepEquals(1, 1); // true
console.log(deepEquals(1, 1));
deepEquals(1, "1"); // false
console.log(deepEquals(1, "1"));
deepEquals(null, null); // true
console.log(deepEquals(null, null));
deepEquals(null, undefined); // false
console.log(deepEquals(null, undefined));
deepEquals([], []); // true
console.log(deepEquals([], []));
deepEquals({}, {}); // true
console.log(deepEquals({}, {}));
deepEquals([], {}); // false
console.log("[],{}",deepEquals([], {}));
deepEquals({a: 123, b: {c: [4, 5, 6]}}, {a: 123, b: {c: [4, 5, 6]}}); // true
console.log(deepEquals({a: 123, b: {c: [4, 5, 6]}}, {a: 123, b: {c: [4, 5, 6]}}));
deepEquals({a: 123, b: {c: [4, 5, 6]}}, {b: {c: [4, 5, 6]}}); // false
console.log(deepEquals({a: 123, b: {c: [4, 5, 6]}}, {b: {c: [4, 5, 6]}}));
deepEquals({a: 123, b: {c: [4, 5, 6]}}, {a: 123, b: {c: [4, '5', 6]}}); // false
console.log(deepEquals({a: 123, b: {c: [4, 5, 6]}}, {a: 123, b: {c: [4, '5', 6]}}));
deepEquals([1, 2, [3, 4],1], [1, 2, [3, 4]]); // true
console.log(deepEquals([1, 2, [3, 4],1], [1, 2, [3, 4]]));

deepEquals([1, 2, [3, 4, {a: 'abc'}]], [1, 2, [3, 4, {a: 'abc'}]]); // true
console.log(deepEquals([1, 2, [3, 4, {a: 'abc'}]], [1, 2, [3, 4, {a: 'abc'}]]));