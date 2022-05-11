<?php

namespace Drupal\alergs_comissoes\Form;

use Drupal\alergs_comissoes\Model\AnosModel;

use Drupal\Console\Core\Utils\TwigRenderer;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\ReplaceCommand;
use Symfony\Component\HttpFoundation\Request;

use Drupal\Core\Ajax\AfterCommand;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\Core\Ajax\InvokeCommand;

use Drupal\Core\Ajax\SettingsCommand;

#use Twig\Environment;

use Drupal\alergs_comissoes\Service\PromovelService;

/**
 * Class HistoricoReunioesForm
 */
class HistoricoReunioesForm extends FormBase
{
  private $offset = 25;

  private $id;
  private $anos;

  private $promovelService;

  private $historico_reunioes = [];

  public function __construct()
  {
    $this->anos = new AnosModel();
    $this->promovelService = new PromovelService();

    $this->id = \Drupal::routeMatch()->getRawParameter('id');

    $this->anos = $this->anos->getAnos(2013);

    $this->historico_reunioes = $this->promovelService->reuniaoComissao($this->id, 2019);

    // FIXME: Remove the slice and paginate by React.js
    // $this->historico_reunioes = array_slice($this->historico_reunioes, 0, 25);

    // dump($this->historico_reunioes);die;
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId()
  {
    return 'historico_reunioes_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state)
  {
    $form['ano'] = [
      '#type' => 'select',
      '#title' => $this->t('Anos'),
      '#options' => $this->anos,
      '#ajax' => [
        'callback' => '::anoCallback',
        'disable-refocus' => TRUE,
        'event' => 'change',
        'wrapper' => 'historico-reunioes-result',
        'progress' => [
          'type' => 'throbber',
          'message' => $this->t('Carregando...'),
        ],
      ]
    ];

    $form['result'] = [
      '#type' => 'markup',
      '#markup' => '',
      '#prefix' => '<div id="historico-reunioes-result">',
      '#sufix' => '</div>'
    ];

    $markup = [
      '#theme' => 'alergs_comissoes_historico_reunioes_list',
      // '#historico_reunioes' => $this->historico_reunioes,
      '#attached' => [
        'drupalSettings' => [
          'historico_reunioes' => json_encode($this->historico_reunioes)
        ],
      ],
    ];

    $form['result']['#markup'] = \Drupal::service('renderer')->render($markup);

    return $form;









    $markup = $this->historicoReunuiaoInit($this->id, array_shift($this->anos));

    $form['result'] = [
      '#type' => 'markup',
      '#markup' => '<div id="historico-reunioes-result">' . $markup . '</div>'
    ];

    return $form;

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

  public function historicoReunuiaoInit($comissaoId, $ano)
  {
    $promovelService = new PromovelService();
    $historico_reunioes = $promovelService->reuniaoComissao($comissaoId, $ano);
    $historico_reunioes = array_slice($historico_reunioes, 0, 25);

    // dump($historico_reunioes);die;

    $renderable = [
      '#theme' => 'alergs_comissoes_historico_reunioes_list',
      '#attached' => [
        'drupalSettings' => [
          'historico_reunioes' => json_encode($historico_reunioes)
        ],
      ],
    ];

    $markup = \Drupal::service('renderer')->renderPlain($renderable);

    return $markup;
  }







  public function anoCallback(array $form, FormStateInterface $form_state)
  {
    $form_state->setRebuild(FALSE);

    $selectedValue = $form_state->getValue('ano');

    // Filter the form
    $promovelService = new PromovelService();
    $historico_reunioes = $promovelService->reuniaoComissao($form_state->getValue('id'), $selectedValue);
    // $historico_reunioes = array_slice($historico_reunioes, 0, 25);

    $renderable = [
      '#theme' => 'alergs_comissoes_historico_reunioes_list',
      '#attached' => [
        'drupalSettings' => [
          'historico_reunioes' => compact($this->historico_reunioes)
        ],
      ],
    ];

    $markup = \Drupal::service('renderer')->renderPlain($renderable);

    $output = "<div id='nominatas-result'>$markup</div>";
    $element = $form['result'];
    $element['#markup'] = $output;

    return $element;





    $markup = [
      '#theme' => 'alergs_comissoes_historico_reunioes_list',
      // '#historico_reunioes' => $this->historico_reunioes,
      '#attached' => [
        'drupalSettings' => [
          'historico_reunioes' => json_encode($this->historico_reunioes)
        ],
      ],
    ];

    $form['result']['#markup'] = \Drupal::service('renderer')->render($markup);


    // TODO: work with drupalSettings

    // dump($selecteValue);die;
    if ($selectedValue = $form_state->getValue('ano')) {

      // Filter the form
      $promovelService = new PromovelService();
      $historico_reunioes = $promovelService->reuniaoComissao($form_state->getValue('id'), $selectedValue);
      $historico_reunioes = array_slice($historico_reunioes, 0, 25);

      // dump($selectedValue, $historico_reunioes);die;
      // dump($selectedValue, $this->id);die;

      // $historico_reunioes = $selectedValue;

      $renderable = [
        '#theme' => 'alergs_comissoes_historico_reunioes_list',
        // '#historico_reunioes' => $historico_reunioes,
        '#attached' => [
          'drupalSettings' => [
            'historico_reunioes' => json_encode($historico_reunioes)
          ],
        ],
      ];

      $rendered = \Drupal::service('renderer')->render($renderable);

      // $output = "<div class='historico_reunioes_result'>$rendered</div>";
      // return ['#markup' => $output];

      // return $form['result']['#markup' ] = $output;

      $response = new AjaxResponse();

      // $response->addCommand(
      //   new SettingsCommand(['historico_reunioes' => json_encode($historico_reunioes), 'merge' => true])
      // );

      // $response->addCommand(new ReplaceCommand('#historico_reunioes_result', $renderable));

      return $response;

      $response->addCommand(
        new HtmlCommand(
          '#historico-reunioes-result',
          $rendered
        ),
      );

      return $response;
    }

    // dump($this->historico_reunioes);die;
  }

  public function _anoCallback(array &$form, FormStateInterface $form_state)
  {
    if ($selectedValue = $form_state->getValue('ano')) {
      $this->historico_reunioes = $this->promovelService->reuniaoComissao($this->id, $selectedValue);

      $markup = $this->renderTemplate($this->historico_reunioes);
      $output = "<div id='edit-output'>$markup</div>";

      return ['#markup' => $output];
    }
  }

  public function renderTemplate($historico_reunioes)
  {
    // TODO: need to create cache context!
    // $this->historico_reunioes = $historico_reunioes;

    $twig = \Drupal::service('twig');
    $template = $twig->loadTemplate(drupal_get_path('module', 'alergs_comissoes') . '/templates/component/historico-reuniao-list.html.twig');

    return $template->render(['historico_reunioes' => $historico_reunioes]);
  }
}
