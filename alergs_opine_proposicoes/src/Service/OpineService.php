<?php

namespace Drupal\alergs_opine_proposicoes\Service;

class OpineService extends GuzzleClient
{
  public function listarVotacaoProposicao($cpfCnpjParticipante, $tipoProposicao, $numeroProposicao, $anoProposicao)
  {
    $response = $this->client->request('POST', '/alergsws/rest/opine/listarVotacaoProposicao/json', [
      'json' => [
        'cpfCnpjParticipante' => $cpfCnpjParticipante,
        'tipoProposicao' => $tipoProposicao,
        'numeroProposicao' => $numeroProposicao,
        'anoProposicao' => $anoProposicao,
      ]
    ]);

    $body = $response->getBody();
    $body = json_decode($body);

    return $body;
  }


  public function listarComentarioProposicao($tipoProposicao, $numeroProposicao, $anoProposicao)
  {
    $response = $this->client->request('POST', '/alergsws/rest/opine/listarComentarioProposicao/json', [
      'json' => [
        'tipoProposicao' => $tipoProposicao,
        'numeroProposicao' => $numeroProposicao,
        'anoProposicao' => $anoProposicao,
      ]
    ]);

    $body = $response->getBody()->getContents();
    $body = json_decode($body)->lista;

    return $body;
  }
}
