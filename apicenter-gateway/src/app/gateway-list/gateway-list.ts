import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GatewayService } from '../services/gateway.service';
import { GatewayResponseDTO } from '../models/gateway.model';

@Component({
  selector: 'gateway-list',
  imports: [CommonModule],
  templateUrl: './gateway-list.html',
  styleUrl: './gateway-list.scss',
})
export class GatewayList implements OnInit {
  gateways: GatewayResponseDTO[] = [];
  carregando = true;
  error: string | null = null;

  constructor(private gatewayService: GatewayService){}

  ngOnInit(){

    this.gatewayService.listar().subscribe({
      next: (dados) => {
        this.gateways = dados;
        this.carregando = false;
      },
      error: () => {
        this.error = 'Erro ao carregar gatewats. Verifique se a API está rodando.'
        this.carregando = false;
      }
    });

  }
  getStatus(ativo: boolean) : string {
    return ativo ? 'Ativo' : 'Inativo';
  }
}
