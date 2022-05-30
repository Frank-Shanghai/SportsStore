import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http"
import { map, Observable } from "rxjs";
import { Product } from "./product.model";
import { Cart } from "./cart.model";
import { Order } from "./order.model";

const PROTOCOL = "http";
const PORT = 3500;

@Injectable()
export class RestDataSource {
    baseUrl: string;
    auth_token: string = "";

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    authenticate(user: string, pass: string): Observable<boolean> {
        // return this.http.request(new HttpRequest<any>(
        //     "POST",
        //     this.baseUrl + "login",
        //     { name: user, password: pass }
        // )).pipe(map(response => {
        //     var r = response;
        //     this.auth_token = "";
        //     return true;
        //     // this.auth_token = response.status ? response.token : null;
        //     // return response.success;
        // }));

        return this.http.post(this.baseUrl + "login", { name: user, password: pass }).pipe(map((response: any) => {
            this.auth_token = response.success ? response.token : null;
            return response.success;
        }));
    }

    getProducts(): Observable<Product[]> {
        return this.sendRequest("GET", "products") as Observable<Product[]>;
    }

    saveProduct(product: Product): Observable<Product> {
        return this.sendRequest("POST", "products", product, true) as Observable<Product>;
    }

    updateProduct(product: Product): Observable<Product> {
        return this.sendRequest("PUT", `products/${product.id}`, product, true) as Observable<Product>;
    }

    deleteProduct(id: number): Observable<Product> {
        return this.sendRequest("DELETE", `products/${id}`, undefined, true) as Observable<Product>;
    }

    getOrders(): Observable<Order[]> {
        return this.sendRequest("GET", "orders", undefined, true) as Observable<Order[]>;
    }

    deleteOrder(id: number) {
        return this.sendRequest("DELETE", `orders/${id}`, undefined, true) as Observable<Order>;
    }

    updateOrder(order: Order) {
        return this.sendRequest("PUT", "orders", order, true) as Observable<Order>;
    }

    saveOrder(order: Order): Observable<Order> {
        return this.sendRequest("POST", "orders", order) as Observable<Order>;
    }

    private sendRequest(method: string, url: string, body?: Product | Order, auth: boolean = false): Observable<any> {
        var request;
        var options;
        if (auth && this.auth_token != null && this.auth_token != "") {
            var headers  = {"Authorization": `Bearer<${this.auth_token}>`};
            options = { headers: headers };
        }
        switch (method.toUpperCase()) {
            case "GET":
                request = this.http.get(this.baseUrl + url, options);
                break;
            case "PUT":
                request = this.http.put(this.baseUrl + url, body, options);
                break;
            case "POST":
                request = this.http.post(this.baseUrl + url, body, options);
                break;
            case "DELETE":
                request = this.http.delete(this.baseUrl + url, options);
                break;
            default:
                request = this.http.get(this.baseUrl + url, options);

        }

        return request;
    }
}


