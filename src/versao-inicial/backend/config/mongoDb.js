const mongoose = require('mongoose')
mongoose.connect('mongoDb://localhost/knowledge_stats', {useNewUrlParser: true})
                .catch(e    =>{
                    const msg = 'ERRO: não foi possível conectar com o mongoDb'
                    console.log('\x1b[41m%s\x1b[37m',msg,'\x1b[0m')
                })
