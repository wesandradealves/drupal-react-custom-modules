<?php  

/**  
 * @file  
 * Contains Drupal\alergs_agenda\Form\AgendaForm.  
 */  

namespace Drupal\alergs_agenda\Form;  

use Drupal\Core\Form\ConfigFormBase;  
use Drupal\Core\Form\FormStateInterface;  

class AgendaForm extends ConfigFormBase {  
  /**  
   * {@inheritdoc}  
   */  
  protected function getEditableConfigNames() {  
    return [  
      'alergs_agenda.adminsettings',  
    ];  
  }  

  /**  
   * {@inheritdoc}  
   */  
  public function getFormId() {  
    return 'alergs_agenda_form';  
  }  
  /**  
   * {@inheritdoc}  
   */  
  public function buildForm(array $form, FormStateInterface $form_state) {  
    $config = $this->config('alergs_agenda.adminsettings');  

    $form['alergs_agenda'] = [
        '#tree' => TRUE,
        '#type' => 'fieldset',
        '#title' => $this->t('Link para Agenda Cultural'),
      ];
    
    $form['alergs_agenda_link'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('Insira o link para o botão Agenda Cultural'),  
      '#description' => $this->t('Link iniciado em https://'),  
      '#default_value' => $config->get('alergs_agenda_link'),  
    ];  

    return parent::buildForm($form, $form_state);  
  } 

    /**  
   * {@inheritdoc}  
   */  
  public function submitForm(array &$form, FormStateInterface $form_state) {  
    parent::submitForm($form, $form_state);  

    $this->config('alergs_agenda.adminsettings')  
      ->set('alergs_agenda_link', $form_state->getValue('alergs_agenda_link'))  
      ->save();  
  }
}  