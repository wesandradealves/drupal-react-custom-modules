import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useState, useEffect } from 'react';
import { Filter, Link, SectionTitle, ListCell, Column, Select, List, ListHeader, ListItem } from './styles.ts';
import './styles.scss';
import Modal from "../Modal";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const FilteredList = ({
    ...props
}) => {
    const [data, setData] = useState(null);
    const [filter, setFilter] = useState(null);
    const [filterData, setFilterData] = useState(null);
    const [paged, setPagedData] = useState(null);
    const [page, setPage] = useState(1);
    const [isModalOpened, openModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const _ = require('lodash');

    const openContent = (o, url) => {
        let id = Object.getOwnPropertyNames(o).filter( (prop) => {
            return prop.indexOf('id') == 0;
        })[0];

        if(url) {
            if(id) window.open(`${url + o[id]}`,'_blank');               
            else if(url.indexOf('&') >= 0) {
                var arrResults = [];
                var urlArray = url.split('&');

                urlArray.forEach((slice, i) => {
                    if(slice.indexOf('?') >= 0)
                        slice.split('?').forEach(slice => {
                            if(slice.indexOf('=') >= 0)
                                var prop = Object.getOwnPropertyNames(o).filter( (prop) => {
                                    return prop.toLowerCase().indexOf(slice.replace('=','').toLowerCase()) == 0;
                                })[0]

                                if(prop!==undefined)
                                    arrResults.push(o[prop])
                        })
                    else
                        var prop = Object.getOwnPropertyNames(o).filter( (prop) => {
                            return prop.toLowerCase().indexOf(slice.replace('=','').toLowerCase()) == 0;
                        })[0]           
                        
                        if(prop!==undefined)
                            arrResults.push(o[prop])
                }), urlArray.forEach((slice, i) => {
                    if(arrResults[i]!==undefined)
                        urlArray[i] = slice + arrResults[i]
                }), window.open(`${urlArray.join('&').replaceAll(' ','')}`,'_blank'); 
            }
        } else if('modalConfig' in props) {
            setModalContent(o[props.modalConfig.contentId])
        } 
    }    
    
    const checkListProp = (prop) => {
        return props.listConfig.every((element, i) => {
            if(!element[prop]) return false
            else return true
        });
    }    

    const nestedFilter = (targetArray, filters) => {
        var filterKeys = Object.keys(filters);
        return targetArray.filter(function (eachObj) {
            return filterKeys.every(function (eachKey) {
                if (!filters[eachKey].length) {
                    return true; 
                }
                return filters[eachKey].includes(eachObj[eachKey]);
            });
        });
    };

    const onChange = (v) => {
        if(v) {
            if(typeof props.filterConfig.propId == 'object' && v.indexOf('|') > 0) {
                let opt = {};
    
                v.split('|').forEach((value, index) => {
                    opt[props.filterConfig.propId[index]] = [!isNaN(parseInt(value.trim())) ? parseInt(value.trim()) : value.trim()]
                })

                console.log(_.chunk(nestedFilter(data, opt), 10))
    
                if(v) {
                    setFilterData( nestedFilter(data, opt).length ? nestedFilter(data, opt) : null ), 
                    setPagedData( nestedFilter(data, opt).length ? _.chunk(nestedFilter(data, opt), 10) : null )
                }
            } else {
                setFilterData(data.filter(item => item[props.filterConfig.propId] === v))
                setPagedData(_.chunk(data.filter(item => item[props.filterConfig.propId] === v), 10))
            }
        } else {
            setFilterData(data)
            setPagedData(_.chunk(data, 10))
        }

        document.getElementById('list').scrollIntoView();
    }    

    const handleChange = (e) => { 
        if(parseInt(e.target.textContent)) {
            setPage( parseInt(e.target.textContent) )
        } else if(e.target.attributes[3].textContent.indexOf('next page') !== -1) {
            setPage( page + 1 )
        } else if(e.target.attributes[3].textContent.indexOf('previous page') !== -1) {
            setPage( page - 1 )
        }

        document.getElementById('list').scrollIntoView();
    }      

    useEffect(() => {
        if(props.data) setData(props.data), setFilterData(props.data), setPagedData(_.chunk(props.data, 10))
        if(props.filterConfig && props.filterConfig.options) setFilter(props.filterConfig.options)
    }, []); 
    
    useEffect(() => {
        if(modalContent) openModal(true)
    }, [modalContent]);     

    useEffect(() => {
        if(paged) console.log(paged)
    }, [paged]);   

    useEffect(() => {
        let $path = window.location.pathname.split('/').filter(function(el) { return el; });

        if(data && $path[2]) {
            let id = Object.getOwnPropertyNames(data[0]).filter( (prop) => {
                return prop.indexOf('id') == 0;
            })[0];    
            
            if(id) setModalContent(data.find(item => item[id] === parseInt($path[2])).pronunciamento)
        }
    }, [data]);     

    return (
        <>
            {filter && (<section class="filter">
                <div class="container">
                    <Filter> 
                        <Row className="justify-content-md-center">
                            <Col sm={12} md={4}>
                                <Link href="javascript:window.history.back();">Início</Link>
                            </Col>
                            <Col sm={12} md={4}>
                                <Select onChange={e => onChange(e.target.value)}>
                                    <option value="">{props.filterConfig.selectLabel}</option>
                                    {filter.map((o, i) => (
                                        <option value={o.label}>{o.label}</option>
                                    ))}                                    
                                </Select>
                            </Col>
                            <Col sm={12} md={4}>
                                <Link href="javascript:window.print();" class="noPrint"><i class="fas fa-print"></i> Versão de Impressão</Link>
                            </Col>   
                        </Row>
                    </Filter>
                </div>
            </section>)}

            {data && paged && paged.length && (<section id="list">
                <div class="container">    

                    {isModalOpened && (<Modal 
                        onClose={e => { openModal(false), setModalContent(null) }}
                        content={modalContent}
                        isOpened={isModalOpened} />)}                      

                    <SectionTitle color="white">{props.title}</SectionTitle>

                    <div class="list-inner">
                        {props.listConfig && checkListProp('label') && (<Row className="list-header">
                            {props.listConfig.map((item, i) => (<Col className={`${item.classes} list-cell`} xs={item.responsive.xs || 12} xs={item.responsive.md || 12}><ListCell className={`list-cell-inner text-${item.alignText}`}>{item.label}</ListCell></Col>))}
                        </Row>)}

                        <Row className="list-content">
                            {paged[page - 1].map((row, i) => (
                                <Col className="list-row" xs={12}>
                                    <Row>
                                        {
                                            props.listConfig.map((col, i) => (
                                                <Col className="list-cell" xs={col.responsive.xs || 12} md={col.responsive.md || 12}>
                                                    <ListCell onClick={e => openContent(row, col.redirectBaseUrl)} className={`list-cell-inner text-${ row[col.contentId].length > 60 ?  'justify' : col.alignText }`}>{row[col.contentId]}</ListCell>
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </Col>
                            ))}                                         
                        </Row>
                        
                        <Stack spacing={2}>
                            <Pagination 
                            defaultPage={1} 
                            page={page} 
                            onChange={handleChange} 
                            boundaryCount={2}
                            count={paged.length - 1} variant="outlined" shape="rounded" />
                        </Stack>
                    </div>
                </div>                  
            </section>)}
        </>
    );
};
 
export default FilteredList;