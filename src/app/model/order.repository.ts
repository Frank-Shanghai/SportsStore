import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "./order.model";
import { RestDataSource } from "./rest.datasource";
import { from, map } from "rxjs";

@Injectable()
export class OrderRepository {
    private orders: Order[] = [];
    private loaded: boolean = false;

    constructor(private dataSoruce: RestDataSource) {}

    loadOrders() {
        this.loaded = true;
        this.dataSoruce.getOrders().subscribe(orders => this.orders = orders);
    }

    getOrders(): Order[] {
        if(!this.loaded) {
            this.loadOrders();
        }
        return this.orders;
    }

    saveOrder(order: Order): Observable<Order> {
        // var observableResult = this.dataSoruce.saveOrder(order);

        // observableResult.subscribe(o => {
        //     this.orders.push(o);
        // });

        // return observableResult;
        // return this.dataSoruce.saveOrder(order).pipe(map(o => {
        //     var serializedOrder = JSON.stringify(o);   
        //     this.orders.push(JSON.parse(serializedOrder));
        //     return o;
        // }));
        return this.dataSoruce.saveOrder(order);
    }

    updateOrder(order: Order) {
        this.dataSoruce.updateOrder(order).subscribe( order => {
            this.orders.splice(this.orders.findIndex(o => o.id == order.id), 1, order);
        });
    }

    deleteOrder(id: number) {
        this.dataSoruce.deleteOrder(id).subscribe(order => {
            this.orders.splice(this.orders.findIndex( o => o.id == id), 1);
        });
    }
}