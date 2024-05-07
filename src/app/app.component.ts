import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { VerDetalhesComponent } from './core/ver-detalhes/ver-detalhes.component';
import { CategoriasComponent } from './core/categorias/categorias.component';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    MenuComponent,
    VerDetalhesComponent,
    MatSidenavModule,
    MatMenuModule,
    CategoriasComponent,
    MatInputModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MenuComponent],
})
export class AppComponent {
  dadosRecebidos: Boolean = false;

  constructor(private _menu: MenuComponent) {}
}
