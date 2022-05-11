<?php

namespace Drupal\alergs_comissoes\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Newsletter' Block.
 *
 * @Block(
 *   id = "newsletter_block",
 *   admin_label = @Translation("Newsletter block"),
 *   category = @Translation("alergs_comissoes"),
 * )
 */
class NewsletterBlock extends BlockBase
{
  /**
   * {@inheritdoc}
   */
  public function build()
  {
    return array(
      // '#markup' => $this->t('Hello, World!'),
      '#theme' => 'alergs_comissoes_form_newsletter_block'
    );
  }
}
