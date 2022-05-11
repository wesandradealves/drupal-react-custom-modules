<?php

namespace Drupal\alergs_comissoes\Service;

use Drupal\alergs_comissoes\Service\Service;

class NominataService extends Service
{
  public function listarComissoes()
  {
    $curl = curl_init();

    $headers = array(
      "Content-Type: application/json"
    );

    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_URL, "http://172.30.0.25:5001/listarComissoes");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $response = curl_exec($curl);

    curl_close($curl);

    // dump($response);die

    return json_decode($response)->lista;
  }

  public function listarNominataComissao($idComissao)
  {
    $curl = curl_init();

    $headers = array(
      "Content-Type: application/json"
    );

    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_URL, "http://172.30.0.25:5001/listarNominataComissao");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($curl, CURLOPT_POSTFIELDS, '{"idComissao": '.$idComissao.'}');

    $response = curl_exec($curl);

    curl_close($curl);

    $response = json_decode($response)->lista;

    $data = [];

    foreach ($response as $key => $value) {
      $data[$value->descricaoCargoComissao][] = $value;
    }

    return $data;
  }
}
