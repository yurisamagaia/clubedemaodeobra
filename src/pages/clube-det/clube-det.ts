import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, ModalController } from 'ionic-angular';

import { Http } from '@angular/http';
import { AppModule } from '../../app/app.module';

import { ClubeDetServicoModal } from '../../pages/clube-det/clube-det-servico-modal';
import { ClubeDetCidadeModal } from '../../pages/clube-det/clube-det-cidade-modal';
import { ClubeDetOrcamentoModal } from '../../pages/clube-det/clube-det-orcamento-modal';
import { ClubeDetAvaliacaoModal } from '../../pages/clube-det/clube-det-avaliacao-modal';

@Component({
  selector: 'page-clube-det',
  templateUrl: 'clube-det.html'
})
export class ClubeDetPage {

  id: any;
  servico: any = [];
  private url: string = AppModule.getUrl();

  constructor(
    public navCtrl: NavController,
    private http: Http,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    let loading = this.loadingCtrl.create();
    loading.present();

    this.id = navParams.get('id');
    var arrServico = JSON.stringify({
      'id': this.id,
    });

    this.http.post(this.url+'buscar_detalhe.php', arrServico).subscribe(res => {
      this.servico = res.json();
      loading.dismiss();
    });
  }

  modalServico(descricao) {
    let modal = this.modalCtrl.create(ClubeDetServicoModal, {descricao: descricao});
    modal.present();
  }

  modalCidade(descricao) {
    let modal = this.modalCtrl.create(ClubeDetCidadeModal, {descricao: descricao});
    modal.present();
  }

  modalOrcamento(email) {
    let modal = this.modalCtrl.create(ClubeDetOrcamentoModal, {id: email});
    modal.present();
  }

  modalAvaliacao(id) {
    let modal = this.modalCtrl.create(ClubeDetAvaliacaoModal, {id: id});
    modal.present();
  }
}
