<?php

namespace Drupal\alergs_comissoes\Service;

use \GuzzleHttp\Client;

abstract class HttpClient
{
  protected $client;

  protected $domain;

  public function __construct()
  {
    $this->domain = 'http://172.30.3.227:5000/';
    $this->client = new Client(['base_uri' => $this->domain]);
  }
}
