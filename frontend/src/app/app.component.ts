import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CATEGORIAS, CORES, DadosMovimentacao, Movimentacao } from './movimentacao';
import { MovimentacaoService } from './services/movimentacao.service';
import { MovimentacaoFormComponent } from './components/movimentacao-form/movimentacao-form.component';
import { GraficoCategoriasComponent } from './components/grafico-categorias/grafico-categorias.component';
@Component({selector:'app-root',standalone:true,imports:[CurrencyPipe,DatePipe,FormsModule,MovimentacaoFormComponent,GraficoCategoriasComponent],templateUrl:'./app.component.html'})
export class AppComponent implements OnInit {
  private service = inject(MovimentacaoService);
  itens: Movimentacao[] = [];
  categorias = CATEGORIAS;
  cores = CORES;
  filtro = 'todas';
  filtroTipo = 'todos';
  editando: Movimentacao | null = null;
  formularioAberto = false;
  carregando = false;
  ocupado = false;
  erro = '';
  aviso = '';
  ngOnInit() { this.carregar(); }
  get filtradas() { return this.itens.filter(i => (this.filtro === 'todas' || i.categoria === this.filtro) && (this.filtroTipo === 'todos' || i.tipo === this.filtroTipo)); }
  totalCentavos(tipo: string) { return this.itens.filter(i => i.tipo === tipo).reduce((s,i) => s + Math.round(i.valor*100),0); }
  get receitas() { return this.totalCentavos('receita')/100; }
  get despesas() { return this.totalCentavos('despesa')/100; }
  get saldo() { return (this.totalCentavos('receita')-this.totalCentavos('despesa'))/100; }
  carregar() {
    this.carregando = true; this.erro = '';
    this.service.listar().subscribe({next: itens => {this.itens=itens; this.carregando=false;},error: e => {this.carregando=false; this.mostrarErro(e);}});
  }
  abrir(item: Movimentacao | null = null) { this.editando=item; this.formularioAberto=true; this.erro=''; this.aviso=''; }
  fechar() { this.formularioAberto=false; this.editando=null; }
  salvar(dados: DadosMovimentacao) {
    if (this.ocupado) return;
    const id = this.editando?._id;
    this.ocupado=true; this.erro=''; this.aviso='';
    const requisicao = id ? this.service.atualizar(id,dados) : this.service.cadastrar(dados);
    requisicao.subscribe({next: () => {this.ocupado=false; this.fechar(); this.aviso=id?'Movimentação atualizada.':'Movimentação cadastrada.'; this.carregar();},error:e=>{this.ocupado=false; this.mostrarErro(e);}});
  }
  excluir(item: Movimentacao) {
    if (this.ocupado || !confirm(`Excluir a movimentação "${item.descricao}"?`)) return;
    this.ocupado=true; this.erro=''; this.aviso='';
    this.service.excluir(item._id).subscribe({next:()=>{this.ocupado=false; if(this.editando?._id===item._id) this.fechar(); this.aviso='Movimentação excluída.'; this.carregar();},error:e=>{this.ocupado=false;this.mostrarErro(e);}});
  }
  mostrarErro(e: HttpErrorResponse) { this.erro = e.error?.mensagem || 'Não foi possível acessar a API. Verifique se o backend e o MongoDB estão funcionando.'; }
}
