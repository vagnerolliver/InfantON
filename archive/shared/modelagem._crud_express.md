#Modelo Padrão - Criando um CRUD com Express

Entidade são: User, Aluno, Funcionario, Agenda, Calendario Escolar, Pagamento e Turma;

- User
	- name
	- passoword

- Aluno
	- name
	- dataBirth
	- turma_id
	- agenda_id
	- nomedaMae
	- nomedoPai
	- profissaoDoPai
	- profissaoDaMae
	- statusMatricula
	- turno

- Funcionario
	- name 
	- turma_id
	- typeFuncionario
		- Professor
			- name 
			- turmas [array turmas] / caso ele tenha mais que uma turma.
			- salario
		- Auxiliar
			-	name
			- salario
		- Diretora
			- name
			- salario
		- Nutricionista
			- name
			- salario
		- Psicopedagoga
			- name
			- salario

- Agenda
	- aluno_id
	- turma_id

- Calendario Escolar
	- name
	- projeto
	- dataProjeto
	- AlbumFotos
	- ProfessorResponsavel

- Pagamento
	- aluno_id
	- turma_id

- Turma(curso)
  - name
  - aluno_id [array de alunos]
  - professor_id
  - valor_Integral
  - valor_MeioTurno



  

