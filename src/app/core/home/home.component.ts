import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoriaDTO, VeiculoDTO } from '../models/veiculos';
import { Router, RouterOutlet } from '@angular/router';
import { VeiculosService } from '../veiculos.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CategoriasService } from '../categorias.service';
import { map } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIcon,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  editMode: boolean = false;
  listaVeiculos: VeiculoDTO[] = [];
  listaCategorias: CategoriaDTO[] = [];
  cadastroForm!: FormGroup;
  imagem: any;
  file: any;
  idEdit: any;
  constructor(
    private veiculosService: VeiculosService,
    private _categorias: CategoriasService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.getVeiculos();
    this.veiculosService.vehicles.subscribe({
      next: (success) => {
        this.listaVeiculos = success;
      },
    });
    this._categorias.$categorias.subscribe((res) => {
      this.listaCategorias = res;
    });
  }

  getVeiculos() {
    this.veiculosService.getVeiculos().subscribe({
      next: (response) => {
        this.listaVeiculos = response;
      },
      error: (error) => {
        console.log('Error fetching veiculos:', error);
      },
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      const formData = this.cadastroForm.value;

      if (this.file) {
        this.veiculosService.createVeiculo(this.file, formData).subscribe({
          next: (success) => {
            console.log('Sucesso');
            this.cadastroForm.reset();
            this.getVeiculos();
          },
          error: (err) => {
            console.log('Erro:', err);
          },
        });
      } else {
        console.error('Nenhum arquivo selecionado');
      }
    } else {
      console.error('Formulário inválido');
    }
  }
  sendEdit() {
    if (this.cadastroForm.valid) {
      const formData = this.cadastroForm.value;

      if (this.file) {
        this.veiculosService
          .updateVeiculo(this.idEdit, this.file, formData)
          .subscribe({
            next: (success) => {
              console.log('Sucesso');
              this.cadastroForm.reset();
              this.cadastroForm.updateValueAndValidity();
              this.getVeiculos();
            },
            error: (err) => {
              console.log('Erro:', err);
            },
          });
      } else {
        console.error('Nenhum arquivo selecionado');
      }
    } else {
      console.error('Formulário inválido');
    }
  }
  editar(id: string) {
    this.editMode = true;
    this.idEdit = id;
  }

  excluir(id: string) {
    return this.veiculosService.deleteVeiculo(id).subscribe({
      next: (success) => {
        console.log(success);
        this.getVeiculos();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ver(id: string) {
    this.veiculosService.getVeiculo(id).subscribe();
    this.router.navigate(['ver-detalhes']);
  }

  imageUpload(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }
  private createForm(): void {
    this.cadastroForm = this.fb.group({
      modelo: ['', Validators.required],
      placa: ['', Validators.required],
      categoria: ['', Validators.required],
      marca: [''],
      cor: [''],
      imagem: [''],
      preco: [0, Validators.required],
      ano: ['', Validators.required],
    });
  }
}
