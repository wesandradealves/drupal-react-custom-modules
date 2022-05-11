<?php

namespace Drupal\alergs_comissoes\Controller;

use Drupal\Core\Controller\ControllerBase;

use Drupal\alergs_comissoes\Service\ComissoesService;
use Drupal\alergs_comissoes\Service\PromovelService;
use Drupal\alergs_comissoes\Service\TransparenciaService;

use Drupal\alergs_comissoes\Model\AnosModel;

class ComissoesParlamentaresController extends ControllerBase
{
  private $comissoesService;
  private $promovelService;
  private $transparenciaService;

  private $anos;

  public function __construct()
  {
    $this->comissoesService = new ComissoesService();
    $this->promovelService = new PromovelService();
    $this->transparenciaService = new TransparenciaService();

    $this->anos = new AnosModel();
  }

  public function index()
  {
    return [
      '#theme' => 'alergs_comissoes_comissoes_parlamentares',
    ];
  }

  public function apresentacao($id)
  {
    $comissao = $this->comissoesService->listarDadosComissao($id);
    $deputados = $this->comissoesService->listarNominataComissao($comissao->idTipoComissao);

    // dump($deputados);die;

    $historico_reunioes = $this->promovelService->agendaReuniao($id);
    $historico_reunioes = array_slice($historico_reunioes, 0, 3);

    return [
      '#theme' => 'alergs_comissoes_apresentacao',
      '#id' => $id,
      '#comissao' => $comissao,
      '#historico_reunioes' => $historico_reunioes,
      '#attached' => [
        'drupalSettings' => [
          'idComissao' => $id,
          'deputados' => json_encode($deputados)
        ],
      ],
    ];

  }

  public function historicoReunioes($id)
  {
    $anos = $this->anos->getAnos(2003);
    $comissao = $this->comissoesService->listarDadosComissao($id);
    $historico_reunioes = $this->promovelService->reuniaoComissao($id, date('Y'));

    // TODO: Count the total array | or dont? Check this point.
    // $historico_reunioes = array_slice($historico_reunioes, 0, 25);

    return [
      '#theme' => 'alergs_comissoes_historico_reunioes',
      '#id' => $id,
      '#comissao' => $comissao,
      '#attached' => [
        'drupalSettings' => [
          'id' => $id,
          'anos' => json_encode($anos),
          'historicoReunioes' => json_encode($historico_reunioes),
        ],
      ],
    ];
  }

  public function publicacoesRelatorios($id)
  {
    $comissao = $this->comissoesService->listarDadosComissao($id);
    $data = $this->comissoesService->listarRelatoriosComissao($id);

    $publicacoes = $data[0]->publicacoes;
    $relatorios = $data[0]->relatorios;

    // dump($publicacoes, $relatorios);die;

    return [
      '#theme' => 'alergs_comissoes_publicacoes_relatorios',
      '#idComissao' => $id,
      '#comissao' => $comissao,
      // '#publicacoes' => json_encode($publicacoes),
      // '#relatorios' => json_encode($relatorios),
      '#attached' => [
        'drupalSettings' => [
          'publicacoes' => json_encode($publicacoes),
          'relatorios' => json_encode($relatorios)
        ],
      ],

    ];
  }

  public function presencas($id)
  {
    $presencas = "";
    $comissao = $this->comissoesService->listarDadosComissao($id);

    // dump($comissao->nomeComissao);die;
    // $presencas = $this->transparenciaService->listarPresencasComissoes($id, 01, 2021);

    $presencas_form = \Drupal::formBuilder()->getForm('Drupal\alergs_comissoes\Form\PresencasForm');

    return [
      '#theme' => 'alergs_comissoes_presencas',
      '#id' => $id,
      '#comissao' => $comissao,
      '#presencas' => $presencas,
      '#presencas_form' => $presencas_form,
      '#attached' => [
        'drupalSettings' => [
          'publicacoes' => '',
        ],
      ],
    ];
  }

}
