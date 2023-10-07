export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u;
    })
} // функция проходит по редьюсору и при совподении обновляет state

export default updateObjectInArray

