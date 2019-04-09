const actions = (store: any) => ({
    increment: (state: any) => ({ count: state.count + 1 }),
    decrement: (state: any) => ({ count: state.count - 1 })
});

export default actions;
