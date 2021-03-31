import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Evento } from '../../models/Evento';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  modalRef: any;

  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public widthImg = 150;
  public marginImg = 2;
  public showImg = true;
  private filtroListado = '';

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    )
  {

  }

  public ngOnInit(): void {

    this.spinner.show();
    this.getEventos();

  }

  public get filtroLista(): string{
    return this.filtroListado;
  }

  public set filtroLista(value: string){
    this.filtroListado = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  public filtrarEventos(filtrarPor: string): Evento[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento : any) =>
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }


  public showHideImage(): void{
    this.showImg = !this.showImg;
  }

  public getEventos(): void{

    this.eventoService.getEventos().subscribe({
      next: (eventosResponse: Evento[]) => {
        this.eventos = eventosResponse;
        this.eventosFiltrados = eventosResponse;
      },
      error: (error: any) => {
        console.log(error);
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os eventos', 'Erro!');
      },
      complete: () => this.spinner.hide()
    });

    // this.eventos = [
    //   {
    //     Tema: 'Angular',
    //     Local: 'São Paulo'
    //   },
    //   {
    //     Tema: 'Angular 2',
    //     Local: 'Rio de Janeiro'
    //   },
    //   {
    //     Tema: 'Angular 3 ',
    //     Local: 'Belo Horizonte'
    //   },
    // ]

  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
    this.toastr.success('O evento foi deletado com sucesso', 'Deletado');
  }

  decline(): void {
    this.modalRef.hide();
  }

}
