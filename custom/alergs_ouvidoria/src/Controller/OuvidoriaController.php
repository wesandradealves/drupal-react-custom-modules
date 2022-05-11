<?php

namespace Drupal\alergs_ouvidoria\Controller;

use Drupal\Core\Controller\ControllerBase;
use \Drupal\user\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

use Drupal\Core\Mail\MailManagerInterface;
use Drupal\Component\Utility\SafeMarkup;
use Drupal\Component\Utility\Html;
use Drupal\Core\Render\Markup;
class OuvidoriaController extends ControllerBase {


  public function content() {
  

    $user = \Drupal\user\Entity\User::load(\Drupal::currentUser()->id());

    $config = \Drupal::config('alergs_ouvidoria.adminsettings');  
    
    $title1 =$config->get('alergs_ouvidoria_title1')  ;
    $title2 =$config->get('alergs_ouvidoria_title2')  ;
    $text1=$config->get('alergs_ouvidoria_text1')  ;
    $text2=$config->get('alergs_ouvidoria_text2')  ;
    $text3=$config->get('alergs_ouvidoria_text3')  ;

    return [
      '#theme' => 'alergs_ouvidoria_ouvidoria',      
      '#title1' => $title1,
      '#title2' => $title2,
      '#text1' => $text1,
      '#text2' => $text2,
      '#text3' => $text3,
      '#attached' => [
        'library' => [
          'alergs_ouvidoria/ouvidoria',
        ],
        'drupalSettings' => [
          
        ],
      ],
    ];

  }
  /**
   * Send email 
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function sendEmail(Request $request) {

    global $base_url;
    $base_url_parts = parse_url($base_url);
    $site_url  = $base_url_parts['host'];
    


    $contents =$request->getContent();
    if (!empty($contents)) {
      $content = json_decode($contents, TRUE);
      \Drupal::logger('alergs_ouvidoria')->warning('<pre><code>' . print_r($content, TRUE) . '</code></pre>');;
      $mailManager = \Drupal::service('plugin.manager.mail');
    $module = 'alergs_ouvidoria';
    $key = 'ouvidoria'; // Replace with Your key
    $to = $content['dataOuvidoria']['ouvidoria_email'];
    $token = $content['dataOuvidoria']['ouvidoria_token'];
   
    $params['headers']['Content-Type'] = 'text/html; ';
    $params['headers']['charset'] = 'charset=iso-8859-1; ';
    $params['headers']['MIME-Version'] = '1.0;';
   
    $params['link'] .=$site_url.'/ouvidoria/validar/?id='.$token;
    $params['message'] .='Para ser redirecionado(a) ao portal Ouvidoria Parlamentar da Assembleia Legislativa do Rio grande do Sul e confirmar seus dados.';
    $params['message'] .='A ouvidoria parlamentar agradece seu contato.';
    
    
    
    

    
    
    $params['title'] = "Confirmação de demanda - Ouvidoria ALRS";
    $langcode = \Drupal::currentUser()->getPreferredLangcode();
    $send = true;
  
    $result = $mailManager->mail($module, $key, $to, $langcode, $params, NULL, $send);
    if ($result['result'] != true) {
      
      $message = t('There was a problem sending your email notification to @email.', array('@email' => $to));
     // drupal_set_message($message, 'error');
      \Drupal::logger('mail-log')->error($message);
      return new JsonResponse(['infos' => "error"]);
    }
    \Drupal::logger('alergs_ouvidoria')->warning('<pre><code>' . print_r($result, TRUE) . '</code></pre>');
    return new JsonResponse(['infos' => "success"]);
    }

    return new JsonResponse(['infos' => "error"]);
  }

  


    public function validate() {
    
  
      
  
      
  
      return [
        '#theme' => 'alergs_ouvidoria_validar',      
       
        '#attached' => [
          'library' => [
            'alergs_ouvidoria/ouvidoria',
          ],
          'drupalSettings' => [
            
          ],
        ],
      ];
  
    }

}
