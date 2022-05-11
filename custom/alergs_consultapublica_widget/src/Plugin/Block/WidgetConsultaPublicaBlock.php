<?php

namespace Drupal\alergs_consultapublica_widget\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'WidgetConsultaPublica' Block.
 *
 * @Block(
 *   id = "alergs_consultapublica_widget_widget_consulta_publica_block",
 *   admin_label = @Translation("Widget Consulta Publica Block"),
 *   category = @Translation("alergs_consultapublica_widget"),
 * )
 */
class WidgetConsultaPublicaBlock extends BlockBase
{
  /**
   * {@inheritdoc}
   */
  public function build()
  {
    return array(
      // '#markup' => $this->t('Hello, World!'),
      '#theme' => 'alergs_consultapublica_widget_widget_consulta_publica_block'
    );
  }
}
