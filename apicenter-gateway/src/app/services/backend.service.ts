import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BackendCreateDTO, BackendResponseDTO, PageBackendResponseDTO } from "../models/backend.model";

@Injectable ({


    providedIn: 'root'
})
export class BackendService {

    private apiUrl = 'http://localhost:4000/v1/backends';
    constructor (private http: HttpClient) {}

    listar(): Observable<PageBackendResponseDTO>{
        return this.http.get<PageBackendResponseDTO>(this.apiUrl);
    }

    buscarPorId(id: number): Observable<BackendResponseDTO>{
        return this.http.get<BackendResponseDTO>(`${this.apiUrl}/${id}`);
    }

    criar(backend: BackendCreateDTO): Observable<BackendResponseDTO>{
        return this.http.post<BackendResponseDTO>(this.apiUrl, backend);
    }


    
}