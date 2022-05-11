<?php

use Drupal\views\ViewExecutable;
use Drupal\views\Plugin\views\query\QueryPluginBase;

function alergs_deputados_views_query_alter(ViewExecutable $view, QueryPluginBase $query) {

    if (($view->id() == 'noticias') && ($view->current_display == 'page_1')) {

        $id_deputado = \Drupal::request()->get('deputado');

        if($id_deputado){
            $artigos = alergs_get_artigos_deputado($id_deputado);
        }

        if($id_deputado && $artigos){

            foreach ($query->where as &$condition_group) {

                foreach ($condition_group['conditions'] as &$condition) {
                    
                    if ($condition['field'] == 'node__field_idmateria.field_idmateria_value') {
                        $condition = [
                        'field' => 'node__field_idmateria.field_idmateria_value',
                        'value' => $artigos,
                        'operator' => 'IN',
                        ];
                    }
                }
            }
        }else{
            foreach ($query->where as &$condition_group) {

                foreach ($condition_group['conditions'] as $key => &$condition) {
                    
                    if ($condition['field'] == 'node__field_idmateria.field_idmateria_value') {
                        $condition = [
                        'field' => 'node__field_idmateria.field_idmateria_value',
                        'operator' => 'IS NOT NULL',
                        ];
                    }
                }
            }
        }
    
    }

}