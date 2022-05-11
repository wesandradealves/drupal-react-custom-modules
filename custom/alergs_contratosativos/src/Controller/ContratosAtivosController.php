<?php

namespace Drupal\alergs_contratosativos\Controller;

use Drupal\Core\Controller\ControllerBase;
use \Drupal\user\Entity\User;


class ContratosAtivosController extends ControllerBase {


  public function content() {
  

    $token_alergs = call_alergs_api_post();

    $authorization = "Authorization: Bearer ".$token_alergs;


    $url_listaMaterias = \Drupal::config('alergs_import.settings')->get('alergs_import_url').'/alergsws/rest/contratos/listarContratosAtivos/json/';    
    $curl = curl_init($url_listaMaterias);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json' , $authorization )); 
    $result = curl_exec($curl);
    curl_close($curl);  

    $resultArray = json_decode($result, TRUE);

    foreach ($resultArray as $key => $values) {

        $count = 0;
        $contratos = array();

        foreach ($values as $news) {

            ++$count;

            $newsObject = json_decode(json_encode($news));
            $contratos[] = $newsObject;
        }
    }

    // print_r($contratos); die;

    return [
      '#theme' => 'alergs_contratosativos_contratos_ativos',      
      '#contratos' => $contratos,
      '#attached' => [
        'library' => [
          'alergs_contratosativos/contratos-ativos',
        ],
      ],
    ];

  }

}
