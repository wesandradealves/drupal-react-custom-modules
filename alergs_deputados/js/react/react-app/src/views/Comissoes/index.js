import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useState, useEffect } from 'react';
import { 
    listarComissoesDeputado,
	listarDestaqueDeputados
} from '../../services/services';
import CardBanner from "../../components/CardBanner";
import FilteredList from "../../components/FilteredList";
import { EmptyMessage } from '../common.ts';

const Comissoes = ({
    idDeputado, 
    id
}) => {
    const [deputado, setDeputado] = useState(null);
    const [comissoes, setComissoes] = useState(null);
    const [filtro, setFiltro] = useState(null);

    const fetchData = async () => {
        const response = await listarDestaqueDeputados().then(res => {
            return JSON.parse(res).lista;
        }).catch(err => console.log(err))

        return response;
    }         

	const fetchComissoes = async (idProponente, idDeputado) => {
        const response = await listarComissoesDeputado(idProponente, idDeputado).then(data => {
            return JSON.parse(data).lista;
        }).catch(err => console.log(err)); 

        return response;
	}            

    const handleFilter = () => setFiltro(filtro => filtro.map(
        item => ({
            comissao: item,
            label: item
        })
    ))        

    useEffect(() => {
		fetchData().then(data => {
            if(data) setDeputado(data.find(item => item.idDeputado === parseInt(idDeputado)));
		}).catch(err => console.log(err))          
    }, []); 

    useEffect(() => {
        if(deputado) {
            fetchComissoes(deputado.idDeputado, null).then(data => {
                setComissoes(data)
            }).catch(err => console.log(err))
        }
    }, [deputado]);    
    
    useEffect(() => {
        if(comissoes) {
            let filterOptions = new Set();

            for (const item of comissoes) {
                filterOptions.add(item.comissao);
            }

            filterOptions = Array.from(filterOptions);  

            setFiltro(filterOptions)
        }
    }, [comissoes]);   
    
    useEffect(() => {
        if(filtro && !filtro[0].hasOwnProperty('comissao')) handleFilter() 
    }, [filtro]);       

    return (
        <>
            {/* Banner */}
            {deputado && (<CardBanner data={deputado} />)}
            {/* Comissões */}
            {(comissoes && filtro && filtro[0].hasOwnProperty('comissao')) ? <FilteredList 
                title="Comissões"
                data={comissoes}   
                filterConfig={{
                    propId: 'comissao',
                    options: filtro, 
                    selectLabel: 'Categoria da comissão'
                }}                    
                modalConfig={{
                    contentId: 'nomeComissao',
                    title: ''
                }}
                listConfig={[
                    {
                        label: '',
                        contentId: 'nomeComissao',
                        propId: 'comissao',
                        classes: '', 
                        redirectBaseUrl: '//www.al.rs.gov.br/legislativo/Comissoes.aspx?IdComissao=',
                        responsive: {
                            xs: '',
                            md: ''
                        }
                    }
                ]}
            /> : <EmptyMessage>Nenhum resultado encontrado.</EmptyMessage>}               
        </>
    );
};
 
export default Comissoes;