interface JQuery
{
    slider(options: any): JQuery;
}

interface JQueryStatic
{
    slider(template:string,data?:any,options?:any): JQuery;
    slider(template:(data:any)=>string,data?:any,options?:any): JQuery;
}