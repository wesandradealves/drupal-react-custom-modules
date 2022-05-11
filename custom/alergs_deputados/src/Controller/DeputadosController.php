<?php

namespace Drupal\alergs_deputados\Controller;

use Drupal\Core\Controller\ControllerBase;
use \Drupal\user\Entity\User;

class DeputadosController extends ControllerBase {
  public function content($id = NULL) {
    return [
      '#theme' => 'alergs_deputados_deputados',
      '#id' => $id,
      '#attached' => [
        'library' => [
          'alergs_deputados/deputados',
        ]
      ] 
    ];
  }
}
