<?php  

/**  
 * @file  
 * Contains Drupal\alergs_ouvidoria\Form\OuvidoriaForm.  
 */  

namespace Drupal\alergs_ouvidoria\Form;  

use Drupal\Core\Form\ConfigFormBase;  
use Drupal\Core\Form\FormStateInterface;  

class OuvidoriaForm extends ConfigFormBase {  
  /**  
   * {@inheritdoc}  
   */  
  protected function getEditableConfigNames() {  
    return [  
      'alergs_ouvidoria.adminsettings',  
    ];  
  }  

  /**  
   * {@inheritdoc}  
   */  
  public function getFormId() {  
    return 'alergs_ouvidoria_form';  
  }  
  /**  
   * {@inheritdoc}  
   */  
  public function buildForm(array $form, FormStateInterface $form_state) {  
    $config = $this->config('alergs_ouvidoria.adminsettings');  

    $form['alergs_ouvidoria'] = [
        '#tree' => TRUE,
        '#type' => 'fieldset',
        '#title' => $this->t('Página de Ouvidoria'),
      ];
    
    $form['alergs_ouvidoria_title1'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('Insira o título do primeiro bloco'),  
      
      '#default_value' => $config->get('alergs_ouvidoria_title1'),  
    ]; 
    
    $form['alergs_ouvidoria_text1'] = [  
      '#type' => 'textarea',  
      '#title' => $this->t('Insira o conteúdo do primeiro bloco'),  
      
      '#default_value' => $config->get('alergs_ouvidoria_text1'),  
      '#type' => 'text_format',
      '#format' => 'basic_html',
      
    ]; 

    $form['alergs_ouvidoria_title2'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('Insira o título do segundo bloco'),  
      
      '#default_value' => $config->get('alergs_ouvidoria_title2'),  
    ]; 
    
    $form['alergs_ouvidoria_text2'] = [  
      '#type' => 'textarea',  
      '#title' => $this->t('Insira o conteúdo do segundo bloco'),  
      
      '#default_value' => $config->get('alergs_ouvidoria_text2'), 
      '#type' => 'text_format',
      '#format' => 'basic_html',
       
    ];
    
    $form['alergs_ouvidoria_text3'] = [  
      '#type' => 'textarea',  
      '#title' => $this->t('Informações de contato'),  
      
      '#default_value' => $config->get('alergs_ouvidoria_text3'),  
      '#type' => 'text_format',
      '#format' => 'basic_html',
      
    ];

    return parent::buildForm($form, $form_state);  
  } 

    /**  
   * {@inheritdoc}  
   */  
  public function submitForm(array &$form, FormStateInterface $form_state) {  
    parent::submitForm($form, $form_state);  

    $this->config('alergs_ouvidoria.adminsettings')  
      ->set('alergs_ouvidoria_title1', $form_state->getValue('alergs_ouvidoria_title1'))
      ->set('alergs_ouvidoria_title2', $form_state->getValue('alergs_ouvidoria_title2'))
      ->set('alergs_ouvidoria_text1', $form_state->getValue('alergs_ouvidoria_text1')['value'])
      ->set('alergs_ouvidoria_text2', $form_state->getValue('alergs_ouvidoria_text2')['value'])
      ->set('alergs_ouvidoria_text3', $form_state->getValue('alergs_ouvidoria_text3')['value'])    
      ->save();  
  }
}  