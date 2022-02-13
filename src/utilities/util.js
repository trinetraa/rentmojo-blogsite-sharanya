export const getQuery = (query) => {
    query = query.replace('?', '');
    const queryArray = query.split('&');
    const queryObject = {};
    queryArray.map((el) => {
        let params = el.split('=');
        queryObject[params[0]] = params[1];
    });
    return queryObject;
}