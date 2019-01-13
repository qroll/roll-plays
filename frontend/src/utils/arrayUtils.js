export const remove = (list, index) => [
    ...list.slice(0, index),
    ...list.slice(index + 1)
];

export const insert = (list, index, item) => [
    ...list.slice(0, index),
    item,
    ...list.slice(index)
];

export const reorder = (list, src, dst) => {
    let item = list[src];
    let removed = remove(list, src);
    let result = insert(removed, dst, item);
    return result;
};
