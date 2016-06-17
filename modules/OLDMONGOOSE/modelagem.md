* campos obrigatórios
User {
    //  name: String ok
    , passorwd: String OK**
    , email: String OK**
    , type: string OK**
    , sexo: String OK**
    , dataBirth: Date OK**
    , address: String, OK**
    , neighborhod: String OK**
    , city: String OK**
    , state: String OK**
    , zip: String OK**
    , administrador: Boolean *
    , dataCadastro: Date OK**
    , dataBegin: Date OK**  
}
 
Aluno { 
    , name: String OK**
    , groupBlond: String OK** 
    , factorRh: String OK**
    , alergico: [String] OK##
    , turma: arrayObjectSchema * 
    , agenda: arrayObjectSchema *
    , pais: objectArray 
        [ 
           name: String OK**
         , phone: [ string ] OK** 
         , profissao: String OK## 
        ] 
    , statusMatricula: Boolean OK**
    , turno: String OK**
    , comments: String OK##
} 

Funcionario {
    , name: String OK**
    , phone: [ String ] OK**
    , typeFuncionario: objectArray
        [ 
            profissao: String OK##  
          , turmas: objectArraySchema TurmaRef.js
          , salario: Numeric OK##
        ]
} 

Agenda {
   yearLetivo: Date OK**
 , aluno: objectSchema
 , comentarios: arrayObject
    [
        dataAnotacao: Date OK**
        , descricao: String OK**
        , assunto: String  OK##
        , autor: objectSchema **
        , image: array OK##
    ]
}

Turma {
    , yearLetivo: Date OK**
    , name: String OK**
    , professor: objectSchema user_id
    , valor_Integral: Numerico
    , valor_MeioTurno
}


Calendario Escolar {
      nameProjeto: String
    , dataProjeto: Date
    , AlbumFotos: array 
    , turma: arrayObjectSchema
    , professorResponsavel: objetSchema
}

Pagamento {     
    dataPagamento: Date
    aluno: objectSchema
    valor: Numeric
}