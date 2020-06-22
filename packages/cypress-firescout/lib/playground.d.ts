declare type Item = {
    type: 'handle' | 'ctx' | 'collection';
    el: any;
    payload: string;
    index?: number;
};
