<?php

namespace Drupal\alergs_agenda\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use \Drupal\user\Entity\User;
/**
 * Provides a block.
 *
 * @Block(
 *   id = "block_agenda_block",
 *   admin_label = @Translation("Agenda - widget"),
 * )
 */

class AgendaBlock extends BlockBase {

     /**
   * {@inheritdoc}
   */
  public function build() {
  

   

    return [
        'agenda_block' => [
            '#markup' => $this->t('Agenda block'),
      '#theme' => 'alergs_agenda_widget',      
      
      '#attached' => [
        'library' => [
          'alergs_agenda/agenda',
        ],
        
      ],
        ]
    ];

  }

}