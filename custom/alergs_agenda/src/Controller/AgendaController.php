<?php

namespace Drupal\alergs_agenda\Controller;

use Drupal\Core\Controller\ControllerBase;


class AgendaController extends ControllerBase {


  public function content() {
    $config = \Drupal::config('alergs_agenda.adminsettings');  
    
    $link_cultural = 'http://www2.al.rs.gov.br/drpac/AgendaCultural/tabid/3274/Default.aspx'; //$config->get('alergs_agenda_link');
    

    return [
      '#theme' => 'alergs_agenda_agenda',      
      '#link_cultural' => $link_cultural,
      '#attached' => [
        'library' => [
          'alergs_agenda/agenda',
        ],
       
      ],
    ];

  }

}
