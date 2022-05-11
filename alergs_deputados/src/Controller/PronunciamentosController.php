<?php

namespace Drupal\alergs_deputados\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use \Drupal\user\Entity\User;

class PronunciamentosController extends ControllerBase {
  public function content($id = NULL, $uid = NULL) {
    
    $token = call_alergs_api_post();

    if($token) {

      $curl = curl_init();

      curl_setopt_array($curl, array(
        CURLOPT_URL => \Drupal::config('alergs_import.settings')->get('alergs_import_url').'/alergsws/rest/sistemataquigrafia/listarPronunciamentosDeputado/json/',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS =>'{
          "codProponente": '.($uid ? $uid : $id).',
          "Ano": ""
      }',
        CURLOPT_HTTPHEADER => array(
          'Authorization: Bearer '.$token,
          'Content-Type: application/json'
        ),
      ));
      
      $response = curl_exec($curl);

      $response = json_decode($response)->lista;

      curl_setopt_array($curl, array(
        CURLOPT_URL => \Drupal::config('alergs_import.settings')->get('alergs_import_url').'/alergsws/rest/parlamentar/listarDestaqueDeputados/json/',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_HTTPHEADER => array(
          'Authorization: Bearer '.$token,
          'Content-Type: application/json'
        ),
      ));
      
      $personalData = curl_exec($curl);
      $personalData = json_decode($personalData)->lista;   
    }    

    curl_close($curl);

    return [
      '#theme' => 'alergs_deputados_pronunciamentos',
      '#response' => json_encode($response),
      '#personalData' => json_encode($personalData),
      '#id' => $id,
      '#uid' => $uid,
      '#attached' => [
        'library' => [
          'alergs_deputados/deputados',
        ]
      ] 
    ];
  }
}