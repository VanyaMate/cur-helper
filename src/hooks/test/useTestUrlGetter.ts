export const useTestUrlGetter = function (id: string) {
    return '/test/' + id.split('-').join('/');
};