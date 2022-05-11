<?php

namespace Drupal\alergs_opine_proposicoes\Helper;

class UserHelper
{
  public static function getData()
  {
    $user = \Drupal\user\Entity\User::load(\Drupal::currentUser()->id());

    if (!in_array('anonymous', $user->getRoles())) {

      $cpf = ($user->pessoa_fisica_profiles->entity->field_cpf->value) ? $user->pessoa_fisica_profiles->entity->field_cpf->value : '';
      $cnpj = ($user->pessoa_juridica_profiles->entity->field_cnpj->value) ? $user->pessoa_juridica_profiles->entity->field_cnpj->value : '';

      $nome = ($user->pessoa_juridica_profiles->entity->field_nome->value) ? $user->pessoa_juridica_profiles->entity->field_nome->value : '';
      $razaoSocial = ($user->pessoa_juridica_profiles->entity->field_entidade->value) ? $user->pessoa_juridica_profiles->entity->field_entidade->value : '';

      $data['id'] = $user->id();
      $data['userName'] = ($nome) ? $nome : $razaoSocial;
      $data['cpfCnpj'] = ($cpf) ? $cpf : $cnpj;

      return $data;

      #$this->userId = $user->id();
      #$this->userName = ($nome) ? $nome : $razaoSocial;
      #$this->cpfCnpj = ($cpf) ? $cpf : $cnpj;
    }
  }
}
