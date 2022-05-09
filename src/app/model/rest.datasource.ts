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

    getProducts(): Observable<Product[] | Order> {
        return this.sendRequest("GET", "products");
    }

    saveOrder(order: Order): Observable<Product[] | Order> {
        return this.sendRequest("POST", "orders");
    }

    private sendRequest(method: string, url: string, body?: Product | Order): Observable<Product[] | Order> {
        var request;
        switch (method.toUpperCase()) {
            case "GET":
                request = this.http.get<Product[] | Order>(this.baseUrl + url);
                break;
            case "POST":
                request = this.http.post<Product[] | Order>(this.baseUrl + url, body);
                break;
            default:
                request = this.http.get<Product[] | Order>(this.baseUrl + url);

        }

        return request;
    }
}


