<?php

namespace Drupal\alergs_comissoes\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\Core\Ajax\ReplaceCommand;

use Drupal\alergs_comissoes\Service\NominataService;

class NominatasForm extends FormBase
{

  private $nominataService;
  private $comissoes;

  public function __construct()
  {
    $this->nominataService = new NominataService();

    $this->comissoes = $this->nominataService->listarComissoes();

    $comissoes = [];

    foreach ($this->comissoes as $key => $comissao) {
      $comissoes["$comissao->idComissao"] = $comissao->nomeComissao;
      // $form['comissao']['#options'][$comissao->idComissao] = $this->t(['@comissao' => $comissao->nomeComissao]), ;
    }

    $this->comissoes = $comissoes;

    // dump($this->comissoes);die;
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId()
  {
    return 'nominatas_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state)
  {
    $form['comissao'] = [
      '#type' => 'select',
      '#title' => $this->t(''),
      '#options' => $this->comissoes,
      '#ajax' => [
        'callback' => '::comissaoCallback',
        'disable-refocus' => TRUE,
        'event' => 'change',
        'wrapper' => 'nominatas-result',
        'progress' => [
          'type' => 'throbber',
          'message' => $this->t('Carregando...'),
        ],
      ]
    ];

    $markup = $this->comissaoInit();

    $form['result'] = [
      '#type' => 'markup',
      '#markup' => '<div id="nominatas-result">' . $markup . '</div>'
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
    foreach ($form_state->getValues() as $key => $value) {
      \Drupal::messenger()->addStatus($key . ': ' . $value);
    }
  }

  /**
   * @return mixed
   */
  public function comissaoInit()
  {
    $nominataService = new NominataService();
    $nominatas = $nominataService->listarNominataComissao(array_key_first($this->comissoes));

    $renderable = [
      '#theme' => 'alergs_comissoes_nominatas_list',
      '#nominatas' => $nominatas
    ];

    $markup = \Drupal::service('renderer')->renderPlain($renderable);

    return $markup;
  }

  /**
   * @param array $form
   * @param FormStateInterface $form_state
   *
   * @return mixed
   */
  public function comissaoCallback(array &$form, FormStateInterface $form_state)
  {
    // $form_state->setRebuild(FALSE);

    $selectedValue = $form_state->getValue('comissao');

    $nominataService = new NominataService();
    $nominatas = $nominataService->listarNominataComissao($selectedValue);

    $renderable = [
      '#theme' => 'alergs_comissoes_nominatas_list',
      '#nominatas' => $nominatas
    ];

    $markup = \Drupal::service('renderer')->renderPlain($renderable);

    $output = "<div id='nominatas-result'>$markup</div>";
    $element = $form['result'];
    $element['#markup'] = $output;

    return $element;
  }
}
