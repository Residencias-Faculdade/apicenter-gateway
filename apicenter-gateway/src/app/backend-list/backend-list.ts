import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendResponseDTO, PageBackendResponseDTO} from '../models/backend.model';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-backend-list',
  imports: [CommonModule],
  templateUrl: './backend-list.html',
  styleUrl: './backend-list.scss',
})
export class BackendList implements OnInit {

  backends: BackendResponseDTO[] = [];
  carregando = true;
  error: string | null = null;
  totalPaginas: number = 0;

  constructor(private backendService: BackendService){}

  ngOnInit(): void  {
    
    this.backendService.listar().subscribe ({
      next: (resposta: PageBackendResponseDTO) => {
        this.backends = resposta.content;
        this.totalPaginas = resposta.totalPages;
        this.carregando = false;
      },
      error: () => {
        this.error = 'Erro ao carregar backends. Verifique se a API está rodando.';
        this.carregando = false;
      }
    });
  }

}
