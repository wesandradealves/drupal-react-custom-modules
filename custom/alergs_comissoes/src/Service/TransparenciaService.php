<?php

namespace Drupal\alergs_comissoes\Service;

class TransparenciaService extends Service
{
  public function listarPresencasComissoes($idComissao, $mes, $ano)
  {
    return $this->curl('http://172.30.3.227:5000/listarRelatoriosComissao', 'POST', ['idComissao' => $idComissao]);
  }
}
