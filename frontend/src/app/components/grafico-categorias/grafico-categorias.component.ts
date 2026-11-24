import { Component, Input } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { CATEGORIAS, CORES, Movimentacao } from '../../movimentacao';
@Component({selector:'app-grafico-categorias',standalone:true,imports:[CurrencyPipe,DecimalPipe],templateUrl:'./grafico-categorias.component.html'})
export class GraficoCategoriasComponent {
  @Input() itens: Movimentacao[] = [];
  get fatias() {
    const despesas = this.itens.filter(item => item.tipo === 'despesa');
    const total = despesas.reduce((s,item) => s + Math.round(item.valor * 100),0);
    return CATEGORIAS.map(categoria => {
      const centavos = despesas.filter(i => i.categoria === categoria).reduce((s,i) => s + Math.round(i.valor * 100),0);
      return {categoria, cor:CORES[categoria], valor:centavos/100, percentual:total ? centavos/total*100 : 0};
    }).filter(f => f.valor > 0);
  }
  get fundo() {
    let inicio = 0;
    const partes = this.fatias.map(f => { const fim = inicio + f.percentual; const parte = `${f.cor} ${inicio}% ${fim}%`; inicio = fim; return parte; });
    return partes.length ? `conic-gradient(${partes.join(',')})` : '#e2e8f0';
  }
}
