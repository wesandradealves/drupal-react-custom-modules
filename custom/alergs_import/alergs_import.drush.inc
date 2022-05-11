<?php

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use \Drupal\node\Entity\Node;
use \Drupal\file\Entity\File;
Use \Drupal\Core\File\FileSystemInterface;

/**
 * Implements hook_drush_command().
 */
function alergs_import_drush_command() {   
    
    $commands['alergs-get-content'] = [
        'description' => 'Importa conteudo a partir do web services da ALERGS',
        'aliases' => ['agc'],
        'arguments' => [      
            'dataInicio' => 'Importa conteudo FULL',
            'dataFim' => 'Importa conteudo DIARIO',
        ],
        'examples' => [       
            'drush agc' => 'Importa conteudo a partir do web services da ALERGS',
            'drush agc full' => 'Carga FULL a partir do web services da ALERGS',
            'drush agc day' => 'Carga DIARIA a partir do web services da ALERGS',
        ],
    ];

    $commands['alergs-get-daily-content-update'] = [
        'description' => 'Importa conteudo a partir do web services da ALERGS',
        'aliases' => ['agdu'],
        'examples' => [       
            'drush agdu' => 'Importa conteudo a partir do web services da ALERGS',
        ],
    ];

    $commands['alergs-get-daily-noticias'] = [
        'description' => 'Importa noticias a partir do web services da ALERGS',
        'aliases' => ['agnoticias'],
        'examples' => [       
            'drush agnoticias' => 'Importa noticias a partir do web services da ALERGS',
        ],
    ];

    $commands['alergs-get-tval'] = [
        'description' => 'Importa conteudo a partir do web services da ALERGS',
        'aliases' => ['agtv'],
        'arguments' => [      
            'full' => 'Importa conteudo FULL',
            'day' => 'Importa conteudo DIARIO',
        ],
        'examples' => [       
            'drush agtv' => 'Importa conteudo a partir do web services da ALERGS',
            'drush agtv full' => 'Carga FULL a partir do web services da ALERGS',
            'drush agtv day' => 'Carga DIARIA a partir do web services da ALERGS',
        ],
    ];

    $commands['alergs-get-programas-tval'] = [
        'description' => 'Importa conteudo a partir do web services da ALERGS',
        'aliases' => ['agptv'],
        'arguments' => [      
            'full' => 'Importa conteudo FULL',
            'day' => 'Importa conteudo DIARIO',
        ],
        'examples' => [       
            'drush agptv' => 'Importa conteudo a partir do web services da ALERGS',
            'drush agptv full' => 'Carga FULL a partir do web services da ALERGS',
            'drush agptv day' => 'Carga DIARIA a partir do web services da ALERGS',
        ],
    ];

    $commands['alergs-get-tv-al-daily-update'] = [
        'description' => 'Importa conteudo de TV a partir do web services da ALERGS',
        'aliases' => ['agdtv'],
        'examples' => [       
            'drush agdtv' => 'Importa conteudo de TV a partir do web services da ALERGS',
        ],
    ];

    $commands['alergs-get-radio-al'] = [
        'description' => 'Importa conteudo a partir do web services da ALERGS',
        'aliases' => ['agradio'],
        'arguments' => [      
            'full' => 'Importa conteudo FULL',
            'day' => 'Importa conteudo DIARIO',
        ],
        'examples' => [       
            'drush agradio' => 'Importa conteudo a partir do web services da ALERGS',
            'drush agradio full' => 'Carga FULL a partir do web services da ALERGS',
            'drush agradio day' => 'Carga DIARIA a partir do web services da ALERGS',
        ],
    ];

    $commands['alergs-get-radio-al-daily-update'] = [
        'description' => 'Importa conteudo de RADIO a partir do web services da ALERGS',
        'aliases' => ['agdradio'],
        'examples' => [       
            'drush agdradio' => 'Importa conteudo de RADIO a partir do web services da ALERGS',
        ],
    ];

    $commands['alergs-delete-content'] = [
        'description' => 'Deleta conteudo do Portal ALERGS',
        'aliases' => ['adc'],
        'arguments' => [      
            'noticias' => 'Deleta todos os conteudos do tipo Noticias',
            'tval' => 'Deleta todos os conteudos do tipo TV AL',
        ],
        'examples' => [       
            'drush adc' => 'Deleta conteudo do Portal ALERGS',
            'drush adc noticias' => 'Deleta todos os conteudos do tipo Noticias',
            'drush adc tval' => 'Deleta todos os conteudos do tipo TV AL',
        ],
    ];

    

  return $commands;
} 


/**
 * Drush command logic for drush_alergs_import_alergs_get_content
 *
 */
function drush_alergs_import_alergs_get_content($dataInicio = NULL, $dataFim = NULL) {
    
    $token_alergs = call_alergs_api_post();

    $jsonData = array(
        'dataInicio' =>  $dataInicio,
        'dataFim' => $dataFim,
        'listaIdMateria' => [],
        'listaIgnorarIdMateria' => array(),
        'listaIdTipoMateria' => array(),
        'publicada' => "",
    );
  
    $jsonDataEncoded = json_encode($jsonData);

    $authorization = "Authorization: Bearer ".$token_alergs;

    $dateInit = "CARGA DE CONTEUDO - HORA INCIAL - ".date("Y-m-d h:i:sa");

    \Drupal::logger('alergs_import')->notice($dateInit);  


    $url_listaMaterias = \Drupal::config('alergs_import.settings')->get('alergs_import_url').'/alergsws/rest/agenciadenoticia/listarNoticias/json/';    
    $curl = curl_init($url_listaMaterias);
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonDataEncoded);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json' , $authorization )); 
    $result = curl_exec($curl);
    curl_close($curl);  

    $resultArray = json_decode($result, TRUE);

    foreach ($resultArray as $key => $values) {

        $count = 0;

        foreach ($values as $news) {

            ++$count;

            $newsObject = json_decode(json_encode($news));

            $nodeExistente = \Drupal::entityTypeManager()->getStorage('node')->loadByProperties(['field_idmateria' => $newsObject->idMateria]);

            if(empty($nodeExistente)){

                $node = Node::create(['type' => 'noticias']);
                $node->langcode = "pt-br";
                $node->uid = 1;
                $node->promote = 0;
                $node->sticky = 0;
                $node->title= $newsObject->tituloMateria;
                $node->set('body', $newsObject->textoMateria);
                $node->body->format = 'full_html';
                $node->field_idmateria = $newsObject->idMateria;
                $node->field_autoria = $newsObject->autoria;
                $node->field_paraeditor = $newsObject->paraEditor;
                $node->field_horapublicao = $newsObject->horaPublicao;
                $node->field_descricaoarea = $newsObject->areaMateria;
                $node->field_lead = $newsObject->lead;
                $node->field_editornome = $newsObject->editorNome;
                $node->field_creditofoto = $newsObject->creditoFoto;
                $node->field_idarea = $newsObject->idArea;

                if($newsObject->idTipoMateria == 22){
                    $node->field_categoria = array("Artigos");
                }elseif ($newsObject->idTipoMateria == 2) {
                    $node->field_categoria = array("Comissões","Todas");
                }elseif ($newsObject->idTipoMateria == 3) {
                    $node->field_categoria = array("Deputados","Todas");
                }elseif ($newsObject->idTipoMateria == 4) {
                    $node->field_categoria = array("Comissões","Deputados","Todas");
                }else{
                    $node->field_categoria = array("Todas");
                }

                $node->field_idalbum = $newsObject->idAlbum;
                $node->field_idfotografia = $newsObject->idFotografia;
                $node->field_idtipomateria = $newsObject->idTipoMateria;
                $node->field_tipomateria = $newsObject->tipoMateria;

                $node->setNewRevision(TRUE);
                $node->revision_log = 'Created revision for node' . $nid;
                
                $ws_data = $newsObject->paraEditor." ".$newsObject->horaPublicao.":00";
                $dataStr = str_replace("/", "-", $ws_data);
                $newDate = strtotime($dataStr);
                $node->setRevisionCreationTime($newDate);
                $node->changed = $newDate;
                $node->created = $newDate;

                $node->promote = 1;

                if($newsObject->indPublicacaoLiberada == "N"){
                    $node->status = 0;
                }else{
                    $node->status = 1;
                }

                if(!empty($newsObject->urlFotografia)){    
                    $value_image = $newsObject->urlFotografia;
                    $path_image = pathinfo($value_image);
                    $data_image = file_get_contents($value_image);
                    $file = file_save_data($data_image, "public://".$path_image['filename'].".".$path_image['extension'], FileSystemInterface::EXISTS_REPLACE);
                    $node->field_img_noticia = $file;
                }

                $node->save();

                $nid = $node->id(); 

                drush_print($count." - CREATED - Noticia: [". $newsObject->idMateria ."] - " .$newsObject->tituloMateria);

            }else{

                $node = Node::load(key($nodeExistente)); 
                $node->title= $newsObject->tituloMateria;
                $node->set('body', $newsObject->textoMateria);
                $node->body->format = 'full_html';
                $node->field_idmateria = $newsObject->idMateria;
                $node->field_autoria = $newsObject->autoria;
                $node->field_paraeditor = $newsObject->paraEditor;
                $node->field_horapublicao = $newsObject->horaPublicao;
                $node->field_descricaoarea = $newsObject->areaMateria;
                $node->field_lead = $newsObject->lead;
                $node->field_editornome = $newsObject->editorNome;
                $node->field_creditofoto = $newsObject->creditoFoto;
                $node->field_idarea = $newsObject->idArea;
                
                if($newsObject->idTipoMateria == 22){
                    $node->field_categoria = array("Artigos");
                }elseif ($newsObject->idTipoMateria == 2) {
                    $node->field_categoria = array("Comissões","Todas");
                }elseif ($newsObject->idTipoMateria == 3) {
                    $node->field_categoria = array("Deputados","Todas");
                }elseif ($newsObject->idTipoMateria == 4) {
                    $node->field_categoria = array("Comissões","Deputados","Todas");
                }else{
                    $node->field_categoria = array("Todas");
                }
                
                $node->field_idalbum = $newsObject->idAlbum;
                $node->field_idfotografia = $newsObject->idFotografia;
                $node->field_idtipomateria = $newsObject->idTipoMateria;
                $node->field_tipomateria = $newsObject->tipoMateria;

                $node->setNewRevision(TRUE);
                $node->revision_log = 'Created revision for node' . $nid;
                
                $ws_data = $newsObject->paraEditor." ".$newsObject->horaPublicao.":00";
                $dataStr = str_replace("/", "-", $ws_data);
                $newDate = strtotime($dataStr);
                $node->changed = $newDate;
                $node->created = $newDate;
                $node->setRevisionCreationTime($newDate);
                $node->promote = 1;

                if($newsObject->indPublicacaoLiberada == "N"){
                    $node->status = 0;
                }else{
                    $node->status = 1;
                }

                if(!empty($newsObject->urlFotografia)){                  
                    $value_image = $newsObject->urlFotografia;
                    $path_image = pathinfo($value_image);
                    $data_image = file_get_contents($value_image);
                    $file = file_save_data($data_image, "public://".$path_image['filename'].".".$path_image['extension'], FileSystemInterface::EXISTS_REPLACE);
                    $node->field_img_noticia = $file;
                }

                $node->save();

                drush_print($count." - UPDATED - Noticia: [". $newsObject->idMateria ."] - " .$newsObject->tituloMateria);
            }
        }
    }

    $dateInit = "CARGA DE CONTEUDO - HORA FINAL - ".date("Y-m-d h:i:sa");

    \Drupal::logger('alergs_import')->notice($dateInit);  

}

/**
 * Drush command logic for drush_alergs_import_alergs_get_content
 *
 */
function drush_alergs_import_alergs_get_daily_noticias() {
    
    $token_alergs = call_alergs_api_post();

    $jsonData = array(
        'dataInicio' =>  date("d/m/Y"),
        'dataFim' => date("d/m/Y"),
        'listaIdMateria' => [],
        'listaIgnorarIdMateria' => array(),
        'listaIdTipoMateria' => array(),
        'publicada' => "",
    );
  
    $jsonDataEncoded = json_encode($jsonData);

    $authorization = "Authorization: Bearer ".$token_alergs;

    $dateInit = "CARGA DE CONTEUDO - HORA INCIAL - ".date("Y-m-d h:i:sa");

    \Drupal::logger('alergs_import')->notice($dateInit);  


    $url_listaMaterias = \Drupal::config('alergs_import.settings')->get('alergs_import_url').'/alergsws/rest/agenciadenoticia/listarNoticias/json/';    
    $curl = curl_init($url_listaMaterias);
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonDataEncoded);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json' , $authorization )); 
    $result = curl_exec($curl);
    curl_close($curl);  

    $resultArray = json_decode($result, TRUE);

    foreach ($resultArray as $key => $values) {

        $count = 0;

        foreach ($values as $news) {

            ++$count;

            $newsObject = json_decode(json_encode($news));

            $nodeExistente = \Drupal::entityTypeManager()->getStorage('node')->loadByProperties(['field_idmateria' => $newsObject->idMateria]);

            if(empty($nodeExistente)){

                $node = Node::create(['type' => 'noticias']);
                $node->langcode = "pt-br";
                $node->uid = 1;
                $node->promote = 0;
                $node->sticky = 0;
                $node->title= $newsObject->tituloMateria;
                $node->set('body', $newsObject->textoMateria);
                $node->body->format = 'full_html';
                $node->field_idmateria = $newsObject->idMateria;
                $node->field_autoria = $newsObject->autoria;
                $node->field_paraeditor = $newsObject->paraEditor;
                $node->field_horapublicao = $newsObject->horaPublicao;
                $node->field_descricaoarea = $newsObject->areaMateria;
                $node->field_lead = $newsObject->lead;
                $node->field_editornome = $newsObject->editorNome;
                $node->field_creditofoto = $newsObject->creditoFoto;
                $node->field_idarea = $newsObject->idArea;

                if($newsObject->idTipoMateria == 22){
                    $node->field_categoria = array("Artigos");
                }elseif ($newsObject->idTipoMateria == 2) {
                    $node->field_categoria = array("Comissões","Todas");
                }elseif ($newsObject->idTipoMateria == 3) {
                    $node->field_categoria = array("Deputados","Todas");
                }elseif ($newsObject->idTipoMateria == 4) {
                    $node->field_categoria = array("Comissões","Deputados","Todas");
                }else{
                    $node->field_categoria = array("Todas");
                }

                $node->field_idalbum = $newsObject->idAlbum;
                $node->field_idfotografia = $newsObject->idFotografia;
                $node->field_idtipomateria = $newsObject->idTipoMateria;
                $node->field_tipomateria = $newsObject->tipoMateria;

                $node->setNewRevision(TRUE);
                $node->revision_log = 'Created revision for node' . $nid;
               
                $ws_data = $newsObject->paraEditor." ".$newsObject->horaPublicao.":00";
                $dataStr = str_replace("/", "-", $ws_data);
                $newDate = strtotime($dataStr);
                $node->setRevisionCreationTime($newDate);
                $node->changed = $newDate;
                $node->created = $newDate;

                $node->promote = 1;

                if($newsObject->indPublicacaoLiberada == "N"){
                    $node->status = 0;
                }else{
                    $node->status = 1;
                }

                if(!empty($newsObject->urlFotografia)){    
                    $value_image = $newsObject->urlFotografia;
                    $path_image = pathinfo($value_image);
                    $data_image = file_get_contents($value_image);
                    $file = file_save_data($data_image, "public://".$path_image['filename'].".".$path_image['extension'], FileSystemInterface::EXISTS_REPLACE);
                    $node->field_img_noticia = $file;
                }

                $node->save();

                $nid = $node->id(); 

                drush_print($count." - CREATED - Noticia: [". $newsObject->idMateria ."] - " .$newsObject->tituloMateria);

            }else{

                $node = Node::load(key($nodeExistente)); 
                $node->title= $newsObject->tituloMateria;
                $node->set('body', $newsObject->textoMateria);
                $node->body->format = 'full_html';
                $node->field_idmateria = $newsObject->idMateria;
                $node->field_autoria = $newsObject->autoria;
                $node->field_paraeditor = $newsObject->paraEditor;
                $node->field_horapublicao = $newsObject->horaPublicao;
                $node->field_descricaoarea = $newsObject->areaMateria;
                $node->field_lead = $newsObject->lead;
                $node->field_editornome = $newsObject->editorNome;
                $node->field_creditofoto = $newsObject->creditoFoto;
                $node->field_idarea = $newsObject->idArea;

                if($newsObject->idTipoMateria == 22){
                    $node->field_categoria = array("Artigos");
                }elseif ($newsObject->idTipoMateria == 2) {
                    $node->field_categoria = array("Comissões","Todas");
                }elseif ($newsObject->idTipoMateria == 3) {
                    $node->field_categoria = array("Deputados","Todas");
                }elseif ($newsObject->idTipoMateria == 4) {
                    $node->field_categoria = array("Comissões","Deputados","Todas");
                }else{
                    $node->field_categoria = array("Todas");
                }
                
                $node->field_idalbum = $newsObject->idAlbum;
                $node->field_idfotografia = $newsObject->idFotografia;
                $node->field_idtipomateria = $newsObject->idTipoMateria;
                $node->field_tipomateria = $newsObject->tipoMateria;

                $node->setNewRevision(TRUE);
                $node->revision_log = 'Created revision for node' . $nid;
                
                $ws_data = $newsObject->paraEditor." ".$newsObject->horaPublicao.":00";
                $dataStr = str_replace("/", "-", $ws_data);
                $newDate = strtotime($dataStr);
                $node->changed = $newDate;
                $node->created = $newDate;
                $node->setRevisionCreationTime($newDate);
                $node->promote = 1;

                if($newsObject->indPublicacaoLiberada == "N"){
                    $node->status = 0;
                }else{
                    $node->status = 1;
                }

                if(!empty($newsObject->urlFotografia)){                  
                    $value_image = $newsObject->urlFotografia;
                    $path_image = pathinfo($value_image);
                    $data_image = file_get_contents($value_image);
                    $file = file_save_data($data_image, "public://".$path_image['filename'].".".$path_image['extension'], FileSystemInterface::EXISTS_REPLACE);
                    $node->field_img_noticia = $file;
                }

                $node->save();

                drush_print($count." - UPDATED - Noticia: [". $newsObject->idMateria ."] - " .$newsObject->tituloMateria);
            }
        }
    }

    $dateInit = "CARGA DE CONTEUDO - HORA FINAL - ".date("Y-m-d h:i:sa");

    \Drupal::logger('alergs_import')->notice($dateInit);  

}


/**
 * Drush command logic for function drush_alergs_import_alergs_get_daily_content_update() {
 *
 */
function drush_alergs_import_alergs_get_daily_content_update() {

    
    //Pega a data da ultima atualizacao
    $config_update = \Drupal::config('alergs_import.content_update_date');
    $last_update = $config_update->get('content_update_date');
    drush_print("LAST UPDATE: [". $last_update ."]");
    
    //Atualiza a data de execucao 22/06/2021 00:00:00
    $contet_update_date = \Drupal::service('config.factory')->getEditable('alergs_import.content_update_date');
    // $contet_update_date->set('content_update_date', date("d/m/Y H:i:s"))->save();
    $contet_update_date->set('content_update_date', date("d/m/Y 00:00:00"))->save();

    //Retorna a nova data de execucao
    $config_update_new = \Drupal::config('alergs_import.content_update_date');
    $last_update_new = $config_update_new->get('content_update_date');
    drush_print("LAST UPDATE NEW: [". $last_update_new ."]");

    //Registra no log a ultima atualizacao
    \Drupal::logger('content_update_date')->notice("[alergs_import] - Cron de noticias executado em: " . date("d/m/Y H:i:s")); 


    
    $token_alergs = call_alergs_api_post();

    $jsonData = array(
        'dataInicio' => $last_update_new
    );
  
    $jsonDataEncoded = json_encode($jsonData);

    $authorization = "Authorization: Bearer ".$token_alergs;

    $dateInit = "Daily Update Noticias - ".date("d/m/Y H:i:s");


    $url_listaMaterias = \Drupal::config('alergs_import.settings')->get('alergs_import_url').'/alergsws/rest/agenciadenoticia/listarNoticiasModificadas/json/';    
    $curl = curl_init($url_listaMaterias);
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonDataEncoded);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json' , $authorization )); 
    $result = curl_exec($curl);
    curl_close($curl);  

    $resultArray = json_decode($result, TRUE);

    foreach ($resultArray as $key => $values) {

        $count = 0;

        if(!empty($values)){

            foreach ($values as $news) {

                ++$count;
    
                $newsObject = json_decode(json_encode($news));
    
                $id_materias[] = $newsObject->id;
                
            }

        }

    }

    if(empty($id_materias)){
        \Drupal::logger('alergs_import')->notice("Sem conteudos para atualizar.");  
    }else{
        alergs_get_daily_news_update($id_materias);
    }

    \Drupal::logger('alergs_import')->notice($dateInit);  

}

/**
 * Drush command logic for drush_alergs_import_alergs_get_tval
 *
 */
function drush_alergs_import_alergs_get_tval($arg = NULL) {

    $token_alergs = call_alergs_api_post();

    $jsonData = array(
        'id' =>  null
    ); 

    $jsonDataEncoded = json_encode($jsonData);

    $authorization = "Authorization: Bearer ".$token_alergs;

    $dateInit = "CARGA DE CONTEUDO TV - HORA INCIAL - ".date("Y-m-d h:i:sa");

    \Drupal::logger('alergs_import')->notice($dateInit);  

    $url_listaMaterias = \Drupal::config('alergs_import.settings')->get('alergs_import_url').'/alergsws/rest/tv/listarConteudosTV/json/';    
    $curl = curl_init($url_listaMaterias);
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonDataEncoded);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json' , $authorization )); 
    $result = curl_exec($curl);
    curl_close($curl);  

    $resultArray = json_decode($result, TRUE);

    foreach ($resultArray as $key => $values) {

        $count = 0;

        foreach ($values as $tval_content) {

            ++$count;

            $tvalObject = json_decode(json_encode($tval_content));

            $nodeExistente = \Drupal::entityTypeManager()->getStorage('node')->loadByProperties(['field_idcadastrovideo' => $tvalObject->idCadastroVideo]);

            if(empty($nodeExistente)){

                $node = Node::create(['type' => 'tv_al']);
                $node->langcode = "pt-br";
                $node->uid = 1;
                $node->promote = 0;
                $node->sticky = 0;
                $node->title = $tvalObject->manchete;
                $node->set('body', $tvalObject->sinopse);
                $node->body->format = 'full_html';
                $node->field_idcadastrovideo = $tvalObject->idCadastroVideo;
                $node->field_reporter = $tvalObject->reporter;
                $node->field_urlvideo = $tvalObject->urlVideo;
                $node->field_cinegrafista = $tvalObject->cinegrafista;
                $node->field_data = $tvalObject->data;

                $dataStr = str_replace("/", "-", $tvalObject->data);
                $newDate = strtotime($dataStr);
                $node->setRevisionCreationTime($newDate);
                $node->changed = $newDate;
                $node->created = $newDate;

                $node->save();

                $nid = $node->id(); 

                drush_print($count." - CREATED - TVAL: [". $tvalObject->idCadastroVideo ."] - " .$tvalObject->manchete);

            }else{

                $node = Node::load(key($nodeExistente)); 
                $node->title = $tvalObject->manchete;
                $node->set('body', $tvalObject->sinopse);
                $node->body->format = 'full_html';
                $node->field_idcadastrovideo = $tvalObject->idCadastroVideo;
                $node->field_reporter = $tvalObject->reporter;
                $node->field_urlvideo = $tvalObject->urlVideo;
                $node->field_cinegrafista = $tvalObject->cinegrafista;
                $node->field_data = $tvalObject->data;

                $dataStr = str_replace("/", "-", $tvalObject->data);
                $newDate = strtotime($dataStr);
                $node->setRevisionCreationTime($newDate);
                $node->changed = $newDate;
                $node->created = $newDate;

                $node->setNewRevision(TRUE);
                $node->revision_log = 'Created revision for node' . $nid;
                $node->setRevisionCreationTime(REQUEST_TIME);
                $node->promote = 1;
                $node->save();

                drush_print($count." - UPDATED - TVAL: [". $tvalObject->idCadastroVideo ."] - " .$tvalObject->manchete);
            }
        }
    }

    $dateInit = "CARGA DE CONTEUDO TV - HORA FINAL - ".date("Y-m-d h:i:sa");

    \Drupal::logger('alergs_import')->notice($dateInit);

}


/**
 * Drush command logic for drush_alergs_import_alergs_get_programas_tval
 *
 */
function drush_alergs_import_alergs_get_programas_tval($arg = NULL) {

    $token_alergs = call_alergs_api_post();

    $authorization = "Authorization: Bearer ".$token_alergs;

    $dateInit = "CARGA DE CONTEUDO - HORA INCIAL - ".date("Y-m-d h:i:sa");

    \Drupal::logger('alergs_import')->notice($dateInit);  

    $tokens = ['@arg' => $arg];
    switch ($arg) {     
    case 'full':
        //@TODO
        break;
    case 'day':
        //@TODO
        break;
    case '':

        $url_listaMaterias = \Drupal::config('alergs_import.settings')->get('alergs_import_url').'/alergsws/rest/tv/listarProgramasTV/json/';    
        $curl = curl_init($url_listaMaterias);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json' , $authorization )); 
        $result = curl_exec($curl);
        curl_close($curl);  

        $resultArray = json_decode($result, TRUE);

        foreach ($resultArray as $key => $values) {

            $count = 0;

            foreach ($values as $tval_content) {

                ++$count;

                $programastvalObject = json_decode(json_encode($tval_content));

                $nodeExistente = \Drupal::entityTypeManager()->getStorage('node')->loadByProperties(['field_id_programa' => $programastvalObject->id]);

                if(empty($nodeExistente)){

                    $node = Node::create(['type' => 'programas_tval']);
                    $node->langcode = "pt-br";
                    $node->uid = 1;
                    $node->promote = 0;
                    $node->sticky = 0;
                    $node->title = $programastvalObject->titulo;
                    $node->field_sinopse_programa = $programastvalObject->sinopse;
                    $node->field_id_programa = $programastvalObject->id;
                    $node->field_apresentador = $programastvalObject->apresentador;
                    $node->field_editorchefe = $programastvalObject->editorChefe; //editorChefe
                    $node->field_urlvideo = $programastvalObject->url;
                    $node->field_produtor = $programastvalObject->produtor;
                    $node->field_horario_programa = $programastvalObject->horario;
                    $node->field_imagem_base64_ = $programastvalObject->imagem;
                    $node->save();
                    $nid = $node->id(); 
                    drush_print($count." - CREATED - PROGRAMA TVAL: [". $programastvalObject->id ."] - " .$programastvalObject->titulo);

                }else{

                    $node = Node::load(key($nodeExistente)); 
                    $node->title = $programastvalObject->titulo;
                    $node->field_sinopse_programa = $programastvalObject->sinopse;
                    $node->field_id_programa = $programastvalObject->id;
                    $node->field_apresentador = $programastvalObject->apresentador;
                    $node->field_editorchefe = $programastvalObject->editorChefe; //editorChefe
                    $node->field_urlvideo = $programastvalObject->url;
                    $node->field_produtor = $programastvalObject->produtor;
                    $node->field_horario_programa = $programastvalObject->horario;
                    $node->field_imagem_base64_ = $programastvalObject->imagem;
                    $node->setNewRevision(TRUE);
                    $node->revision_log = 'Created revision for node' . $nid;
                    $node->setRevisionCreationTime(REQUEST_TIME);
                    $node->promote = 1;
                    $node->save();
                    drush_print($count." - UPDATED - PROGRAMA TVAL: [". $programastvalObject->id ."] - " .$programastvalObject->titulo);
                }
            }
        }

        $dateInit = "CARGA DE CONTEUDO - HORA FINAL - ".date("Y-m-d h:i:sa");

        \Drupal::logger('alergs_import')->notice($dateInit);  

        break;
    default:
        drush_print(dt('Wrong argument. Possible arguments: full, day or use command without argument.'));
    }

}


/**
 * Drush command logic for drush_alergs_import_alergs_get_radio_al
 *
 */
function drush_alergs_import_alergs_get_radio_al($arg = NULL) {

    $token_alergs = call_alergs_api_post();

    $authorization = "Authorization: Bearer ".$token_alergs;

    $dateInit = "CARGA DE CONTEUDO - HORA INCIAL - ".date("Y-m-d h:i:sa");

    \Drupal::logger('alergs_import')->notice($dateInit);  

    $tokens = ['@arg' => $arg];
    switch ($arg) {     
    case 'full':
        //@TODO
        break;
    case 'day':
        //@TODO
        break;
    case '':

        $url_listaMaterias = \Drupal::config('alergs_import.settings')->get('alergs_import_url').'/alergsws/rest/radio/listarNoticiasRadio/json/';    
        $curl = curl_init($url_listaMaterias);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json' , $authorization )); 
        $result = curl_exec($curl);
        curl_close($curl);  

        $resultArray = json_decode($result, TRUE);

        foreach ($resultArray as $key => $values) {

            $count = 0;

            foreach ($values as $tval_content) {

                ++$count;

                $radioalObject = json_decode(json_encode($tval_content));

                $nodeExistente = \Drupal::entityTypeManager()->getStorage('node')->loadByProperties(['field_idmateria' => $radioalObject->idMateria]);

                if(empty($nodeExistente)){

                    $node = Node::create(['type' => 'radio']);
                    $node->langcode = "pt-br";
                    $node->uid = 1;
                    $node->promote = 0;
                    $node->sticky = 0;
                    $node->title = $radioalObject->titulo;
                    $node->field_cartola = $radioalObject->cartola;
                    $node->field_datahora = $radioalObject->dataHora;
                    $node->field_descricaoclasse = $radioalObject->descricaoClasse;
                    $node->set('body', $radioalObject->descricaoMateria);
                    $node->body->format = 'full_html';
                    $node->field_arquivo = $radioalObject->arquivo;
                    $node->field_idclassemateria = $radioalObject->idClasseMateria;
                    $node->field_palavraschave = $radioalObject->palavrasChave;
                    $node->field_idmateria = $radioalObject->idMateria;
                    $node->field_idreporter = $radioalObject->idReporter;
                    $node->field_idprograma = $radioalObject->idPrograma;
                    $node->field_nomereporter = $radioalObject->nomeReporter;

                    $node->field_podcast = array($radioalObject->podcast);

                    $node->setNewRevision(TRUE);
                    $node->revision_log = 'Created revision for node' . $radioalObject->idMateria;
                
                    $dataStr = str_replace("/", "-", $radioalObject->dataHora);
                    $newDate = strtotime($dataStr);
                    $node->setRevisionCreationTime($newDate);
                    $node->changed = $newDate;
                    $node->created = $newDate;

                    $node->save();
                    $nid = $node->id(); 
                    drush_print($count." - CREATED - RADIO AL: [". $radioalObject->idMateria ."] - " .$radioalObject->titulo);

                }else{

                    $node = Node::load(key($nodeExistente)); 
                    $node->title = $radioalObject->titulo;
                    $node->field_cartola = $radioalObject->cartola;
                    $node->field_datahora = $radioalObject->dataHora;
                    $node->field_descricaoclasse = $radioalObject->descricaoClasse;
                    $node->set('body', $radioalObject->descricaoMateria);
                    $node->body->format = 'full_html';
                    $node->field_arquivo = $radioalObject->arquivo;
                    $node->field_idclassemateria = $radioalObject->idClasseMateria;
                    $node->field_palavraschave = $radioalObject->palavrasChave;
                    $node->field_idmateria = $radioalObject->idMateria;
                    $node->field_idreporter = $radioalObject->idReporter;
                    $node->field_idprograma = $radioalObject->idPrograma;
                    $node->field_nomereporter = $radioalObject->nomeReporter;

                    $node->field_podcast = array($radioalObject->podcast);
                    
                    $node->setNewRevision(TRUE);
                    $node->revision_log = 'Created revision for node' . $radioalObject->idMateria;
                
                    $dataStr = str_replace("/", "-", $radioalObject->dataHora);
                    $newDate = strtotime($dataStr);
                    $node->setRevisionCreationTime($newDate);
                    $node->changed = $newDate;
                    $node->created = $newDate;

                    $node->promote = 1;
                    $node->save();
                    drush_print($count." - UPDATED - RADIO AL: [". $radioalObject->idMateria ."] - " .$radioalObject->titulo);
                }
            }
        }

        $dateInit = "CARGA DE CONTEUDO - HORA FINAL - ".date("Y-m-d h:i:sa");

        \Drupal::logger('alergs_import')->notice($dateInit);  

        break;
    default:
        drush_print(dt('Wrong argument. Possible arguments: full, day or use command without argument.'));
    }

}


/**
 * Drush command logic for function drush_alergs_import_alergs_get_radio_al_daily_update() {
 *
 */
function drush_alergs_import_alergs_get_radio_al_daily_update() {

    
    //Pega a data da ultima atualizacao
    $config_update = \Drupal::config('alergs_import.content_update_radio_date');
    $last_update = $config_update->get('content_update_radio_date');
    drush_print("RADIO LAST UPDATE: [". $last_update ."]");
    
    //Atualiza a data de execucao 22/06/2021 00:00:00
    $contet_update_date = \Drupal::service('config.factory')->getEditable('alergs_import.content_update_radio_date');
    // $contet_update_date->set('content_update_radio_date', date("d/m/Y H:i:s"))->save();
    $contet_update_date->set('content_update_radio_date', date("d/m/Y")." 00:00:00")->save();

    //Retorna a nova data de execucao
    $config_update_new = \Drupal::config('alergs_import.content_update_radio_date');
    $last_update_new = $config_update_new->get('content_update_radio_date');
    drush_print("RADIO LAST UPDATE NEW: [". $last_update_new ."]");

    //Registra no log a ultima atualizacao
    \Drupal::logger('content_update_radio_date')->notice("[alergs_import] - Cron de noticias de RADIO executado em: " . date("d/m/Y H:i:s")); 


    
    $token_alergs = call_alergs_api_post();

    $jsonData = array(
        'dataInicio' => $last_update_new
    );
  
    $jsonDataEncoded = json_encode($jsonData);

    $authorization = "Authorization: Bearer ".$token_alergs;

    $dateInit = "Daily Update RADIO - ".date("d/m/Y H:i:s");


    $url_listaMaterias = \Drupal::config('alergs_import.settings')->get('alergs_import_url').'/alergsws/rest/tv/listarItensRadioModificados/json/';    
    $curl = curl_init($url_listaMaterias);
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonDataEncoded);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json' , $authorization )); 
    $result = curl_exec($curl);
    curl_close($curl);  

    $resultArray = json_decode($result, TRUE);

    foreach ($resultArray as $key => $values) {
        
        $count = 0;

        if(!empty($values)){

            foreach ($values as $news) {

                ++$count;
    
                $newsObject = json_decode(json_encode($news));
    
                $id_materias[] = $newsObject->id;
                
            }

        }

    }

    if(empty($id_materias)){
        \Drupal::logger('alergs_import')->notice("Sem conteudos de Radio para atualizar.");  
    }else{
        alergs_get_daily_radio_update($id_materias);
    }

    \Drupal::logger('alergs_import')->notice($dateInit);  

}


/**
 * Drush command logic for function drush_alergs_import_alergs_get_tv_al_daily_update() {
 *
 */
function drush_alergs_import_alergs_get_tv_al_daily_update() {

    
    //Pega a data da ultima atualizacao
    $config_update = \Drupal::config('alergs_import.content_update_tv_date');
    $last_update = $config_update->get('content_update_tv_date');
    drush_print("TV LAST UPDATE: [". $last_update ."]");
    
    //Atualiza a data de execucao 22/06/2021 00:00:00
    $contet_update_date = \Drupal::service('config.factory')->getEditable('alergs_import.content_update_tv_date');
    // $contet_update_date->set('content_update_tv_date', date("d/m/Y H:i:s"))->save();
    $contet_update_date->set('content_update_tv_date', date("d/m/Y")." 00:00:00")->save();
    //$contet_update_date->set('content_update_tv_date', '15/06/2021 00:00:00')->save();

    //Retorna a nova data de execucao
    $config_update_new = \Drupal::config('alergs_import.content_update_tv_date');
    $last_update_new = $config_update_new->get('content_update_tv_date');
    drush_print("TV LAST UPDATE NEW: [". $last_update_new ."]");

    //Registra no log a ultima atualizacao
    \Drupal::logger('content_update_tv_date')->notice("[alergs_import] - Cron de noticias de TV executado em: " . date("d/m/Y H:i:s")); 

    $token_alergs = call_alergs_api_post();

    $jsonData = array(
        'dataInicio' => $last_update_new
    );
  
    $jsonDataEncoded = json_encode($jsonData);

    $authorization = "Authorization: Bearer ".$token_alergs;

    $dateInit = "Daily Update TV - ".date("d/m/Y H:i:s");


    $url_listaMaterias = \Drupal::config('alergs_import.settings')->get('alergs_import_url').'/alergsws/rest/tv/listarNoticiasTvAlModificados/json/';    
    $curl = curl_init($url_listaMaterias);
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonDataEncoded);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json' , $authorization )); 
    $result = curl_exec($curl);
    curl_close($curl);  

    $resultArray = json_decode($result, TRUE);

    foreach ($resultArray as $key => $values) {
        
        $count = 0;

        if(!empty($values)){

            foreach ($values as $news) {

                ++$count;
    
                $newsObject = json_decode(json_encode($news));
                
                $id_materias[] = $newsObject->id;
                
            }

        }

    }

    if(empty($id_materias)){
        \Drupal::logger('alergs_import')->notice("Sem conteudos de TV para atualizar.");  
    }else{
        alergs_get_daily_tv_update($id_materias);
    }

    \Drupal::logger('alergs_import')->notice($dateInit);  

}


/**
* Drush command logic for rebuilding file cache.
*
*/
function drush_alergs_import_alergs_delete_content($arg = NULL) {   
    switch ($arg) {     
        case 'noticias':
            $nodes = \Drupal::entityTypeManager()
            ->getStorage('node')
            ->loadByProperties(array('type' => 'noticias'));

            foreach ($nodes as $node) {
                $node->delete();
            }

            break;
        case 'tval':
            $nodes = \Drupal::entityTypeManager()
            ->getStorage('node')
            ->loadByProperties(array('type' => 'tv_al'));

            foreach ($nodes as $node) {
                $node->delete();
            }

            break;
        case 'radio':
            $nodes = \Drupal::entityTypeManager()
            ->getStorage('node')
            ->loadByProperties(array('type' => 'radio'));

            foreach ($nodes as $node) {
                $node->delete();
            }

            break;
        case '':
           
            break;
        default:
            drush_print(dt('Wrong argument. Possible arguments: noticias, article or use command without argument.'));
        } 
}