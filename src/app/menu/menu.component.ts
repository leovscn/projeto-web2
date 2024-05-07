import { VeiculosService } from './../core/veiculos.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuItem, MatMenuModule } from '@angular/material/menu'; // Add this line
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'; // Add this line
import { MatBadgeModule } from '@angular/material/badge'; // Add this line
import { CategoriasService } from '../core/categorias.service';
import { CategoriaDTO } from '../core/models/veiculos';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatMenuItem,
    MatListModule,
    MatBadgeModule,
    MatButtonModule, // Add this line
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  search = '';
  value = 'Limpar';

  constructor(
    private _categorias: CategoriasService,
    private _vs: VeiculosService
  ) {}
  ngOnInit(): void {
    this.getCategorias();
    this._categorias.$categorias.subscribe((res) => {
      this.listCategorias = res;
    });
  }
  listCategorias: CategoriaDTO[] = [];

  pesquisar(search = this.search) {
    this._vs.searchVeiculos(search);
  }
  getCategorias() {
    this._categorias.getCategorias();
  }

  getByCat(id: number) {
    this._vs.getVeiculosByCategoria(id);
  }
}
