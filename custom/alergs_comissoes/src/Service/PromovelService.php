<?php

namespace Drupal\alergs_comissoes\Service;

use GuzzleHttp\Client;

class PromovelService extends Service
{
  protected $httpClient;

  public function reuniaoComissao($idComissao, $anoReuniao)
  {

    $client = \Drupal::httpClient();

    $response = $client->request('POST', 'http://172.30.3.227:5000/reuniaoComissao', ['form_params' => [
      'codComissao' => intval($idComissao),
      'anoReuniao' => intval($anoReuniao)
    ]]);

    $status = $response->getStatusCode();
    $body = $response->getBody();

    return json_decode($body)->lista;




    // sleep(1);
    return  $this->curl('http://172.30.3.227:5000/reuniaoComissao', 'POST', ['codComissao' => intval($idComissao), 'anoReuniao' => intval($anoReuniao)]);
  }

  public function agendaReuniao($idComissao)
  {
    // return $this->curl('http://172.30.3.227:5000/listarHistoricoReunioes', 'POST', ['codComissao' => $idComissao]);
    return $this->curl('http://172.30.3.227:5000/listarHistoricoReunioes?codComissao=' . $idComissao, 'GET');
  }
}
