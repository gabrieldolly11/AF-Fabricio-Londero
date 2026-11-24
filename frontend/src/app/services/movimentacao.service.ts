import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DadosMovimentacao, Movimentacao } from '../movimentacao';
@Injectable({ providedIn: 'root' })
export class MovimentacaoService {
  private http = inject(HttpClient);
  private url = '/api/movimentacoes';
  listar() { return this.http.get<Movimentacao[]>(this.url); }
  cadastrar(dados: DadosMovimentacao) { return this.http.post<Movimentacao>(this.url, dados); }
  atualizar(id: string, dados: DadosMovimentacao) { return this.http.put<Movimentacao>(`${this.url}/${id}`, dados); }
  excluir(id: string) { return this.http.delete<{ mensagem: string }>(`${this.url}/${id}`); }
}
