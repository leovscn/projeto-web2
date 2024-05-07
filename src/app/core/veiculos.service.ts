import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { VeiculoDTO } from './models/veiculos'; // Add this import statement

@Injectable({
  providedIn: 'root',
})
export class VeiculosService {
  private baseUrl = 'http://localhost:8080/veiculo';
  private baseUrlImg = 'http://localhost:8080/imagem';

  constructor(private http: HttpClient) {}
  vehicles: BehaviorSubject<VeiculoDTO[]> = new BehaviorSubject<VeiculoDTO[]>(
    []
  );
  selectedCar: BehaviorSubject<VeiculoDTO> = new BehaviorSubject<VeiculoDTO>(
    {} as VeiculoDTO
  ); // Change the type of selectedCar to Observable<string>

  getVeiculos(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  searchVeiculos(search: String) {
    console.log('aq');
    return this.http
      .get<VeiculoDTO[]>(this.baseUrl + '/pesquisar', {
        params: { modelo: search.toString() },
      })
      .subscribe({
        next: (success) => {
          this.vehicles.next(success);
        },
      });
  }
  searchVeiculosByAno(search: String) {
    console.log('aq');
    return this.http
      .get<VeiculoDTO[]>(this.baseUrl + '/pesquisarByAno', {
        params: { ano: search.toString() },
      })
      .subscribe({
        next: (success) => {
          this.vehicles.next(success);
        },
      });
  }
  getVeiculosByCategoria(id: number) {
    this.http
      .get<any>(this.baseUrl + `/categoria{id}`)
      .subscribe({ next: (success) => this.vehicles.next(success) });
  }

  getVeiculo(id: string): Observable<VeiculoDTO> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<VeiculoDTO>(url).pipe(
      tap((veiculo: VeiculoDTO) => {
        this.selectedCar.next(veiculo);
        console.log(this.selectedCar);
      }),
      catchError((error: any) => {
        console.error('Erro ao obter imagem:', error);
        return throwError(error); // Retorna o Observable de erro
      })
    );
  }

  getImage(imagem: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${imagem}`, { responseType: 'blob' });
  }

  createVeiculo(imagem: File, veiculo: VeiculoDTO): Observable<VeiculoDTO> {
    const formData = new FormData();
    formData.append('file', imagem, imagem.name);
    formData.append('marca', veiculo.marca);
    formData.append('modelo', veiculo.modelo);
    formData.append('placa', veiculo.placa);
    formData.append('categoria', JSON.stringify(veiculo.categoria)); // Se a categoria for um objeto, você pode convertê-lo em string JSON
    formData.append('ano', veiculo.ano.toString()); // Converte para string
    formData.append('cor', veiculo.cor);
    formData.append('preco', veiculo.preco.toString()); // Converte para string
    formData.append('imagem', veiculo.imagem);
    console.log(formData.get('veiculo'));

    return this.http.post<VeiculoDTO>(this.baseUrl, formData);
  }

  updateVeiculo(
    id: number,
    file: File,
    veiculo: VeiculoDTO
  ): Observable<VeiculoDTO> {
    const url = `${this.baseUrl}/${id.toString()}`;

    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('marca', veiculo.marca);
    formData.append('modelo', veiculo.modelo);
    formData.append('placa', veiculo.placa);
    formData.append('categoria', JSON.stringify(veiculo.categoria)); // Se a categoria for um objeto, você pode convertê-lo em string JSON
    formData.append('ano', veiculo.ano.toString()); // Converte para string
    formData.append('cor', veiculo.cor);
    formData.append('preco', veiculo.preco.toString()); // Converte para string
    formData.append('imagem', veiculo.imagem);
    return this.http.put<VeiculoDTO>(url, formData);
  }

  deleteVeiculo(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
