let busEvent:any = null;
export const getEventBus = () => {
    const EventBus = ()=>{
        let bus = Array<any>();

        const $on = (id:string, callback:Function) => {
            bus.push({id,callback});
        }

        const $emit = (id:string, params:any) => {
            bus.filter(event => event.id === id).forEach((event)=>{
                event.callback(params);
            })
        }
        return {$on,$emit};
    }

    busEvent = busEvent || EventBus();
    return busEvent;
}