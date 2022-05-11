<?php

namespace Drupal\alergs_import\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
* Configure example settings for this site.
*/
class alergsImportSettingsForm extends ConfigFormBase {

/**
* Config settings.
*
* @var string
*/
const SETTINGS = 'alergs_import.settings';

/**
* {@inheritdoc}
*/
public function getFormId() {
return 'example_admin_settings';
}

/**
* {@inheritdoc}
*/
protected function getEditableConfigNames() {
return [
static::SETTINGS,
];
}

/**
* {@inheritdoc}
*/
public function buildForm(array $form, FormStateInterface $form_state) {

  $config = $this->config(static::SETTINGS);

  $form['alergs_import_url'] = [
  '#type' => 'textfield',
  '#title' => $this->t('URL (ex: http://172.30.3.36:8080)'),
  '#default_value' => \Drupal::config('alergs_import.settings')->get('alergs_import_url')
  ];

  $form['alergs_import_user'] = [
    '#type' => 'textfield',
    '#title' => $this->t('User'),
    '#default_value' => \Drupal::config('alergs_import.settings')->get('alergs_import_user'),
  ];

  $form['alergs_import_password'] = [
    '#type' => 'textfield',
    '#title' => $this->t('Password'),
    '#default_value' => \Drupal::config('alergs_import.settings')->get('alergs_import_password'),
  ];

  return parent::buildForm($form, $form_state);
}

/**
* {@inheritdoc}
*/
public function submitForm(array &$form, FormStateInterface $form_state) {
  // Retrieve the configuration.
  $this->configFactory->getEditable(static::SETTINGS)
  // Set the submitted configuration setting.
  ->set('alergs_import_url', $form_state->getValue('alergs_import_url'))
  ->set('alergs_import_user', $form_state->getValue('alergs_import_user'))
  ->set('alergs_import_password', $form_state->getValue('alergs_import_password'))
  ->save();

parent::submitForm($form, $form_state);
}

}
