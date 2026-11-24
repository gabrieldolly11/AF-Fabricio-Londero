import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CATEGORIAS, DadosMovimentacao, Movimentacao, hoje } from '../../movimentacao';
@Component({selector:'app-movimentacao-form', standalone:true, imports:[FormsModule], templateUrl:'./movimentacao-form.component.html'})
export class MovimentacaoFormComponent implements OnChanges {
  @Input() item: Movimentacao | null = null;
  @Input() ocupado = false;
  @Output() salvar = new EventEmitter<DadosMovimentacao>();
  @Output() cancelar = new EventEmitter<void>();
  categorias = CATEGORIAS;
  dados: DadosMovimentacao = this.vazio();
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['item']) return;
    if (this.item) { const {descricao,tipo,categoria,valor,data} = this.item; this.dados = {descricao,tipo,categoria,valor,data:data.slice(0,10)}; }
    else this.dados = this.vazio();
  }
  vazio(): DadosMovimentacao { return { descricao:'', tipo:'despesa', categoria:'Outros', valor:0, data:hoje() }; }
  enviar(form: NgForm) {
    if (form.invalid || !this.dados.descricao.trim() || this.ocupado) return;
    this.salvar.emit({ ...this.dados, descricao:this.dados.descricao.trim() });
  }
}
