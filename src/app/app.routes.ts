import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { VerDetalhesComponent } from './core/ver-detalhes/ver-detalhes.component';
import { CategoriasComponent } from './core/categorias/categorias.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ver-detalhes', component: VerDetalhesComponent },
  { path: 'categorias', component: CategoriasComponent },
];
