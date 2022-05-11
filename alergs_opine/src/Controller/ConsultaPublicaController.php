<?php

namespace Drupal\alergs_opine\Controller;

use Drupal\Core\Controller\ControllerBase;
use \Drupal\user\Entity\User;


class ConsultaPublicaController extends ControllerBase {


  public function content() {
  

    $user = \Drupal\user\Entity\User::load(\Drupal::currentUser()->id());

    $field_cpf = $user->pessoa_fisica_profiles->entity->field_cpf->value;
    $field_cnpj = $user->pessoa_juridica_profiles->entity->field_cnpj->value;

    $field_nome = $user->pessoa_fisica_profiles->entity->field_nome->value;
    $field_entidade = $user->pessoa_juridica_profiles->entity->field_entidade->value;

    $field_telefone = $user->cadastro_profiles->entity->field_telefone->value;

    $user_mail = $user->get('mail')->getValue();

    return [
      '#theme' => 'alergs_opine_consulta_publica',      
      '#user_name' => $field_nome,
      '#attached' => [
        'library' => [
          'alergs_opine/consulta-publica',
        ],
        'drupalSettings' => [
          'user_name' => $field_nome,
          'user_entidade' => $field_entidade,
          'user_mail' => $user_mail[0]['value'],
          'user_cpf' => $field_cpf,
          'user_cnpj' => $field_cnpj,
          'user_phone' => $field_telefone,
        ],
      ],
    ];

  }

}
