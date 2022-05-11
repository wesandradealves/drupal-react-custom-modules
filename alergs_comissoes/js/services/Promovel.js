import axios from 'axios';

export const reuniaoComissao = (data) => {

  console.log(data)

  axios.post('http://172.30.3.227:5000/reuniaoComissao', { codComissao: '86', anoReuniao: 2021 })
    .then(res => {
      console.log(res)
    });

}
