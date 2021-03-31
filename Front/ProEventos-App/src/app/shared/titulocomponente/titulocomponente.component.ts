import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titulocomponente',
  templateUrl: './titulocomponente.component.html',
  styleUrls: ['./titulocomponente.component.scss']
})
export class TitulocomponenteComponent implements OnInit {

  @Input() titulo = '';
  @Input() subtitulo = 'Desde 2021';
  @Input() iconClass = 'fa fa-user';
  @Input() botaoListar = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  listar(): void {
    this.router.navigate([`/${this.titulo.toLocaleLowerCase()}/lista`]);
  }
}
