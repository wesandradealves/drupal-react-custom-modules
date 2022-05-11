<?php

namespace Drupal\alergs_deputados_widget\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'WidgetDeputados' Block.
 *
 * @Block(
 *   id = "alergs_deputados_widget_widget_block",
 *   admin_label = @Translation("Widget Deputados Block"),
 *   category = @Translation("alergs_deputados_widget"),
 * )
 */
class WidgetDeputadosBlock extends BlockBase
{
  /**
   * {@inheritdoc}
   */
  public function build()
  {
    return array(
      // '#markup' => $this->t('Hello, World!'),
      '#theme' => 'alergs_deputados_widget_widget_block'
    );
  }
}
