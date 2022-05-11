<?php

namespace Drupal\alergs_institucional\Controller;

use Drupal\Core\Controller\ControllerBase;
use \Drupal\user\Entity\User;

class InstitucionalController extends ControllerBase {
  public function content($id = NULL) {
    return [
      '#theme' => 'alergs_mesa_diretora',  
      '#id' => $id,
      '#attached' => [
        'library' => [
          'alergs_institucional/deputados',
        ]
      ]      
    ];
  }
}