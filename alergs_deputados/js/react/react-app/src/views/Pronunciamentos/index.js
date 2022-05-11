import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useState, useEffect } from 'react';
import { 
    listarLegislaturaDeputado,
    listarPronunciamentosDeputado,
	listarDestaqueDeputados
} from '../../services/services';
import CardBanner from "../../components/CardBanner";
import FilteredList from "../../components/FilteredList";
import { EmptyMessage } from '../common.ts';

const Pronunciamentos = ({
    idDeputado, 
    id
}) => {
    const [pronunciamentos, setPronunciamentos] = useState(null);
    const [deputado, setDeputado] = useState(null);
    const [legislatura, setLegislatura] = useState(null);

    const fetchPronunciamentos = async (Ano, idDeputado) => {
        const response = await listarPronunciamentosDeputado(Ano, idDeputado).then(data => {
            return JSON.parse(data).lista
        }).catch(err => console.log(err)); 

      return response;
    }    

    const fetchData = async () => {
        const response = await listarDestaqueDeputados().then(res => {
            return JSON.parse(res).lista;
        }).catch(err => console.log(err))

        return response;
    }        

    const fetchListarLegislaturaDeputado = async (codProponente) => {
        const response = await listarLegislaturaDeputado(codProponente).then(res => {
            return JSON.parse(res).lista;
        }).catch(err => console.log(err))

        return response;
    }

    const handleDates = () => setPronunciamentos(pronunciamentos => pronunciamentos.map(
        pronunciamento => ({
            ...pronunciamento,
            numLegislatura: 54,
            dataPronunciamento: pronunciamento.dataPronunciamento.replaceAll('-', '/'),
            anoLegislatura: parseInt(pronunciamento.dataPronunciamento.split('-')[2])
        })
    ))      

    const handleLegislatura = () => setLegislatura(legislatura => legislatura.map(
        legislatura => ({
            ...legislatura,
            label: `${legislatura.numLegislatura} | ${legislatura.anoLegislatura}`
        })
    ))          

    useEffect(() => {
		fetchData().then(data => {
            if(data) setDeputado(data.find(item => item.idDeputado === parseInt(idDeputado)));
		}).catch(err => console.log(err))          
    }, []); 

    useEffect(() => {
        if(deputado) {
            fetchPronunciamentos(null, deputado.idDeputado).then(data => {
                if(data) setPronunciamentos(data)
            }).catch(err => console.log(err));

            fetchListarLegislaturaDeputado(deputado.idDeputado).then(data => {
                if(data) setLegislatura(data)
            }).catch(err => console.log(err))               
        }
    }, [deputado]); 

    useEffect(() => {
        if(pronunciamentos && !pronunciamentos[0].hasOwnProperty('anoLegislatura')) handleDates()
    }, [pronunciamentos]);      
    
    useEffect(() => {
        if(legislatura && !legislatura[0].hasOwnProperty('label')) handleLegislatura()
    }, [legislatura]);          

    return (
        <>
            {/* Banner */}
            {deputado && (<CardBanner data={deputado} />)}
            {/* Pronunciamentos */}
            {((pronunciamentos && pronunciamentos[0].hasOwnProperty('anoLegislatura')) && (legislatura && legislatura[0].hasOwnProperty('label'))) ? <FilteredList 
                title="Últimos Pronunciamentos"
                data={pronunciamentos}   
                filterConfig={{
                    propId: ['numLegislatura', 'anoLegislatura'],
                    options: legislatura, 
                    selectLabel: 'Legislatura | Ano'
                }}                    
                modalConfig={{
                    contentId: 'pronunciamento',
                    title: ''
                }}
                listConfig={[
                    {
                        label: 'Data',
                        contentId: 'dataPronunciamento',
                        classes: '',
                        alignText: 'center',
                        responsive: {
                            xs: '',
                            md: 3
                        }
                    },                    
                    {
                        label: 'Legislatura',
                        contentId: 'numLegislatura',
                        classes: '',
                        alignText: 'center',
                        responsive: {
                            xs: '',
                            md: 2
                        }
                    },{
                        label: 'Ano Legislatura',
                        contentId: 'anoLegislatura',
                        classes: '',
                        alignText: 'center',
                        responsive: {
                            xs: '',
                            md: 2
                        }
                    },{
                        label: 'Resumo',
                        contentId: 'resumo',
                        classes: '',
                        alignText: 'center',
                        responsive: {
                            xs: '',
                            md: 5
                        }
                    }
                ]}
            /> : <EmptyMessage>Nenhum resultado encontrado.</EmptyMessage>}            
        </>
    );
};
 
export default Pronunciamentos;