<?php

namespace Drupal\alergs_comissoes\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\alergs_comissoes\Service\NominataService;

class NominatasController extends ControllerBase
{
  public function getAll()
  {
    // $nominataService = new NominataService();
    // $comissoes = $nominataService->listarComissoes();

    $nominatasForm = \Drupal::formBuilder()->getForm('Drupal\alergs_comissoes\Form\NominatasForm');

    return [
      '#theme' => 'alergs_comissoes_nominatas',
      // '#comissoes' => $comissoes,
      '#nominatasForm' => $nominatasForm,
      '#attached' => [
        'drupalSettings' => [
          'idComissao' => ''
        ],
      ],
    ];

  }
}
