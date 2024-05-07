import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoriaDTO } from './models/veiculos';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private baseUrl = 'http://localhost:8080/categoria';

  constructor(private http: HttpClient) {}

  categorias: BehaviorSubject<CategoriaDTO[]> = new BehaviorSubject<
    CategoriaDTO[]
  >([]);
  $categorias = this.categorias.asObservable();

  getCategorias() {
    this.http.get<any>(this.baseUrl).subscribe({
      next: (res) => {
        this.categorias.next(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  saveCategoria(categoria: CategoriaDTO): Observable<CategoriaDTO> {
    return this.http.post<CategoriaDTO>(this.baseUrl, categoria);
  }
  deleteCategoria(id: number): Observable<CategoriaDTO> {
    return this.http.delete<CategoriaDTO>(`${this.baseUrl}/${id}`);
  }
  updateCategoria(categoria: CategoriaDTO): Observable<CategoriaDTO> {
    return this.http.put<CategoriaDTO>(this.baseUrl, categoria);
  }
}
