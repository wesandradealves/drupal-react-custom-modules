<?php

namespace Drupal\alergs_newsletter\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Newsletter' Block.
 *
 * @Block(
 *   id = "newsletter_footer_block",
 *   admin_label = @Translation("Newsletter Block Footer"),
 *   category = @Translation("alergs_newsletter"),
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
      '#theme' => 'alergs_newsletter_form_newsletter_footer_block'
    );
  }
}
