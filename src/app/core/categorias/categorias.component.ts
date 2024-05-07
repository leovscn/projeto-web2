import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { CategoriasService } from '../categorias.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CategoriaDTO } from '../models/veiculos';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatFormField,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss',
})
export class CategoriasComponent {
  name: string = '';
  categorias: CategoriaDTO[] = [];
  form!: FormGroup;
  displayedColumns: string[] = ['id', 'nome', 'opções'];

  constructor(private _cs: CategoriasService, private fb: FormBuilder) {
    this.createForm();
    this._cs.$categorias.subscribe((res) => {
      this.categorias = res;
    });
  }
  ngOnInit() {
    this._cs.getCategorias();
  }

  createForm() {
    this.form = this.fb.group({
      nome: [''],
    });
  }

  salvarCategoria() {
    this._cs.saveCategoria(this.form.value).subscribe({
      next: (res) => {
        this._cs.getCategorias();
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.form.reset();
  }
  editarCategoria(categoria: CategoriaDTO) {
    this._cs.updateCategoria(categoria).subscribe({
      next: (res) => {
        this._cs.getCategorias();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  excluirCategoria(id: number) {
    this._cs.deleteCategoria(id).subscribe({
      next: (res) => {
        this._cs.getCategorias();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
