<?php

namespace Drupal\alergs_comissoes\Service;

use Drupal\Core\Cache\Cache;

class ComissoesService extends HttpClient
{
  public function listarComissoes()
  {
    // Look for the item in cache
    if ($item = \Drupal::cache()->get('listarComissoes')) return $item->data;

    $response = $this->client->request('GET', 'listarComissoes');

    $body = $response->getBody();
    $body = json_decode($body)->lista;

    // Set cache
    \Drupal::cache()->set('listarComissoes', $body, Cache::PERMANENT);

    return $body;
  }

  public function listarNominataComissao($idTipoComissao)
  {
    $response = $this->client->request(
      'POST',
      'listarNominataComissao',
      [
        'form_params' => [
          'idComissao' => $idTipoComissao,
        ]
      ]
    );

    $body = $response->getBody();
    $body = json_decode($body)->lista;

    return $body;
  }


  public function listarDadosComissao($idComissao)
  {
    // Look for the item in cache
    if ($item = \Drupal::cache()->get($idComissao)) return $item->data;

    $response = $this->client->request(
      'POST',
      'listarDadosComissao',
      [
        'form_params' => [
          'idComissao' => $idComissao,
        ]
      ]
    );

    $body = $response->getBody();
    $body = json_decode($body)->comissao[0];

    // Set cache
    \Drupal::cache()->set($idComissao, $body, Cache::PERMANENT);

    return $body;
  }

  public function listarRelatoriosComissao($idComissao)
  {
    $response = $this->client->request(
      'POST',
      'listarRelatoriosComissao',
      [
        'form_params' => [
          'idComissao' => $idComissao,
        ]
      ]
    );

    $body = $response->getBody();

    return json_decode($body)->lista;
  }
}
