export const useTestUrlGetter = function (id: string) {
    return '/_test_/' + id.split('-').join('/');
};