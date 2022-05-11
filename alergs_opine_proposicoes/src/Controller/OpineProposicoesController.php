<?php

namespace Drupal\alergs_opine_proposicoes\Controller;

use Drupal\Core\Controller\ControllerBase;

use Drupal\alergs_opine_proposicoes\Service\PromovelService;
use Drupal\alergs_opine_proposicoes\Service\OpineService;
use Drupal\alergs_opine_proposicoes\Helper\UserHelper;

class OpineProposicoesController extends ControllerBase
{
  private $userId;
  private $userName;
  private $promovelService;
  private $opineService;

  public function __construct()
  {
    $this->promovelService = new PromovelService();
    $this->opineService = new OpineService();

    $data = UserHelper::getData();

    $this->userId = $data['id'];
    $this->userName = $data['userName'];
    $this->cpfCnpj = $data['cpfCnpj'];
  }

  public function index()
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

    // Just to include the $deputado
    /*$items = array_map(function ($item) {
      $deputado = $this->promovelService->obtemProposicaoCompleto($item->siglaTipoProposicao, $item->nroProposicao, $item->anoProposicao);
      $item->deputado = $deputado[0]->proponente;

      return $item;
    }, $items);*/

    return [
      '#theme' => 'alergs_opine_proposicoes_index',
      '#userId' => $this->userId,
      '#attached' => [
        'drupalSettings' => [
          'proposicoes' => ($proposicoes ? json_encode($proposicoes) : null)
        ],
      ],
    ];
  }

  public function apresentacao($siglaTipoProposicao, $nroProposicao, $anoProposicao)
  {
    $proposicao = $this->promovelService->obtemProposicaoCompleto($siglaTipoProposicao, $nroProposicao, $anoProposicao)[0];
    $legislacao = $this->promovelService->obtemLegislacao($siglaTipoProposicao, $nroProposicao, $anoProposicao)[0];
    $votosProposicao = $this->promovelService->listaMateriasApreciadasCompleto($siglaTipoProposicao, $nroProposicao, $anoProposicao)[0];

    // Votações
    $votacao = $this->opineService->listarVotacaoProposicao($this->cpfCnpj, $siglaTipoProposicao, $nroProposicao, $anoProposicao);
    $votos = $votacao->total;

    $voto = (isset($votacao->participante)) ? $votacao->participante[0]->voto : '';

    // TODO: Load comentarios here!
    // TODO: Get name from Drupal User!

    // Comentários
    $comments = $this->opineService->listarComentarioProposicao($siglaTipoProposicao, $nroProposicao, $anoProposicao);
    // $comments = array_slice($comments, 0, 1);

    // dump($comments);
    // die;

    if ($comments) {
      $comments = array_map(function ($comment) {
        // FIXME: Create a helper or util for this bellow!

        $cpfCnpj = preg_replace('/[^0-9]/', '', $comment->cpfCnpjFormatado);

        $cpf = \Drupal::entityTypeManager()->getStorage('profile')->loadByProperties(['type' => 'pessoa_fisica', 'field_cpf' => $cpfCnpj]);
        $cnpj = \Drupal::entityTypeManager()->getStorage('profile')->loadByProperties(['type' => 'pessoa_juridica', 'field_cnpj' => $cpfCnpj]);

        // I dont no why.
        $cpf = array_shift($cpf);
        $cnpj = array_shift($cnpj);

        // Just a little trick.
        $name = ($cpf) ? $cpf->field_nome->value : $cnpj->field_entidade->value;

        $comment->nome = ($name) ? $name : 'Usuário';

        return $comment;
      }, $comments);
    }


    // rsort($comments);

    // dump($comments);die;
    // dump($this->userName);die;

    return [
      '#theme' => 'alergs_opine_proposicoes_apresentacao',
      '#userId' => $this->userId,
      '#proposicao' => $proposicao,
      '#legislacao' => $legislacao,
      '#votosProposicao' => $votosProposicao,
      '#attached' => [
        'drupalSettings' => [
          'proposicao' => json_encode($proposicao),
          'cpfCnpjParticipante' => $this->cpfCnpj,
          'siglaTipoProposicao' => $siglaTipoProposicao,
          'nroProposicao' => $nroProposicao,
          'anoProposicao' => $anoProposicao,
          'cpfCnpj' => $this->cpfCnpj,
          'votos' => json_encode($votos),
          'voto' => $voto,

          'comments' => json_encode($comments),
          'userName' => $this->userName,
        ],
      ],
    ];
  }

  public function nextMonth()
  {
      /*$nextMonthNumber = date('M', strtotime('first day of +1 month'));
      $nextMonthDate = new DateTime();
      $nextMonthDate->add(new DateInterval('P1M'));
      while ($nextMonthDate->format('M') != $nextMonthNumber) {
          $nextMonthDate->sub(new DateInterval('P1D'));
      }
      var_dump($nextMonthDate);
      return $nextMonthDate;*/
      return '';
  }
}
