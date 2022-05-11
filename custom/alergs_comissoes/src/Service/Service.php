<?php

namespace Drupal\alergs_comissoes\Service;

abstract class Service
{
  private $domain;
  private $curl;

  public function __construct()
  {
    $this->curl = curl_init();
  }

  public function __destruct()
  {
    curl_close($this->curl);
  }

  /**
   * Simple curl function.
   *
   * @param mixed $url
   * @param mixed $type
   * @param null $params
   *
   * @return array|null
   */
  public function curl($url, $type, $params = null)
  {
    $headers = array(
      "Content-Type: application/json"
    );

    curl_setopt($this->curl, CURLOPT_ENCODING,  'gzip');

    curl_setopt($this->curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($this->curl, CURLOPT_URL, $url);
    curl_setopt($this->curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($this->curl, CURLOPT_CUSTOMREQUEST, $type);


    if ($params) {
      curl_setopt($this->curl, CURLOPT_POSTFIELDS, json_encode($params));
    }

    $response = curl_exec($this->curl);


    // dump(curl_getinfo($this->curl, CURLINFO_CONTENT_LENGTH_DOWNLOAD));die;

    // curl_close($this->curl);

    // FIXME: Check the return
    return json_decode($response)->lista;
  }
}
