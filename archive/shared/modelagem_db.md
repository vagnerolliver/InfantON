#Modelo Padrão - Criando um CRUD com Express

Entidade são: User, Aluno, Funcionario, Agenda, Calendario Escolar, Pagamento e Turma;

	 User {
	  	  name: String
	  	, passorwd: String
	    , type: objectSchema
	    , sexo: String
	    , dataBirth: Date
	    , address: String,
	    , neighborhod: String
	    , city: String
	    , state: String
	    , zip: String
	    , administrador: Boolean
	    , dataCadastro: Date
	    , dataInicio: Date    
	 }

	Aluno { 
		 grupoSanguineo:String
		, fatorRh: String
		, alergico: String 
		, turma: arrayObjectSchema
		, agenda: arrayObjectSchema
		, pais: objectArray 
		    [ 
			   nome: String
			 , phone: Array
			 , profissao: String
		    ] 
	    , statusMatricula: Boolean
		, turno: String
		, comments: String
	} 

	Funcionario {
		, typeFuncionario: objectArray
			[ 
			    profissao: String 
			  , turmas: objectArraySchema
			  , salario: Numeric
			]
	} 

    Agenda {
	   anoLetivo: Date
	 , aluno: objectSchema
	 , comentarios: arrayObject
	 	[
	 		data: Date
	 		, assunto: String
	 		, descricao: String
	 		, autor: objectSchema
	 		, image: array
	 	]
	}

	Turma {
	 	, anoletivo: Date
		, name: String
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
		data: Date
		aluno: objectSchema
		valor: Numeric
	}


  

