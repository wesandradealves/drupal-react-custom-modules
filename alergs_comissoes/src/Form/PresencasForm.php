<?php

namespace Drupal\alergs_comissoes\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;

use Drupal\alergs_comissoes\Model\AnosModel;
use Drupal\alergs_comissoes\Model\MesesModel;

/**
 * Class PresencasForm
 */
class PresencasForm extends FormBase
{
  private $anosModel;
  private $mesesModel;

  public function __construct()
  {
    $this->anos = new AnosModel();
    $this->meses = new MesesModel();

    $this->id = (int) \Drupal::routeMatch()->getRawParameter('id');

    $this->anos = $this->anos->getAnos(2005);
    $this->meses = $this->meses->getMeses();
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId()
  {
    return 'presencas_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state)
  {
    $form['ano'] = [
      '#type' => 'select',
      '#title' => $this->t('Ano'),
      '#options' => $this->anos,
      '#ajax' => [
        // 'callback' => '::anoCallback',
        'disable-refocus' => TRUE,
        'event' => 'change',
        'wrapper' => 'edit-output',
        'progress' => [
          'type' => 'throbber',
          'message' => $this->t('Carregando...'),
        ],
      ]
    ];

    $form['mes'] = [
      '#type' => 'select',
      '#title' => $this->t('Mês'),
      '#options' => $this->meses,
      '#ajax' => [
        // 'callback' => '::anoCallback',
        'disable-refocus' => TRUE,
        'event' => 'change',
        'wrapper' => 'edit-output',
        'progress' => [
          'type' => 'throbber',
          'message' => $this->t('Carregando...'),
        ],
      ]
    ];

    $form['actions'] = [
      '#type' => 'actions',
    ];

    $form['pesquisar'] = [
      '#type' => 'button',
      '#value' => $this->t('Pesquisar'),
      '#ajax' => [
        'callback' => '::pesquisarCallback',
        'disable-refocus' => TRUE,
        // 'event' => 'change',
        // 'wrapper' => 'edit-output',
        'progress' => [
          'type' => 'throbber',
          'message' => $this->t('Carregando...'),
        ],
      ],
    ];

    $form['message'] = [
      '#type' => 'markup',
      '#markup' => '<div class="presencas_result"></div>'
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state)
  {
    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state)
  {
    // Display result.
    // foreach ($form_state->getValues() as $key => $value) {
    //   \Drupal::messenger()->addStatus($key . ': ' . $value);
    // }
  }

  public function pesquisarCallback(array $form, FormStateInterface $form_state)
  {

    $renderable = [
      '#theme' => 'alergs_comissoes_presencas_list',
      // '#test_var' => 'test variable',
    ];

    $rendered = \Drupal::service('renderer')->renderPlain($renderable);

    $response = new AjaxResponse();
    $response->addCommand(
      new HtmlCommand(
        '.presencas_result',
        $rendered
      ),
    );

    return $response;
  }
}
