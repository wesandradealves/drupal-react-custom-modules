<?php

use Drupal\views\ViewExecutable;
use Drupal\views\Plugin\views\query\QueryPluginBase;

function alergs_import_views_query_alter(ViewExecutable $view, QueryPluginBase $query) {

    if ($view->id() == 'banner_principal') {

        $manchetes = alergs_get_manchetes();

        foreach ($query->where as &$condition_group) {
            foreach ($condition_group['conditions'] as &$condition) {
                if ($condition['field'] == 'node__field_idmateria.field_idmateria_value') {
                    $condition = [
                    'field' => 'node__field_idmateria.field_idmateria_value',
                    'value' => $manchetes,
                    'operator' => 'IN',
                    ];
                }
            }
        }

        $str_manchetes = implode (",", $manchetes);
        $query->addOrderBy(NULL, 'FIELD(node__field_idmateria.field_idmateria_value,'.$str_manchetes.')', 'ASC', 'order_field');
    }

    if (($view->id() == 'noticias') && ($view->current_display == 'page_2' || $view->current_display == 'block_1')) {


        $destaques = alergs_get_destaques();

        foreach ($query->where as &$condition_group) {
            foreach ($condition_group['conditions'] as &$condition) {
                if ($condition['field'] == 'node__field_idmateria.field_idmateria_value') {
                    $condition = [
                    'field' => 'node__field_idmateria.field_idmateria_value',
                    'value' => $destaques,
                    'operator' => 'IN',
                    ];
                }
            }
        }

        $str_destaques = implode (",", $destaques);
        $query->addOrderBy(NULL, 'FIELD(node__field_idmateria.field_idmateria_value,'.$str_destaques.')', 'ASC', 'order_field');
    
    }

}