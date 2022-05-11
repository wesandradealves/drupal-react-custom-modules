<?php

namespace Drupal\alergs_import\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\AlertCommand;


class Manchetes extends ControllerBase {

    public function content() {

      $token_alergs = call_alergs_api_post();

      $authorization = "Authorization: Bearer ".$token_alergs;
  
  
      $url_listaMaterias = \Drupal::config('alergs_import.settings')->get('alergs_import_url').'/alergsws/rest/agenciadenoticia/listarManchetes/json/';    
      $curl = curl_init($url_listaMaterias);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json' , $authorization )); 
      $result = curl_exec($curl);
      curl_close($curl);  
  
      $resultArray = json_decode($result, TRUE);
  
      foreach ($resultArray as $key => $values) {

        
  
          $count = 0;
          $manchetes = array();
  
          foreach ($values as $news) {
  
              ++$count;
  
              $newsObject = json_decode(json_encode($news));
              $manchetes[] = $newsObject->idMateria;
          }
      }


      $response = new AjaxResponse();

      $resultmanchetes = json_decode($manchetes, TRUE);

      $response->addCommand(new AlertCommand($resultmanchetes['manchetes']));


      return $response;

    }

  }
