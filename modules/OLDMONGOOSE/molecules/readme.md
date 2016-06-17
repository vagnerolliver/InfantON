Na etapa da definição das Moléculas é onde criamos os Schemas no Mongoose.


# User

- User
	- User
	-	email
	-	password

# Aluno

- Aluno
	- name
	- dateBirth
	- cursos

Porém sabemos que o Aluno também é um 1 User, 
então se quisermos referenciar a coleção de Users precisamos criar esse átomo:

// atoms/userRef.js
module.exports = (Schema) => {
  return { type: Schema.Types.ObjectId, ref: 'users' };
};


# Curso 

- Curso
	- name
	- dateBegin
	- link