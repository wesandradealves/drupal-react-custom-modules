<?php

namespace Drupal\alergs_opine_proposicoes\Service;

use \GuzzleHttp\Client as Client;

abstract class GuzzleClient
{
  public $client;
  public $domain;

  public function __construct()
  {
    $domain = \Drupal::config('alergs_import.settings')->get('alergs_import_url');

    // Remove http from domain
    $domain = substr($domain, 5);

    $token = $this->getToken();

    // dump($domain, $token);die;

    $this->client = new Client([
      'base_uri' => $domain,
      'headers' => [
        // 'Accept' => 'application/json',
        // 'Content-Type' => 'application/json',
        'Authorization' => 'Bearer ' . $token,
      ]
    ]);
  }

  public function getToken()
  {
    $login = \Drupal::config('alergs_import.settings')->get('alergs_import_user');
    $senha = \Drupal::config('alergs_import.settings')->get('alergs_import_password');
    $domain = \Drupal::config('alergs_import.settings')->get('alergs_import_url');

    $client = new Client([
      'base_uri' => $domain,
      'headers' => [
        // 'Content-Type' => 'application/json',
        // 'Accept' => 'application/json',
      ]
    ]);

    $token = $client->post(
      '/alergsws/rest/login',
      [
        'json' => [
          'login' => $login,
          'senha' => $senha
        ]
      ]
    );

    return $token->getBody()->getContents();
  }
}
