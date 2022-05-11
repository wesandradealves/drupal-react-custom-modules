<?php

namespace Drupal\alergs_opine_proposicoes\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * UserController
 *
 * Get user data for component like CommentList on React.js.
 */
class UserController extends ControllerBase
{
  public function getName(Request $request)
  {
    $cpfCnpj = $request->query->get('cpfCnpj');

    $cpf = \Drupal::entityTypeManager()->getStorage('profile')->loadByProperties(['type' => 'pessoa_fisica', 'field_cpf' => $cpfCnpj]);
    $cnpj = \Drupal::entityTypeManager()->getStorage('profile')->loadByProperties(['type' => 'pessoa_juridica', 'field_cnpj' => $cpfCnpj]);

    // I dont no why.
    $cpf = array_shift($cpf);
    $cnpj = array_shift($cnpj);

    // Just a little trick.
    $name = ($cpf) ? $cpf->field_nome->value : $cnpj->field_entidade->value;

    return new JsonResponse(['name' => ($name) ? $name : 'Usuário']);
  }
}
