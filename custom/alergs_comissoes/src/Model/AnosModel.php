<?php

namespace Drupal\alergs_comissoes\Model;

class AnosModel
{
  public function getAnos($since)
  {
    $anos = [];

    for ($i = $since; $i <= date('Y'); $i++) {
      $anos[] = ['label' => $i, 'value' => $i];
    }

    rsort($anos);

    return (array) $anos;
  }
}



