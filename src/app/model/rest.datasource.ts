import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpResponse } from "@angular/common/http"
import { map, Observable } from "rxjs";
import { Product } from "./product.model";
import { Cart } from "./cart.model";
import { Order } from "./order.model";

const PROTOCOL = "http";
const PORT = 3500;

@Injectable()
export class RestDataSource {
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    getProducts(): Observable<object> | undefined {
        var request = this.sendRequest("GET", "products");
        if (request)
            return request;
        else
            return undefined;
    }

    saveOrder(order: Order): Observable<object> | undefined {
        var request = this.sendRequest("POST", "orders");
        if (request)
            return request;
        else
            return undefined;
    }

    private sendRequest(method: string, url: string, body?: Product | Order): Observable<Object> | undefined {
        var request;
        switch (method.toUpperCase()) {
            case "GET":
                request = this.http.get(this.baseUrl + url).pipe();
                break;
            case "POST":
                request = this.http.post(this.baseUrl + url, body).pipe();
                break;
        }

        return request;
    }
}


