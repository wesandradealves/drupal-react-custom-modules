<?php

namespace Drupal\alergs_agenda\Controller;

use Drupal\Core\Controller\ControllerBase;


class AgendaWidgetController extends ControllerBase {


  public function content() {
  


    return [
      '#theme' => 'alergs_agenda_widget',      
      
      '#attached' => [
        'library' => [
          'alergs_agenda/agenda',
        ],
        
      ],
    ];

  }

}
