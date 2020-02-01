let busEvent:any = null;
export const getEventBus = () => {
    const EventBus = ()=>{
        let bus = Array<any>();

        const $on = (id:string, callback:Function) => {
            bus.push({id,callback});
        }

        const $emit = (id:string, params:any) => {
            debugger;
            bus.filter(event => event.id === id).forEach((event)=>{
                debugger;
                event.callback(params);
            })
        }
        return {$on,$emit};
    }
    debugger;
    
    busEvent = busEvent || EventBus();
    return busEvent;
}