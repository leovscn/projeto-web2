import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { VeiculosService } from '../veiculos.service';
import { VeiculoDTO } from './../models/veiculos';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-detalhes',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './ver-detalhes.component.html',
  styleUrl: './ver-detalhes.component.scss',
})
export class VerDetalhesComponent implements OnInit {
  id!: string;
  veiculo!: VeiculoDTO;
  selectedCarSubscription!: Subscription;
  constructor(private _vs: VeiculosService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.carregarDetalhesVeiculo();
    console.log(this.veiculo);
  }

  carregarDetalhesVeiculo(): void {
    this.selectedCarSubscription = this._vs.selectedCar.subscribe(
      (veiculo: VeiculoDTO) => {
        this.veiculo = veiculo;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.selectedCarSubscription) {
      this.selectedCarSubscription.unsubscribe(); // Não se esqueça de cancelar a inscrição
    }
  }
}
