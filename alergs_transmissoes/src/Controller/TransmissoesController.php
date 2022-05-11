<?php

namespace Drupal\alergs_transmissoes\Controller;

use Drupal\Core\Controller\ControllerBase;
use \Drupal\user\Entity\User;

class TransmissoesController extends ControllerBase {
  public function content($id = NULL) {
    return [
      '#theme' => 'alergs_transmissoes_transmissoes',
      '#id' => $id,
      '#attached' => [
        'library' => [
          'alergs_transmissoes/transmissoes',
        ]
      ] 
    ];
  }
}
