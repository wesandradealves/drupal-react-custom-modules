<?php

namespace Drupal\alergs_opine_proposicoes\Plugin\Block;

use Drupal\Core\Block\BlockBase;

use Drupal\alergs_opine_proposicoes\Service\PromovelService;

/**
 * Provides a 'Alergs Opine Proposicoes Widget' Block.
 *
 * @Block(
 *   id = "alergs_opine_proposicoes_widget_block",
 *   admin_label = @Translation("Alergs Opine Proposicoes Widget"),
 *   category = @Translation("alergs_opine_proposicoes"),
 * )
 */
class WidgetBlock extends BlockBase
{
  private $promovelService;

  /**
   * {@inheritdoc}
   */
  public function __construct()
  {
    $this->promovelService = new PromovelService();
  }

  /**
   * {@inheritdoc}
   */
  public function build()
  {
     $dthOrdemDia = ''; 
     //Dynamic date
     $data = date('mY');

     if($data == '01'.date('Y')){
      $nextDate = date('Y-m-d', strtotime("last day of next month",strtotime(date('Y-m-d'))));
      $data = date("mY", strtotime($nextDate));
     }

    //$data = date('022022');
    
    
    $dates = $this->promovelService->listaOrdemDia($data);

    

    // Get items
    $end = end($dates);

    if($end != null){
      $dthOrdemDia = $end->dthOrdemDia;
    }else{
      $dthOrdemDia = date('d/m/Y');
    }

    $proposicoes = $this->promovelService->listaProposicaoOrdemDiaSessao($dthOrdemDia);
    // $proposicoes = [];

    return array(
      '#theme' => 'alergs_opine_proposicoes_widget',
      '#attached' => [
        'drupalSettings' => [
          'proposicoes' => ($proposicoes ? json_encode($proposicoes) : null)
        ],
      ],
    );
  }
}
