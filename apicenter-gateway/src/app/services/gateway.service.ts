import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GatewayUpdateDTO, GatewayCreateDTO, GatewayResponseDTO } from "../models/gateway.model";


@Injectable ({
    providedIn: 'root'
})
export class GatewayService {
    private apiUrl = 'http://localhost:4000/v1/gateways';
    constructor (private http: HttpClient) {}

    listar(): Observable<GatewayResponseDTO[]> {
        return this.http.get<GatewayResponseDTO[]>(this.apiUrl)
    };

    buscarPorId(id: number): Observable<GatewayResponseDTO> {
        return this.http.get<GatewayResponseDTO>(`${this.apiUrl}/${id}`)
    };
    criar(gateway: GatewayCreateDTO): Observable<GatewayResponseDTO> {
        return this.http.post<GatewayResponseDTO>(this.apiUrl, gateway);

    };
    atualizar(id: number, gateway: GatewayUpdateDTO): Observable<GatewayResponseDTO>{
        return this.http.put<GatewayResponseDTO>(`${this.apiUrl}/${id}`, gateway);
    };

    deletar(id:number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    };
    ativar(id:number): Observable<GatewayResponseDTO> {
        return this.http.patch<GatewayResponseDTO>(`${this.apiUrl}/${id}/ativar`, {})
    };

    desativar(id:number): Observable<GatewayResponseDTO> {
        return this.http.patch<GatewayResponseDTO>(`${this.apiUrl}/${id}/desativar`, {})
    };
}
