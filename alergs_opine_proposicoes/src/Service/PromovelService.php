<?php

namespace Drupal\alergs_opine_proposicoes\Service;

use Drupal\Core\Cache\Cache;

class PromovelService extends GuzzleClient
{
  public function listaOrdemDia($data)
  {
    // Look for the item in cache
    // if ($item = \Drupal::cache()->get('listarComissoes')) return $item->data;

    $response = $this->client->post(
      '/alergsws/rest/promovel/listaOrdemDia/json',
      [
        'json' => [
          'data' => $data,
        ]
      ]
    );

    $body = $response->getBody();
    $body = json_decode($body)->lista;

    // Set cache
    // \Drupal::cache()->set('listarComissoes', $body, Cache::PERMANENT);

    return $body;
  }

  public function listaOrdemDiaEmenta($date)
  {
    $response = $this->client->post(
      '/alergsws/rest/promovel/listaOrdemDiaEmenta/json',
      [
        'json' => [
          'dataInicial' => $date,
          'dataFinal' => $date,

        ]
      ]
    );

    $body = $response->getBody();
    $body = json_decode($body)->lista;

    return $body;
  }

  public function obtemProposicaoCompleto($siglaTipoProposicao, $nroProposicao, $anoProposicao)
  {
    // TODO: Starts here!
    // dump($siglaTipoProposicao, $nroProposicao, $anoProposicao);die;
    $response = $this->client->post(
      '/alergsws/rest/promovel/obtemProposicaoCompleto/json',
      [
        'json' => [
          'siglaTipoProposicao' => $siglaTipoProposicao,
          'nroProposicao' => $nroProposicao,
          'anoProposicao' => $anoProposicao,
        ]
      ]
    );

    $body = $response->getBody()->getContents();
    $body = json_decode($body)->lista;

    return $body;
  }

  public function obtemLegislacao($siglaTipoProposicao, $nroProposicao, $anoProposicao)
  {
    $response = $this->client->post(
      '/alergsws/rest/promovel/obtemLegislacao/json',
      [
        'json' => [
          'siglaTipoProposicao' => $siglaTipoProposicao,
          'nroProposicao' => $nroProposicao,
          'anoProposicao' => $anoProposicao,

        ]
      ]
    );

    $body = $response->getBody();
    $body = json_decode($body)->lista;

    return $body;
  }

  public function listaMateriasApreciadasCompleto($siglaTipoProposicao, $nroProposicao, $anoProposicao)
  {
    $response = $this->client->post(
      '/alergsws/rest/promovel/listaMateriasApreciadasCompleto/json',
      [
        'json' => [
          'siglaTipoProposicao' => $siglaTipoProposicao,
          'nroProposicao' => $nroProposicao,
          'anoProposicao' => $anoProposicao,
          "dataInicial" => "",
          "dataFinal" => ""
        ]
      ]
    );

    $body = $response->getBody();
    $body = json_decode($body)->lista;

    return $body;
  }

  public function listaProposicaoOrdemDiaSessao($dataCompleta)
  {
    $response = $this->client->post(
      '/alergsws/rest/promovel/listaProposicaoOrdemDiaSessao/json',
      [
        'json' => [
          'dataCompleta' => $dataCompleta
        ]
      ]
    );

    $body = $response->getBody();
    $body = json_decode($body)->lista;

    return $body;
  }
}
